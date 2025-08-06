$content = @"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAoznGnNXV8uofB_dnq_SArcv7VqK9AyaY",
  authDomain: "rygneco-f58e7.firebaseapp.com",
  projectId: "rygneco-f58e7",
  storageBucket: "rygneco-f58e7.appspot.com",
  messagingSenderId: "761945196987",
  appId: "1:761945196987:web:2e3c37137cb4f0f6f45c9e",
  measurementId: "G-9YG3W87394"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
"@

try {
    # First try to delete the file if it exists
    if (Test-Path "c:\Users\Khushi\Downloads\ewaste-khushi\ewaste-khushi\frontend\src\firebase.ts") {
        Remove-Item -Path "c:\Users\Khushi\Downloads\ewaste-khushi\ewaste-khushi\frontend\src\firebase.ts" -Force
    }
    
    # Now write the new content
    $content | Out-File -FilePath "c:\Users\Khushi\Downloads\ewaste-khushi\ewaste-khushi\frontend\src\firebase.ts" -Encoding utf8 -Force
    
    Write-Host "Firebase.ts file has been fixed successfully!"
} catch {
    Write-Host "Error fixing firebase.ts: $_"
}
