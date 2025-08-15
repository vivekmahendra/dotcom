#!/bin/bash

# Reset newsletter rate limits for development
echo "Resetting newsletter rate limits..."
curl -s -X POST http://localhost:5174/about \
  -d "reset=ratelimits" \
  -H "Content-Type: application/x-www-form-urlencoded" > /dev/null

if [ $? -eq 0 ]; then
  echo "✅ Rate limits reset successfully!"
else
  echo "❌ Failed to reset rate limits. Make sure the dev server is running."
fi