#!/bin/zsh

echo "===== Installing CocoaPods ====="
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods

echo "===== Installing Node.js ====="
brew install node@22

echo "===== Installing yarn ====="
brew install yarn

# Update PATH to include Homebrew-installed Node.js
echo "===== Updating PATH ====="
export PATH="/opt/homebrew/bin:$PATH"
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"

# Verify Node.js is accessible
echo "===== Verifying Node.js installation ====="
which node
node --version

# Install dependencies
echo "===== Running yarn install ====="
yarn install

echo "===== Running pod install ====="
cd ..
echo "Current directory: $(pwd)"
pod install