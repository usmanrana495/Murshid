#!/bin/zsh

echo "===== Installling CocoaPods ====="
export HOMEBREW_NO_INSTALL_CLEANUP=TRUE
brew install cocoapods
echo "===== Installing Node.js ====="
brew install node

echo "===== Sourcing .zshrc ====="
source ~/.zshrc

echo "===== Checking Node.js version ====="
which node
node --version

echo "===== Installing yarn ====="
brew install yarn

# Install dependencies
echo "===== Running yarn install ====="
yarn install
echo "===== Running pod install ======"
cd ..
echo "Current directory: $(pwd)"
pod install