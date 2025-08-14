#!/bin/sh

# Xcode Cloud post-clone script
# This script runs after Xcode Cloud clones your repository

set -e

echo "Installing CocoaPods..."

# Navigate to iOS directory
cd ios

# Install pods
pod install

echo "CocoaPods installation completed successfully"