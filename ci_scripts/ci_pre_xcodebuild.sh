#!/bin/bash
set -e

echo "=== Xcode Cloud Pre-build Script ==="
echo "Current directory: $(pwd)"
echo "Listing files: $(ls -la)"

# Navigate to the project root (where package.json is)
cd "$CI_WORKSPACE"

echo "Installing Node.js dependencies..."
if [ -f "package-lock.json" ]; then
    echo "Found package-lock.json, using npm ci"
    npm ci
elif [ -f "yarn.lock" ]; then
    echo "Found yarn.lock, installing yarn and using it"
    npm install -g yarn
    yarn install --frozen-lockfile
else
    echo "No lock file found, using npm install"
    npm install
fi

echo "Node.js dependencies installed successfully"

echo "Installing CocoaPods dependencies..."
cd ios
rm -rf Pods
rm -f Podfile.lock
pod install

echo "=== Pre-build script completed successfully ==="