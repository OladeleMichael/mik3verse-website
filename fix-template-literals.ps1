# Fix template literal syntax for S3 URLs
$files = Get-ChildItem -Path "src" -Include "*.jsx","*.js","*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace single quotes with template literals where ${ASSETS_BASE_URL} is used
    $content = $content -replace "'(\$\{ASSETS_BASE_URL\}[^']*)'", '`$1`'
    $content = $content -replace '"(\$\{ASSETS_BASE_URL\}[^"]*)"', '`$1`'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed: $($file.FullName)" -ForegroundColor Green
}

Write-Host "`nAll template literals fixed!" -ForegroundColor Cyan
