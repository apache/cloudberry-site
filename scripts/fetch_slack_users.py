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
fetch_slack_users.py

This script fetches Slack users and filters them based on a hardcoded list of names.
Duplicate names are excluded by keeping only the first occurrence.

Output:
- `slack_users.json`: Contains matched users with the following fields:
  - name: Slack user's real name.
  - profile_image: URL to the user's Slack profile image.

Requirements:
- A valid Slack API token with the `users:read` permission.
  The token must be set as an environment variable `SLACK_TOKEN`.

Notes:
- The hardcoded list of user names is manually retrieved from the Slack workspace
  members area, where it is possible to filter active users.
- This script is designed to work at the free API level, as Slack APIs do not provide
  sufficient information to programmatically determine active users in free-tier workspaces.

Prerequisites:
- Python 3.7 or later.
- Modules: `requests`.

Usage:
1. Ensure you have `requests` installed (`pip install requests`).
2. Set the environment variable `SLACK_TOKEN` with a valid token:
   - export SLACK_TOKEN="your_slack_api_token"
3. Run the script:
   - ./fetch_slack_users.py
4. The output file `slack_users.json` will be saved in the `static` directory.
"""

import os
import requests
import json

# Slack API Token from environment variable
SLACK_TOKEN = os.getenv("SLACK_TOKEN")
if not SLACK_TOKEN:
    raise ValueError("Please set the SLACK_TOKEN environment variable.")

# Slack API URL
SLACK_USERS_URL = "https://slack.com/api/users.list"

# Headers for API request
HEADERS = {"Authorization": f"Bearer {SLACK_TOKEN}"}

# Hardcoded list of user names
USER_NAMES = [
    "Abhi", "Albert C", "Albert Dong", "Alwin", "Amy Levine", "Andreas Eschbacher",
    "Antonio Petrole", "Bernard", "Brad Howerter", "Chuck Renaud", "David",
    "Dianjin Wang", "Eddie Espino", "franck sidi", "Greg Spiegelberg", "Hao Wu",
    "Himanshu Pandey", "Jacque Istok", "Jakub Sicner", "jiaqizho", "Joaquim Oliveira",
    "John Huang", "kalo", "kris", "Leon Cheng", "Leonid Borchuk", "Liang Chen",
    "Lirong Jian", "Louis Mugnano", "Luis Macedo", "Max Yang", "Nadir Pervez",
    "Nikolay", "Nixon Daniel Hutahaean", "roseduan", "Ryan Wei", "sai", "Sharon",
    "Shine Zhang 张辛", "Tony Wasson", "Travis L", "Tushar Pednekar", "Way Dev",
    "Xuebin", "Yuriy", "Zhang Mingli", "ZhangBaowen", "Айдарханов Даурен"
]

# Determine absolute path to static directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.abspath(os.path.join(SCRIPT_DIR, "../static"))

# Ensure static directory exists
os.makedirs(STATIC_DIR, exist_ok=True)


def fetch_slack_users():
    """
    Fetch Slack users and filter by a hardcoded list of names.
    Exclude duplicates by keeping the first occurrence.
    Save their names and profile images to a JSON file.
    """
    print("Fetching Slack users from API...")
    slack_users = {}
    matched_users = []

    # Fetch users from Slack API
    response = requests.get(SLACK_USERS_URL, headers=HEADERS)
    if response.status_code != 200:
        print(f"Error fetching Slack users: {response.status_code}, {response.text}")
        return

    data = response.json()
    if not data.get("ok"):
        print(f"Slack API error: {data.get('error')}")
        return

    # Process users and match against the hardcoded list
    slack_user_data = data.get("members", [])
    for user in slack_user_data:
        # Skip bots and deleted users
        if user.get("is_bot") or user.get("deleted"):
            continue

        # Extract user name and profile image
        real_name = user.get("real_name", "").strip()
        profile_image = user.get("profile", {}).get("image_512")

        # Check if name is in USER_NAMES and not already recorded
        if real_name in USER_NAMES and real_name not in slack_users:
            slack_users[real_name] = {"name": real_name, "profile_image": profile_image}
            matched_users.append(slack_users[real_name])
            print(f"Matched user: {real_name}")

    # Save matched users to JSON
    output_path = os.path.join(STATIC_DIR, "slack_users.json")
    with open(output_path, "w") as file:
        json.dump(matched_users, file, indent=4)
    print(f"Slack users saved to {output_path} ({len(matched_users)} matched users)")


if __name__ == "__main__":
    fetch_slack_users()
