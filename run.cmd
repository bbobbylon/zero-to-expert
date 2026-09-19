@echo off
rem run.cmd - lets you type "run dev" from cmd or PowerShell on Windows.
rem Starts run.ps1 with -ExecutionPolicy Bypass for this one process only, so Windows' default
rem script policy doesn't block it and nothing on your machine's settings changes.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0run.ps1" %*
exit /b %ERRORLEVEL%
