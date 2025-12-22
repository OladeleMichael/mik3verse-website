# PowerShell Script to Verify S3 URL Configuration
# This checks that all AWS resource URLs are using environment variables

$ErrorCount = 0
$WarningCount = 0

Write-Host "=== Checking AWS Configuration ===" -ForegroundColor Cyan
Write-Host ""

# Check 1: Verify ASSETS_BASE_URL is used in all component files
Write-Host "1. Checking component files for ASSETS_BASE_URL usage..." -ForegroundColor Yellow

$componentFiles = Get-ChildItem -Path "src" -Recurse -Include *.jsx,*.js | Where-Object { $_.Name -notlike "*.test.*" }
$filesWithAssets = @()

foreach ($file in $componentFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Check if file uses asset paths
    if ($content -match '/assets/(videography|fitness|tech|landing|shared)/') {
        # Check if it imports ASSETS_BASE_URL
        if ($content -match 'import.*ASSETS_BASE_URL') {
            Write-Host "  [OK] $($file.Name) - Uses ASSETS_BASE_URL" -ForegroundColor Green
            $filesWithAssets += $file
        } else {
            Write-Host "  [ERROR] $($file.Name) - Uses assets but doesn't import ASSETS_BASE_URL!" -ForegroundColor Red
            $ErrorCount++
        }
    }
}

Write-Host ""

# Check 2: Look for hardcoded S3 URLs in source files
Write-Host "2. Checking for hardcoded S3 URLs in source files..." -ForegroundColor Yellow

$sourceFiles = Get-ChildItem -Path "src" -Recurse -Include *.jsx,*.js,*.ts,*.tsx
$hardcodedUrls = @()

foreach ($file in $sourceFiles) {
    $content = Get-Content $file.FullName -Raw
    
    # Look for hardcoded S3 URLs
    if ($content -match 'https://.*\.s3\.|s3\..*\.amazonaws\.com') {
        if ($file.FullName -notlike "*config\assets.js") {
            Write-Host "  ✗ $($file.Name) - Contains hardcoded S3 URL!" -ForegroundColor Red
            $hardcodedUrls += $file
            $ErrorCount++
        }
    }
}

if ($hardcodedUrls.Count -eq 0) {
    Write-Host "  ✓ No hardcoded S3 URLs found in source files" -ForegroundColor Green
}

Write-Host ""

# Check 3: Verify index.html uses Vite env variable
Write-Host "3. Checking index.html for environment variable usage..." -ForegroundColor Yellow

$indexContent = Get-Content "index.html" -Raw

if ($indexContent -match '%VITE_ASSETS_BASE_URL%') {
    Write-Host "  ✓ index.html uses %VITE_ASSETS_BASE_URL% placeholder" -ForegroundColor Green
} elseif ($indexContent -match 'https://.*\.s3\.|s3\..*\.amazonaws\.com') {
    Write-Host "  ✗ index.html contains hardcoded S3 URLs!" -ForegroundColor Red
    $ErrorCount++
} else {
    Write-Host "  ! index.html doesn't reference any assets" -ForegroundColor Yellow
    $WarningCount++
}

Write-Host ""

# Check 4: Verify .env files
Write-Host "4. Checking environment files..." -ForegroundColor Yellow

if (Test-Path ".env.example") {
    Write-Host "  ✓ .env.example exists" -ForegroundColor Green
} else {
    Write-Host "  ✗ .env.example not found!" -ForegroundColor Red
    $ErrorCount++
}

if (Test-Path ".env.production") {
    Write-Host "  ! .env.production exists locally (should not be committed to git)" -ForegroundColor Yellow
    $WarningCount++
}

Write-Host ""

# Check 5: Verify .gitignore excludes sensitive files
Write-Host "5. Checking .gitignore configuration..." -ForegroundColor Yellow

$gitignoreContent = Get-Content ".gitignore" -Raw

$requiredPatterns = @(
    '.env',
    '.env.*',
    '!.env.example',
    'setup-aws-parameters.ps1',
    'setup-iam-role.ps1',
    '*.pem'
)

foreach ($pattern in $requiredPatterns) {
    if ($gitignoreContent -match [regex]::Escape($pattern)) {
        Write-Host "  ✓ .gitignore excludes: $pattern" -ForegroundColor Green
    } else {
        Write-Host "  ✗ .gitignore missing: $pattern" -ForegroundColor Red
        $ErrorCount++
    }
}

Write-Host ""

# Check 6: Verify config/assets.js structure
Write-Host "6. Checking src/config/assets.js..." -ForegroundColor Yellow

if (Test-Path "src/config/assets.js") {
    $assetsConfig = Get-Content "src/config/assets.js" -Raw
    
    if ($assetsConfig -match 'import\.meta\.env\.VITE_ASSETS_BASE_URL') {
        Write-Host "  ✓ Uses import.meta.env.VITE_ASSETS_BASE_URL" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Doesn't use Vite environment variable!" -ForegroundColor Red
        $ErrorCount++
    }
    
    if ($assetsConfig -match 'export const ASSETS_BASE_URL') {
        Write-Host "  ✓ Exports ASSETS_BASE_URL constant" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Doesn't export ASSETS_BASE_URL!" -ForegroundColor Red
        $ErrorCount++
    }
} else {
    Write-Host "  ✗ src/config/assets.js not found!" -ForegroundColor Red
    $ErrorCount++
}

Write-Host ""

# Check 7: Test build
Write-Host "7. Testing build process..." -ForegroundColor Yellow
Write-Host "  Running npm run build..." -ForegroundColor Gray

$buildOutput = npm run build 2>&1
$buildSuccess = $LASTEXITCODE -eq 0

if ($buildSuccess) {
    Write-Host "  ✓ Build completed successfully" -ForegroundColor Green
} else {
    Write-Host "  ✗ Build failed!" -ForegroundColor Red
    $ErrorCount++
}

Write-Host ""

# Summary
Write-Host "=== Verification Summary ===" -ForegroundColor Cyan
Write-Host ""

if ($ErrorCount -eq 0 -and $WarningCount -eq 0) {
    Write-Host "✅ All checks passed! Your project is ready for deployment." -ForegroundColor Green
    Write-Host ""
    Write-Host "Configuration Status:" -ForegroundColor Cyan
    Write-Host "  • All S3 URLs use environment variables" -ForegroundColor Green
    Write-Host "  • No hardcoded AWS values in source code" -ForegroundColor Green
    Write-Host "  • Proper .gitignore configuration" -ForegroundColor Green
    Write-Host "  • Build process works correctly" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Yellow
    Write-Host "  1. Commit your changes to git"
    Write-Host "  2. Push to clean-branch"
    Write-Host "  3. EC2 instances will auto-configure from Parameter Store"
} elseif ($ErrorCount -eq 0) {
    Write-Host "⚠️  Checks passed with $WarningCount warning(s)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Review warnings above. Project should be safe to deploy." -ForegroundColor Yellow
} else {
    Write-Host "❌ Found $ErrorCount error(s) and $WarningCount warning(s)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please fix the errors above before deploying." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Files Using ASSETS_BASE_URL ===" -ForegroundColor Cyan
foreach ($file in $filesWithAssets) {
    Write-Host "  • $($file.Name)" -ForegroundColor Gray
}
Write-Host ""
