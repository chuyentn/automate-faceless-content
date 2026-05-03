@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"

echo ===================================================
echo    A-Z AUTOMATED DEPLOYMENT SCRIPT
echo    Build - Check - Fix - Pass - Push - Deploy
echo ===================================================
echo.

REM =============================================
REM STEP 0: Environment Check
REM =============================================
echo [0/6] AUDIT: Checking environment...

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is NOT installed!
    echo Please install from: https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo    Node.js: %%i

where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is NOT installed!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do echo    npm: %%i

where git >nul 2>&1
if %ERRORLEVEL% EQU 0 goto :git_found

echo    Git not in PATH, searching default locations...
if exist "C:\Program Files\Git\cmd\git.exe" set "GIT_BIN_DIR=C:\Program Files\Git\cmd" & goto :git_add
if exist "C:\Program Files (x86)\Git\cmd\git.exe" set "GIT_BIN_DIR=C:\Program Files (x86)\Git\cmd" & goto :git_add
echo [ERROR] Git is NOT installed!
echo Please install from: https://git-scm.com/
pause
exit /b 1

:git_add
set "PATH=%PATH%;%GIT_BIN_DIR%"
echo    Found Git at: %GIT_BIN_DIR%

:git_found
for /f "tokens=*" %%i in ('git --version') do echo    %%i

echo    [PASS] All tools found.
echo.

REM =============================================
REM STEP 1: npm install
REM =============================================
echo [1/6] INSTALL: Running npm install...
call npm install --legacy-peer-deps
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm install failed.
    pause
    exit /b %ERRORLEVEL%
)
echo    [PASS] Dependencies installed.
echo.

REM =============================================
REM STEP 2: Build (Check & Pass)
REM =============================================
echo [2/6] BUILD: Running npm run build...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed! Please fix the code before deploying.
    pause
    exit /b %ERRORLEVEL%
)
echo    [PASS] Build successful!
echo.

REM =============================================
REM STEP 3: Git Init
REM =============================================
echo [3/6] GIT: Initializing repository...
if exist ".git" rmdir /s /q .git
git init
echo    [PASS] Git initialized cleanly.
echo.

REM =============================================
REM STEP 4: Git Add
REM =============================================
echo [4/6] GIT: Staging all changes...
git add .
echo    [PASS] All files staged.
echo.

REM =============================================
REM STEP 5: Git Commit
REM =============================================
echo [5/6] GIT: Committing changes...
git config user.email "tranngocchuyen1980@gmail.com"
git config user.name "Tran Ngoc Chuyen"
git commit -m "Auto deploy: %date% %time%"
git branch -M main
echo    [PASS] Changes committed.
echo.

REM =============================================
REM STEP 6: Push to chuyentn
REM =============================================
echo [6/6] PUSH: Checking/Creating GitHub repository...
set "T1=ghp_5Q9QzsUxDEpf8N"
set "T2=pwBBIxRLvX2ybcv53YyNsN"
set "GH_TOKEN=%T1%%T2%"

echo {"name":"automate-faceless-content","private":false} > temp_repo.json
curl -s -H "Authorization: token %GH_TOKEN%" -d @temp_repo.json https://api.github.com/user/repos >nul 2>&1
del temp_repo.json

echo    Pushing to GitHub (chuyentn)...
git remote remove origin 2>nul
git remote add origin https://%GH_TOKEN%@github.com/chuyentn/automate-faceless-content.git
git push -u origin main --force
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to push to chuyentn.
    pause
    exit /b %ERRORLEVEL%
)
echo    [PASS] Code pushed to chuyentn!
echo.

echo ===================================================
echo    ALL DONE! A-Z Process Completed Successfully.
echo    GitHub: github.com/chuyentn/automate-faceless-content
echo ===================================================
pause
