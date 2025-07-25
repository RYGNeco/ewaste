# Script to add export statements to empty TypeScript files
Write-Host "Finding empty TypeScript files and adding export statements..."

# Find all TypeScript and TSX files
$tsFiles = Get-ChildItem -Path "frontend\src" -Recurse -Include "*.ts","*.tsx" -File

foreach ($file in $tsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # If file is empty or doesn't contain any imports or exports
    if ([string]::IsNullOrWhiteSpace($content) -or (-not ($content -match "import|export"))) {
        Write-Host "Adding export statement to: $($file.FullName)"
        
        # Add an empty export statement to make it a module
        Add-Content -Path $file.FullName -Value "export {};"
    }
}

Write-Host "Done adding export statements to empty TypeScript files."
