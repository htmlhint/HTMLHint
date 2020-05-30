#!/usr/bin/env bash
set -x

# Cleanup
rm -Rf ./dist

# Prepare
npx tsc

# Build core
npm run build:rollup
