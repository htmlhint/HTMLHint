@echo off

:: Cleanup
if exist build rmdir build /q /s
if exist bin rmdir bin /q /s
if exist dist rmdir dist /q /s

:: Prepare
npx tsc

:: Move bin
mkdir bin
robocopy build/bin bin /s /e
ren "bin/htmlhint.js" "htmlhint"

:: Build core
npm run build:rollup
