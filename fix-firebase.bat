@echo off
echo Fixing firebase.ts file...

cd c:\Users\Khushi\Downloads\ewaste-khushi\ewaste-khushi\frontend\src

echo Attempting to delete the file...
del /F /Q firebase.ts

echo Creating new firebase.ts file...
echo import { initializeApp } from "firebase/app"; > firebase.ts
echo import { getAnalytics } from "firebase/analytics"; >> firebase.ts
echo. >> firebase.ts
echo const firebaseConfig = { >> firebase.ts
echo   apiKey: "AIzaSyAoznGnNXV8uofB_dnq_SArcv7VqK9AyaY", >> firebase.ts
echo   authDomain: "rygneco-f58e7.firebaseapp.com", >> firebase.ts
echo   projectId: "rygneco-f58e7", >> firebase.ts
echo   storageBucket: "rygneco-f58e7.appspot.com", >> firebase.ts
echo   messagingSenderId: "761945196987", >> firebase.ts
echo   appId: "1:761945196987:web:2e3c37137cb4f0f6f45c9e", >> firebase.ts
echo   measurementId: "G-9YG3W87394" >> firebase.ts
echo }; >> firebase.ts
echo. >> firebase.ts
echo // Initialize Firebase >> firebase.ts
echo const app = initializeApp(firebaseConfig); >> firebase.ts
echo const analytics = getAnalytics(app); >> firebase.ts
echo. >> firebase.ts
echo export default app; >> firebase.ts

echo Firebase.ts file has been fixed!
