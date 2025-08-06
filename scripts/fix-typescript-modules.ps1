# Setup Docker frontend build fix
# This script adds export {} to empty TypeScript files

# Navigate to the frontend src directory
cd ./frontend/src

# Find all TypeScript and TSX files in the frontend src directory
$tsFiles = Get-ChildItem -Path . -Recurse -Include "*.ts","*.tsx"

Write-Host "Found $($tsFiles.Count) TypeScript files to check"

# Add export {} to files that don't have import or export statements
$fixedFiles = 0
foreach ($file in $tsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    
    # Check if the file is empty or doesn't contain imports/exports
    if ([string]::IsNullOrWhiteSpace($content) -or -not ($content -match "(import|export)")) {
        Write-Host "Adding export statement to $($file.FullName)"
        
        # Add export {} at the beginning of the file
        Set-Content -Path $file.FullName -Value "export {};`n$content"
        $fixedFiles++
    }
}

Write-Host "Fixed $fixedFiles TypeScript files by adding 'export {}' statements"
