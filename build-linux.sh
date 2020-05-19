#!/usr/bin/env bash
set -x

# Cleanup
rm -Rf ./build
rm -Rf ./bin
rm -Rf ./dist

# Prepare
npx tsc

# Move bin
mkdir ./bin
cp -r ./build/bin/* ./bin/
mv ./bin/htmlhint.js ./bin/htmlhint

# Build core
npm run build:rollup
