#!/usr/bin/env bash
set -x

# Cleanup
rm -Rf ./bin

# Prepare
npx tsc

# Move bin
mkdir ./bin
cp -r ./build/bin/* ./bin/
mv ./bin/htmlhint.js ./bin/htmlhint

# Build core
npm run build
