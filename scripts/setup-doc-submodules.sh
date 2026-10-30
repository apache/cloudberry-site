#!/bin/bash
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

# Initialise the documentation submodules, checking out only the directory
# each one contributes to the site.
#
# Two submodules feed the site today:
#
#   pxf             apache/cloudberry-pxf   ->  docs/
#   core-internals  apache/cloudberry       ->  docs/core-internals/
#
# The directory to check out is read from the `sparse-checkout` key each
# submodule carries in .gitmodules. Git itself ignores that key; it is written
# there so a submodule and its narrowing are declared in one place. A submodule
# without the key is checked out in full.
#
# Why this is not just `git submodule update --init`: `core-internals` lives in
# the engine repository, which is upwards of a gigabyte, and the site reads a
# few megabytes of Markdown out of it. `git submodule update` has no way to say
# "narrow this before you check it out", so the clone is done here instead --
# shallow, blobless and sparse from the start, so the rest of the tree is never
# written and its contents are never downloaded. For `core-internals` that is
# ~4 MB rather than ~1 GB.
#
# Safe to re-run: an already-initialised submodule is only moved to the commit
# the superproject records.

set -euo pipefail

cd "$(dirname "$0")/.."

if [ ! -f .gitmodules ]; then
    echo "ERROR: .gitmodules not found; run this from a clone of the site repository." >&2
    exit 1
fi

names=$(git config -f .gitmodules --name-only --get-regexp '\.path$' \
        | sed -e 's/^submodule\.//' -e 's/\.path$//')

for name in $names; do
    path=$(git config -f .gitmodules --get "submodule.${name}.path")
    url=$(git config -f .gitmodules --get "submodule.${name}.url")
    sparse=$(git config -f .gitmodules --get "submodule.${name}.sparse-checkout" || true)
    branch=$(git config -f .gitmodules --get "submodule.${name}.branch" || true)
    sha=$(git rev-parse "HEAD:${path}")

    echo ""
    echo "==> ${name}  ${url}"

    # Registers the URL in .git/config, the way `git submodule update --init`
    # would, so `git submodule status` and friends behave normally afterwards.
    git submodule init -- "$path"

    gitdir=".git/modules/${name}"

    if [ ! -e "${path}/.git" ] && [ -d "$gitdir" ]; then
        # The working tree is gone but its git directory survived -- a branch
        # switch across the commit that added the submodule does that. Reconnect
        # to it rather than cloning again: the objects and the sparse pattern
        # are still there, and a second clone would have nowhere to be absorbed
        # to.
        git submodule update --init -- "$path"
    fi

    if [ ! -e "${path}/.git" ]; then
        # --sparse starts the working tree at the top-level files only, so the
        # narrowing below is applied to almost nothing rather than undoing a
        # full checkout; --filter keeps the objects outside it from being
        # downloaded at all. Together they are the whole point of this script:
        # ~1,500 objects for core-internals instead of ~426,000.
        clone_args=(--quiet --depth 1 --filter=blob:none)
        if [ -n "$sparse" ]; then
            clone_args+=(--sparse)
        fi
        if [ -n "$branch" ]; then
            clone_args+=(--branch "$branch")
        fi
        git clone "${clone_args[@]}" "$url" "$path"
    fi

    if [ -n "$sparse" ]; then
        git -C "$path" sparse-checkout set --no-cone -- "$sparse"
        echo "    narrowed to: ${sparse}"
    fi

    # The pinned commit is usually, but not always, the tip the shallow clone
    # landed on -- fetch it by id when it is missing.
    if ! git -C "$path" cat-file -e "${sha}^{commit}" 2>/dev/null; then
        git -C "$path" fetch --quiet --depth 1 origin "$sha"
    fi
    git -C "$path" checkout --quiet --detach "$sha"

    # A sparse pattern that moved -- upstream renaming docs/ to doc/, say --
    # leaves the files it used to cover behind: they are outside the new
    # pattern, so checkout does not touch them, and Docusaurus would go on
    # seeing a stale copy. These checkouts are read-only inputs to the build,
    # so there is nothing of value to preserve.
    git -C "$path" clean -ffdq

    # If the pinned commit and the sparse pattern disagree -- upstream moved
    # the directory and .gitmodules still names the old one -- the checkout
    # succeeds and produces nothing. Say so here rather than let Docusaurus
    # fail later on a path that does not exist.
    if [ -n "$sparse" ] && [ ! -e "${path}/${sparse%/}" ]; then
        echo "ERROR: ${name} has no '${sparse}' at ${sha:0:12}." >&2
        echo "       The submodule moved it, or .gitmodules names the wrong path." >&2
        exit 1
    fi

    echo "    at ${sha:0:12}: $(ls "$path" | tr '\n' ' ')"
done

# Move each submodule's .git directory under .git/modules, so the checkouts
# look the same whether they were made here or by `git submodule update`.
git submodule absorbgitdirs

echo ""
echo "Documentation submodules ready."
