#!/bin/bash
# auto_verify_remote.sh
#
# This script performs two tasks:
# 1. It checks all changed Markdown files (between origin/main and HEAD)
#    using markdownlint.
# 2. It connects to a remote host (2.56.166.146) via SSH (as gpadmin)
#    and performs Cloudberry backup verification.
#
# Usage:
#   ./auto_verify_remote.sh [--docker] [remote_backup_directory]
#
# Examples:
#   ./auto_verify_remote.sh
#       => Checks Markdown files and then verifies the default remote backup directory (/backup/cloudberry/coordinator)
#
#   ./auto_verify_remote.sh /my/remote_backup
#       => Checks Markdown files and then verifies the specified remote backup directory.
#
#   ./auto_verify_remote.sh --docker
#       => Checks Markdown files and then verifies using Docker mode on the default remote backup directory.
#
#   ./auto_verify_remote.sh --docker /my/remote_backup
#       => Checks Markdown files and then verifies using Docker mode on the specified directory.

###########################
# Step 1: Markdown Lint Check (Local)
###########################
echo "========================================"
echo "Starting Markdown lint check..."
# Get the list of changed Markdown files between origin/main and HEAD
md_files=$(git diff --name-only origin/main...HEAD | grep '\.md$')

if [ -z "$md_files" ]; then
    echo "No Markdown files found in the current commit."
else
    echo "Checking the following Markdown files:"
    echo "$md_files"
    for file in $md_files; do
        echo "Linting: $file"
        markdownlint "$file"
        if [ $? -ne 0 ]; then
            echo "Formatting issues found in file: $file"
        fi
    done
fi
echo "Markdown lint check complete."
echo "========================================"

###########################
# Step 2: Remote Backup Verification via SSH
###########################
# Default remote backup directory (adjust as needed)
REMOTE_BACKUP_DIR="/backup/cloudberry/coordinator"
# Default: do not use Docker mode
USE_DOCKER=0

# Parse command line arguments for remote backup verification.
while [[ $# -gt 0 ]]; do
    case "$1" in
        --docker)
            USE_DOCKER=1
            shift
            ;;
        *)
            REMOTE_BACKUP_DIR="$1"
            shift
            ;;
    esac
done

# SSH connection details
REMOTE_HOST="2.56.166.146"
REMOTE_USER="gpadmin"
# Determine the current script directory to locate the SSH key file
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
# SSH key file: typically the private key (e.g., ./id_rsa) is used for authentication.
# Here, we assume the key is in the same directory as this script.
SSH_KEY="$SCRIPT_DIR/id_rsa.pub"  # Change to "$SCRIPT_DIR/id_rsa" if needed.

echo "========================================"
echo "Connecting to remote host: $REMOTE_HOST as $REMOTE_USER"
echo "Remote backup directory: $REMOTE_BACKUP_DIR"
if [ $USE_DOCKER -eq 1 ]; then
    echo "Verification mode: Docker"
else
    echo "Verification mode: Local pg_verifybackup command"
fi
echo "Using SSH key from: $SSH_KEY"
echo "========================================"

# Execute remote commands via SSH
ssh -i "$SSH_KEY" ${REMOTE_USER}@${REMOTE_HOST} <<EOF
echo "========================================"
echo "Remote backup verification started."
echo "Backup directory: ${REMOTE_BACKUP_DIR}"
if [ ${USE_DOCKER} -eq 1 ]; then
    echo "Using Docker mode for verification."
    docker run --rm -v "${REMOTE_BACKUP_DIR}":"${REMOTE_BACKUP_DIR}" cloudberry/pg_verifybackup:latest pg_verifybackup "${REMOTE_BACKUP_DIR}"
    RESULT=\$?
else
    echo "Using local pg_verifybackup command."
    # Uncomment and adjust the following line if pg_verifybackup is not in the default PATH
    # export PATH="/usr/local/cloudberry-db/bin:\$PATH"
    pg_verifybackup "${REMOTE_BACKUP_DIR}"
    RESULT=\$?
fi
if [ \$RESULT -eq 0 ]; then
    echo "Remote backup verification successful!"
else
    echo "Remote backup verification failed! Please check the logs for details."
fi
echo "Remote backup verification complete."
echo "========================================"
EOF

echo "All tasks completed."