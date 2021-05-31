#!/bin/bash

echo "Starting build pdf script"

# Auth
bash auth.sh

# Run 
cd pdf-gen
npm run build