#!/bin/bash

echo "Starting build pdf script"

# Auth
AUTH_ONLY=true bash deploy.sh

# Run 
cd pdf-gen
npm run build