#!/bin/bash

# Check for .env files
if [[ ! -f "./server/.env" || ! -f "./admin-ui/.env" ]]; then
  echo "env files not found. The app will not start. Please check the readme."
  exit 1
fi

# Navigate to the server directory and start Docker Compose
cd ./server || exit
docker-compose -f docker-compose.yml up --build