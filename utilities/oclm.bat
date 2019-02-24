@echo off
tasklist /fi "imagename eq notepad.exe" | find ":" > nul
if errorlevel 1 taskkill /f /im "notepad.exe"
exit