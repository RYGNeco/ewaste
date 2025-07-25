$emptyFiles = Get-ChildItem -Path "g:\rygneco-ewaste-tracker\frontend\src" -Recurse -File | Where-Object { $_.Length -eq 0 }

Write-Host "Found $($emptyFiles.Count) empty files."

foreach ($file in $emptyFiles) {
    try {
        Write-Host "Removing $($file.FullName)"
        Remove-Item -Path $file.FullName -Force
    } catch {
        Write-Host "Failed to remove $($file.FullName): $_"
    }
}

Write-Host "Empty files removal complete."
