#!/usr/bin/env python3
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements. See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership. The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License. You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
# OF ANY KIND, either express or implied. See the License for
# the specific language governing permissions and limitations
# under the License.
#
"""
fetch_contributors_and_team.py

This script fetches:
1. Contributors to the repository since a hardcoded fork date.
2. Members of a specific GitHub team.

Output:
- contributors_and_team.json: Contains contributors and team members with the following fields:
  - login: GitHub username.
  - avatar_url: URL to the user's GitHub avatar.

Requirements:
- A valid GitHub API token with `repo` and `read:org` permissions.
  The token must be set as an environment variable `GITHUB_TOKEN`.

Prerequisites:
- Python 3.7 or later.
- Modules: `requests`.

Usage:
1. Ensure you have `requests` installed (`pip install requests`).
2. Set the environment variable `GITHUB_TOKEN` with a valid token:
   - export GITHUB_TOKEN="your_github_personal_access_token"
3. Run the script:
   - ./fetch_contributors_and_team.py
4. The output file `contributors_and_team.json` will be saved in the `cloudberry-site/static` directory.
"""

import os
import requests
import json
import sys

# GitHub API Token from environment variable
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    raise ValueError("Please set the GITHUB_TOKEN environment variable.")

# Repository and team details
OWNER = "apache"
REPO = "cloudberry"
TEAM = "cloudberry-committers"

# Hardcoded fork date
FORK_DATE = "2022-02-09T22:31:43Z"  # UTC timestamp for fork point.

# API URLs
COMMITS_URL = f"https://api.github.com/repos/{OWNER}/{REPO}/commits"
TEAM_MEMBERS_URL = f"https://api.github.com/orgs/{OWNER}/teams/{TEAM}/members"

# Headers for API requests
HEADERS = {"Authorization": f"Bearer {GITHUB_TOKEN}"}

# Determine absolute path to static directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "../static"))

# Ensure static directory exists
os.makedirs(STATIC_DIR, exist_ok=True)


def fetch_committers(team_members):
    """
    Fetch GitHub committers from the repository since the fork date.
    Only includes users who are part of the specified team.
    """
    print(f"Fetching committers since fork date: {FORK_DATE}...")
    committers = set()
    params = {"per_page": 100, "page": 1, "since": FORK_DATE}

    while True:
        sys.stdout.write(f"Processing page {params['page']} of committers...\r")
        sys.stdout.flush()

        response = requests.get(COMMITS_URL, headers=HEADERS, params=params)
        if response.status_code != 200:
            print(f"\nError fetching committers: {response.status_code}, {response.text}")
            break

        commits = response.json()
        if not commits:
            break

        for commit in commits:
            committer = commit.get("committer")
            if committer:
                username = committer.get("login")
                if username and username in team_members:
                    committers.add(username)

        params["page"] += 1

    sys.stdout.write("\n")
    print(f"Found {len(committers)} unique committers.")
    return committers


def fetch_team_members():
    """
    Fetch members of the GitHub team specified in the TEAM variable.
    """
    print("Fetching team members...")
    team_members = set()
    params = {"per_page": 100, "page": 1}

    while True:
        response = requests.get(TEAM_MEMBERS_URL, headers=HEADERS, params=params)
        if response.status_code != 200:
            print(f"Error fetching team members: {response.status_code}, {response.text}")
            break

        members = response.json()
        if not members:
            break

        for member in members:
            username = member.get("login")
            if username:
                team_members.add(username)

        params["page"] += 1

    print(f"Found {len(team_members)} unique team members.")
    return team_members


def save_combined_data(committers, team_members):
    """
    Combine committers and team members and save as JSON.
    The output is written to the `contributors_and_team.json` file in the `static` directory.
    """
    combined_users = committers.union(team_members)
    user_data = [
        {
            "login": user,
            "avatar_url": f"https://avatars.githubusercontent.com/{user}"
        }
        for user in sorted(combined_users)
    ]

    output_path = os.path.join(STATIC_DIR, "contributors_and_team.json")
    with open(output_path, "w") as file:
        json.dump(user_data, file, indent=4)

    print(f"Combined data saved to {output_path}")


if __name__ == "__main__":
    print("Starting GitHub user processing...")

    team_members = fetch_team_members()
    committers = fetch_committers(team_members)
    save_combined_data(committers, team_members)

    print("Processing complete.")
