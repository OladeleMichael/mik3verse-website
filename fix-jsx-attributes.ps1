# Fix JSX attributes to use {`template literals`} syntax
$files = Get-ChildItem -Path "src" -Include "*.jsx","*.js","*.tsx" -Recurse

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Fix JSX attributes: src=`...` to src={`...`}
    $content = $content -replace '(\s+\w+)=`(\$\{[^`]+\}[^`]*)`', '$1={`$2`}'
    
    Set-Content -Path $file.FullName -Value $content -NoNewline
    Write-Host "Fixed JSX: $($file.FullName)" -ForegroundColor Green
}

Write-Host "`nAll JSX attributes fixed!" -ForegroundColor Cyan
