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
export PATH="/opt/homebrew/bin:/opt/homebrew/opt/node@22/bin:/usr/local/bin:$PATH"

# Create symlink as fallback (if needed)
sudo ln -sf /opt/homebrew/opt/node@22/bin/node /usr/local/bin/node || true

# Verify Node.js is accessible
echo "===== Verifying Node.js installation ====="
which node
node --version
echo "PATH: $PATH"

# Install dependencies
echo "===== Running yarn install ====="
yarn install

echo "===== Running pod install ====="
cd ..
echo "Current directory: $(pwd)"
pod install