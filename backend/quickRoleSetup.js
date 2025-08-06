// Quick Setup for Role Requests - MongoDB Direct Connection
const { MongoClient } = require('mongodb');

// MongoDB connection string
const MONGODB_URI = 'mongodb+srv://RYGNeco:mongoRGYNeco.!@rygneco.zy8e7bz.mongodb.net/?retryWrites=true&w=majority&appName=RYGNeco';

async function quickSetup() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('Connected successfully!');
    
    const db = client.db('rygneco');
    
    // Get collections
    const usersCollection = db.collection('users');
    const roleRequestsCollection = db.collection('roleRequests');
    
    console.log('Creating test data...');
    
    // Test employees to create
    const testEmployees = [
      {
        name: 'Alice Cooper',
        email: 'alice.cooper@demo.com',
        firstName: 'Alice',
        lastName: 'Cooper',
        requestedRoles: ['admin', 'inventory_manager']
      },
      {
        name: 'Bob Wilson',
        email: 'bob.wilson@demo.com', 
        firstName: 'Bob',
        lastName: 'Wilson',
        requestedRoles: ['coordinator', 'transporter']
      },
      {
        name: 'Carol Davis',
        email: 'carol.davis@demo.com',
        firstName: 'Carol', 
        lastName: 'Davis',
        requestedRoles: ['inventory_manager']
      }
    ];
    
    let created = 0;
    
    for (const emp of testEmployees) {
      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email: emp.email });
      let userId;
      
      if (!existingUser) {
        // Create new user
        const userResult = await usersCollection.insertOne({
          name: emp.name,
          email: emp.email,
          firstName: emp.firstName,
          lastName: emp.lastName,
          userType: 'employee',
          role: 'employee',
          roleApprovalStatus: 'pending',
          requestedRoles: emp.requestedRoles,
          status: 'active',
          profileCompleted: true,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        userId = userResult.insertedId;
        console.log(`Created user: ${emp.name}`);
      } else {
        userId = existingUser._id;
        console.log(`User already exists: ${emp.name}`);
      }
      
      // Check if role request already exists
      const existingRequest = await roleRequestsCollection.findOne({ 
        employeeEmail: emp.email,
        status: 'pending' 
      });
      
      if (!existingRequest) {
        // Create role request
        await roleRequestsCollection.insertOne({
          employeeId: userId,
          employeeEmail: emp.email,
          employeeName: emp.name,
          requestedRoles: emp.requestedRoles,
          requestReason: `Request for ${emp.requestedRoles.join(', ')} roles to support e-waste management operations.`,
          status: 'pending',
          priority: 'medium',
          submissionDate: new Date(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
        created++;
        console.log(`Created role request for: ${emp.name} (${emp.requestedRoles.join(', ')})`);
      } else {
        console.log(`Role request already exists for: ${emp.name}`);
      }
    }
    
    // Check final counts
    const totalUsers = await usersCollection.countDocuments();
    const totalRoleRequests = await roleRequestsCollection.countDocuments();
    const pendingRequests = await roleRequestsCollection.countDocuments({ status: 'pending' });
    
    console.log('\n=== Setup Complete ===');
    console.log(`Total users in database: ${totalUsers}`);
    console.log(`Total role requests: ${totalRoleRequests}`);
    console.log(`Pending role requests: ${pendingRequests}`);
    console.log(`New role requests created: ${created}`);
    
    if (pendingRequests > 0) {
      console.log('\nSuccess! You should now see role requests in your admin dashboard.');
      console.log('Go to the Role Approvals tab to view and manage pending requests.');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  }
}

// Run the setup
quickSetup().catch(console.error);
