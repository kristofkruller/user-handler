#!/bin/bash

# Source environment variables
# shellcheck disable=SC1091
source ./server/.env || { echo "Failed to source environment variables."; exit 1; }

# Enter the ./server directory
cd ./server || { echo "Failed to enter ./server directory."; exit 1; }

# Run the commands in this order
npm run prisma:generate || { echo "npm run prisma:generate failed."; exit 1; }
npm run docker:dev || { echo "npm run docker:dev failed."; exit 1; }
npm run db:init || { echo "npm run db:init failed."; exit 1; }
  # "start": "nest start",
  # "start:watch": "nest start --watch",
  # "start:debug": "nest start --debug --watch",
npm run start:debug || { echo "npm run start failed."; exit 1; }