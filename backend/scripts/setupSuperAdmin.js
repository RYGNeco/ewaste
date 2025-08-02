const mongoose = require('mongoose');
const User = require('../src/models/User');
require('dotenv').config();

const setupSuperAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rygneco');
    console.log('Connected to MongoDB');

    // Check if Super Admin already exists
    const existingSuperAdmin = await User.findOne({ 
      userType: 'super_admin',
      email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@rygneco.com'
    });

    if (existingSuperAdmin) {
      console.log('Super Admin already exists');
      return;
    }

    // Create Super Admin user
    const superAdmin = new User({
      name: process.env.SUPER_ADMIN_NAME || 'Super Administrator',
      email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@rygneco.com',
      firstName: process.env.SUPER_ADMIN_FIRST_NAME || 'Super',
      lastName: process.env.SUPER_ADMIN_LAST_NAME || 'Administrator',
      userType: 'super_admin',
      role: 'super_admin',
      requestedRoles: ['super_admin'],
      roleApprovalStatus: 'approved',
      approvedRoles: ['super_admin'],
      status: 'active'
    });

    await superAdmin.save();
    console.log('Super Admin created successfully');
    console.log('Email:', superAdmin.email);
    console.log('Role:', superAdmin.role);

  } catch (error) {
    console.error('Error setting up Super Admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the script
if (require.main === module) {
  setupSuperAdmin();
}

module.exports = setupSuperAdmin; 