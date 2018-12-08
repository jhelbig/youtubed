#!/bin/bash

if [ ! -e "/app/youtubed_config.json" ]; then
    echo "Building out config for application"
    envsubst < /app/api/youtubed_config_template.json > /app/api/youtubed_config.json
else
  echo "API config exists, skipping generation"
fi

cat /app/api/youtubed_config.json

echo "Starting Application Service"
node /app/api/youtubed.js
