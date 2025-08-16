#!/bin/sh

# Use PORT environment variable from Cloud Run, default to 3000
export PORT=${PORT:-3000}

# Start the application
exec npm run start