@echo off
echo Fixing all merge conflicts in the codebase...

echo Creating clean firebase.ts file...
echo import { initializeApp } from "firebase/app"; > frontend\src\firebase.ts
echo import { getAnalytics } from "firebase/analytics"; >> frontend\src\firebase.ts
echo. >> frontend\src\firebase.ts
echo const firebaseConfig = { >> frontend\src\firebase.ts
echo   apiKey: "AIzaSyAoznGnNXV8uofB_dnq_SArcv7VqK9AyaY", >> frontend\src\firebase.ts
echo   authDomain: "rygneco-f58e7.firebaseapp.com", >> frontend\src\firebase.ts
echo   projectId: "rygneco-f58e7", >> frontend\src\firebase.ts
echo   storageBucket: "rygneco-f58e7.appspot.com", >> frontend\src\firebase.ts
echo   messagingSenderId: "761945196987", >> frontend\src\firebase.ts
echo   appId: "1:761945196987:web:2e3c37137cb4f0f6f45c9e", >> frontend\src\firebase.ts
echo   measurementId: "G-9YG3W87394" >> frontend\src\firebase.ts
echo }; >> frontend\src\firebase.ts
echo. >> frontend\src\firebase.ts
echo // Initialize Firebase >> frontend\src\firebase.ts
echo const app = initializeApp(firebaseConfig); >> frontend\src\firebase.ts
echo const analytics = getAnalytics(app); >> frontend\src\firebase.ts
echo. >> frontend\src\firebase.ts
echo export default app; >> frontend\src\firebase.ts

echo Fixing Footer.tsx...
copy /Y frontend\src\components\Footer.temp.tsx frontend\src\components\Footer.tsx

echo All merge conflicts fixed! You can now run the frontend and backend servers.
