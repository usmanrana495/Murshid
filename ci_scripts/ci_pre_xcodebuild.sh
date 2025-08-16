#!/bin/bash
set -e

echo "=== Xcode Cloud Pre-build Script ==="
echo "Current directory: $(pwd)"

# Add Node.js to PATH (Xcode Cloud has Node.js installed but not in default PATH)
export PATH="/usr/local/bin:$PATH"
export PATH="/opt/homebrew/bin:$PATH"

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "npm not found in PATH, trying to locate Node.js..."
    # Try common Node.js installation paths
    if [ -f "/usr/local/bin/npm" ]; then
        export PATH="/usr/local/bin:$PATH"
    elif [ -f "/opt/homebrew/bin/npm" ]; then
        export PATH="/opt/homebrew/bin:$PATH"
    else
        echo "❌ npm not found. Trying to install Node.js..."
        # Install Node.js using nvm if available
        if command -v curl &> /dev/null; then
            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
            source ~/.nvm/nvm.sh
            nvm install node
            nvm use node
        fi
    fi
fi

# Navigate to project root (two levels up from ios/ci_scripts)
cd "$CI_WORKSPACE"
echo "Project root directory: $(pwd)"
echo "Contents: $(ls -la)"

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

echo "Installing Node.js dependencies..."
if [ -f "package-lock.json" ]; then
    echo "Found package-lock.json, using npm ci"
    npm ci
elif [ -f "yarn.lock" ]; then
    echo "Found yarn.lock, installing yarn"
    npm install -g yarn
    yarn install --frozen-lockfile
else
    echo "No lock file found, using npm install"
    npm install
fi

echo "Node.js dependencies installed successfully"

echo "Installing CocoaPods dependencies..."
cd ios
pod install

echo "=== Pre-build script completed successfully ==="