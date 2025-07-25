# Script to create template files for empty component folders
Write-Host "Creating template files for empty component directories..."

# Get all directories in the components structure
$componentDirs = Get-ChildItem -Path "frontend\src\components" -Recurse -Directory

foreach ($dir in $componentDirs) {
    # Check if the directory is empty or only has an empty index.tsx
    $files = Get-ChildItem -Path $dir.FullName -File
    
    if ($files.Count -eq 0 -or ($files.Count -eq 1 -and $files[0].Name -eq "index.tsx" -and (Get-Content -Path $files[0].FullName -Raw).Trim() -eq "")) {
        $componentName = $dir.Name
        
        # Create a basic component template
        $componentContent = @"
import React from 'react';

interface ${componentName}Props {
  // Define props here
}

const $componentName: React.FC<${componentName}Props> = (props) => {
  return (
    <div className="$($componentName.ToLower())-container">
      {/* $componentName component content will go here */}
      <h2>$componentName</h2>
    </div>
  );
};

export default $componentName;
"@

        # Create index.tsx that exports the component
        $indexContent = @"
import $componentName from './$componentName';
export default $componentName;
"@

        # Write the files
        $componentFilePath = Join-Path -Path $dir.FullName -ChildPath "$componentName.tsx"
        $indexFilePath = Join-Path -Path $dir.FullName -ChildPath "index.tsx"
        
        Write-Host "Creating component at: $componentFilePath"
        Set-Content -Path $componentFilePath -Value $componentContent
        Set-Content -Path $indexFilePath -Value $indexContent
    }
}

Write-Host "Done creating template files."
