@echo off

:: Cleanup
IF EXIST dist ( rmdir dist /q /s ) ELSE ( echo dist folder not present )

:: Prepare
call npx tsc

:: Build core
npm run build:rollup
