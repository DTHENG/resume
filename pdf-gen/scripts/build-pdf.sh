#!/bin/bash

echo "Starting build pdf script"

# Auth
cd ..
bash auth.sh

# Run 
cd pdf-gen
npm run build