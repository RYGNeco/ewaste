#!/usr/bin/env node

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('../firebase-service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'rygneco-f58e7'
});

async function updateAuthorizedDomains() {
  try {
    const auth = admin.auth();
    
    // Get current authorized domains
    const projectConfig = await auth.getProjectConfig();
    const currentDomains = projectConfig.authorizedDomains || [];
    
    // Define required domains
    const requiredDomains = [
      'rygneco-ewaste-tracker.vercel.app',
      'rygneco-f58e7.firebaseapp.com',
      'localhost'
    ];
    
    // Add missing domains
    const missingDomains = requiredDomains.filter(domain => 
      !currentDomains.includes(domain)
    );
    
    if (missingDomains.length > 0) {
      console.log('Adding missing domains:', missingDomains);
      const updatedDomains = [...currentDomains, ...missingDomains];
      
      await auth.updateProjectConfig({
        authorizedDomains: updatedDomains
      });
      
      console.log('✅ Authorized domains updated successfully');
      console.log('Current domains:', updatedDomains);
    } else {
      console.log('✅ All required domains are already authorized');
      console.log('Current domains:', currentDomains);
    }
    
  } catch (error) {
    console.error('❌ Error updating authorized domains:', error);
    process.exit(1);
  }
}

// Run the function
updateAuthorizedDomains(); 