@echo off

:: Cleanup
IF EXIST build ( rmdir build /q /s ) ELSE ( echo build folder not present )
IF EXIST bin ( rmdir bin /q /s ) ELSE ( echo bin folder not present )
IF EXIST dist ( rmdir dist /q /s ) ELSE ( echo dist folder not present )

:: Prepare
call npx tsc

:: Move bin
mkdir bin
robocopy build\bin bin /s /e
ren "bin\htmlhint.js" "htmlhint"

:: Build core
npm run build:rollup
