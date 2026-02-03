@echo off
set "PATH=%PATH%;C:\Program Files\nodejs"
echo verified node installation:
node -v
echo.
echo Starting Xcellence Tutoring Server...
echo Open the URL shown below in your browser (e.g., http://localhost:3000)
echo.
call npx serve .
pause
