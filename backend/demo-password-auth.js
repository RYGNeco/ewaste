// Quick password authentication addition for Super Admin demo
// Add to backend/src/routes/auth.ts

import bcrypt from 'bcrypt';

// Super Admin password login endpoint
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // For demo purposes - hardcoded Super Admin credentials
    const DEMO_ADMIN_EMAIL = 'superadmin@rygneco.com';
    const DEMO_ADMIN_PASSWORD = 'SuperAdmin123!'; // Demo password
    
    if (email === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
      // Find Super Admin in database
      const superAdmin = await User.findOne({ 
        email: DEMO_ADMIN_EMAIL,
        userType: 'super_admin' 
      });
      
      if (superAdmin) {
        const token = jwt.sign(
          { id: superAdmin._id, email: superAdmin.email, role: superAdmin.role },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        res.json({
          success: true,
          token,
          user: {
            id: superAdmin._id,
            email: superAdmin.email,
            name: superAdmin.name,
            role: superAdmin.role,
            userType: superAdmin.userType
          }
        });
      }
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});
