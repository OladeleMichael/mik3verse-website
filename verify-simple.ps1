# Simple Verification Script - Check S3 Configuration

Write-Host "Checking S3 URL Configuration..." -ForegroundColor Cyan
Write-Host ""

$errors = 0

# 1. Check for hardcoded S3 URLs in src/ (excluding config file entirely)
Write-Host "1. Checking source files for hardcoded S3 URLs..." -ForegroundColor Yellow
$sourceFiles = Get-ChildItem -Path "src" -Recurse -Include *.jsx,*.js | Where-Object { $_.Name -ne "assets.js" }
$hardcoded = $sourceFiles | Select-String -Pattern "https://mik3verse-portfolio-assets\.s3"
if ($hardcoded) {
    Write-Host "   [ERROR] Found hardcoded S3 URLs in components:" -ForegroundColor Red
    $hardcoded | ForEach-Object { Write-Host "   - $($_.Filename):$($_.LineNumber)" -ForegroundColor Red }
    $errors++
} else {
    Write-Host "   [OK] No hardcoded S3 URLs in components (config file fallback is OK)" -ForegroundColor Green
}

# 2. Check index.html
Write-Host "2. Checking index.html..." -ForegroundColor Yellow
$indexContent = Get-Content "index.html" -Raw
if ($indexContent -match '%VITE_ASSETS_BASE_URL%') {
    Write-Host "   [OK] Uses environment variable placeholder" -ForegroundColor Green
} elseif ($indexContent -match 'mik3verse-portfolio-assets') {
    Write-Host "   [ERROR] Contains hardcoded S3 URL" -ForegroundColor Red
    $errors++
} else {
    Write-Host "   [OK] No asset URLs found" -ForegroundColor Green
}

# 3. Check config file exists
Write-Host "3. Checking src/config/assets.js..." -ForegroundColor Yellow
if (Test-Path "src\config\assets.js") {
    $configContent = Get-Content "src\config\assets.js" -Raw
    if ($configContent -match 'import\.meta\.env\.VITE_ASSETS_BASE_URL') {
        Write-Host "   [OK] Uses Vite environment variable" -ForegroundColor Green
    } else {
        Write-Host "   [ERROR] Missing environment variable usage" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "   [ERROR] Config file not found!" -ForegroundColor Red
    $errors++
}

# 4. Check components import ASSETS_BASE_URL
Write-Host "4. Checking component imports..." -ForegroundColor Yellow
$components = @(
    "src\pages\VideographyPage.jsx",
    "src\pages\FitnessPage.jsx",
    "src\pages\TechPage.jsx",
    "src\components\videography\Services.jsx",
    "src\components\videography\Pricing.jsx"
)

foreach ($comp in $components) {
    if (Test-Path $comp) {
        $content = Get-Content $comp -Raw
        if ($content -match 'import.*ASSETS_BASE_URL') {
            Write-Host "   [OK] $($comp.Split('\')[-1])" -ForegroundColor Green
        } else {
            Write-Host "   [ERROR] $($comp.Split('\')[-1]) - Missing import" -ForegroundColor Red
            $errors++
        }
    }
}

# 5. Test build
Write-Host "5. Testing build..." -ForegroundColor Yellow
$buildResult = npm run build 2>&1 | Out-String
if ($LASTEXITCODE -eq 0) {
    Write-Host "   [OK] Build successful" -ForegroundColor Green
} else {
    Write-Host "   [ERROR] Build failed" -ForegroundColor Red
    $errors++
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
if ($errors -eq 0) {
    Write-Host "SUCCESS: All checks passed!" -ForegroundColor Green
    Write-Host "Your project is ready to push to git." -ForegroundColor Green
    exit 0
} else {
    Write-Host "FAILED: Found $errors error(s)" -ForegroundColor Red
    Write-Host "Please fix the errors above." -ForegroundColor Red
    exit 1
}
