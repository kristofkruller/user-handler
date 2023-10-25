#!/bin/bash

# Source environment variables
# shellcheck disable=SC1091
source ./admin-ui/.env || { echo "Failed to source environment variables."; exit 1; }

# Enter the admin-ui directory
cd ./admin-ui || { echo "Failed to enter ./admin-ui directory."; exit 1; }

# Start frontend
npm run start || { echo "npm run start in admin-ui failed."; exit 1; }