#!/bin/bash

# Setup script for PXF submodule with sparse checkout
# This script configures sparse checkout for the PXF submodule to only include docs/ directory

set -e

echo "Setting up PXF submodule with sparse checkout..."

# Check if pxf directory exists
if [ ! -d "pxf" ]; then
    echo "ERROR: pxf directory not found. Please run 'git submodule update --init --recursive' first."
    exit 1
fi

# Navigate to pxf directory
cd pxf

# Check if .git directory exists (it might be a file pointing to parent .git/modules)
if [ -f ".git" ]; then
    # It's a gitlink file, find the actual git directory
    GITDIR=$(cat .git | sed 's/gitdir: //')
    echo "Found git directory at: $GITDIR"
    
    # Enable sparse checkout in the git module config
    git config -f "$GITDIR/config" core.sparsecheckout true
    
    # Create sparse-checkout file with docs/ pattern
    mkdir -p "$(dirname "$GITDIR/info/sparse-checkout")"
    echo "docs/" > "$GITDIR/info/sparse-checkout"
    
    # Apply sparse checkout
    git read-tree -mu HEAD
    
    echo "Sparse checkout configured successfully!"
    echo "Only 'docs/' directory will be checked out."
    
    # Show what's actually in the directory
    echo ""
    echo "Current pxf directory contents:"
    ls -la
else
    echo "ERROR: Could not find .git configuration in pxf directory"
    exit 1
fi

echo ""
echo "PXF submodule setup complete!"
echo "The submodule now only contains the docs/ directory."