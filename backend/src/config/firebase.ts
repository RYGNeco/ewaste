import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    // For development, you can use the default credentials
    // For production, set the GOOGLE_APPLICATION_CREDENTIALS environment variable
    // or provide service account key file path
    credential: admin.credential.applicationDefault(),
    projectId: process.env.FIREBASE_PROJECT_ID || 'your-firebase-project-id'
  });
}

export { admin };
export const auth = admin.auth();
export default admin;
