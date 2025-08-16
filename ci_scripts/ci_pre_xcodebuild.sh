#!/bin/bash
set -e

echo "=== Xcode Cloud Pre-build Script ==="

# Install Homebrew if not present (Xcode Cloud should have it)
if ! command -v brew &> /dev/null; then
    echo "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH
    if [[ $(uname -m) == "arm64" ]]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
    else
        eval "$(/usr/local/bin/brew shellenv)"
    fi
fi

# Install Node.js using Homebrew
if ! command -v node &> /dev/null; then
    echo "Installing Node.js via Homebrew..."
    brew install node
fi

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Navigate to project root
cd "$CI_WORKSPACE"

echo "Installing Node.js dependencies..."
if [ -f "package-lock.json" ]; then
    npm ci
elif [ -f "yarn.lock" ]; then
    npm install -g yarn
    yarn install --frozen-lockfile
else
    npm install
fi

echo "Installing CocoaPods..."
cd ios
rm -rf Pods
rm -f Podfile.lock
pod install

echo "=== Setup completed successfully ===="