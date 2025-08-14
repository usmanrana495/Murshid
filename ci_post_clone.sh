#!/bin/sh

# Xcode Cloud pre-xcodebuild script
# This runs right before the build process

set -e

echo "Starting pre-xcodebuild script..."
echo "Current directory: $(pwd)"
echo "CI_WORKSPACE: $CI_WORKSPACE"

# Ensure we're in the right directory
cd "$CI_WORKSPACE"

# Navigate to iOS directory if it exists
if [ -d "ios" ]; then
    echo "Navigating to iOS directory..."
    cd ios
    
    # Check if Podfile exists and install
    if [ -f "Podfile" ]; then
        echo "Installing CocoaPods..."
        pod install
        echo "CocoaPods installation completed"
    else
        echo "No Podfile found in ios directory"
    fi
else
    echo "No ios directory found, checking current directory for Podfile..."
    if [ -f "Podfile" ]; then
        echo "Installing CocoaPods..."
        pod install
        echo "CocoaPods installation completed"
    fi
fi

echo "Pre-xcodebuild script completed"