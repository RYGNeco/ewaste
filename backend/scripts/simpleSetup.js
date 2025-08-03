// Direct MongoDB Atlas Setup - Simple Version
const { MongoClient } = require('mongodb');
require('dotenv').config();

async function setupAtlas() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    console.log('🔌 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected successfully!');
    
    const db = client.db('rygneco');
    
    // Create collections
    const collections = ['users', 'roleRequests', 'partners', 'ewasteItems', 'batches', 'analytics'];
    
    console.log('\n📄 Creating collections...');
    for (const collName of collections) {
      try {
        const exists = await db.listCollections({ name: collName }).hasNext();
        if (!exists) {
          await db.createCollection(collName);
          console.log(`✅ Created: ${collName}`);
        } else {
          console.log(`✅ Exists: ${collName}`);
        }
      } catch (error) {
        console.log(`❌ Error with ${collName}: ${error.message}`);
      }
    }
    
    // Create super admin
    console.log('\n👤 Creating Super Admin...');
    const usersCollection = db.collection('users');
    
    const existingAdmin = await usersCollection.findOne({ userType: 'super_admin' });
    if (!existingAdmin) {
      await usersCollection.insertOne({
        name: 'Super Admin',
        email: 'superadmin@rygneco.com',
        firstName: 'Super',
        lastName: 'Admin',
        userType: 'super_admin',
        role: 'super_admin',
        roleApprovalStatus: 'approved',
        approvedRoles: ['super_admin'],
        status: 'active',
        profileCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('✅ Super Admin created');
    } else {
      console.log('✅ Super Admin already exists');
    }
    
    // Create test role requests
    console.log('\n📝 Creating test role requests...');
    const roleRequestsCollection = db.collection('roleRequests');
    
    const testEmployees = [
      {
        name: 'Alice Cooper',
        email: 'alice.cooper@demo.com',
        requestedRoles: ['admin', 'inventory_manager']
      },
      {
        name: 'Bob Wilson', 
        email: 'bob.wilson@demo.com',
        requestedRoles: ['coordinator', 'transporter']
      },
      {
        name: 'Carol Davis',
        email: 'carol.davis@demo.com', 
        requestedRoles: ['inventory_manager']
      }
    ];
    
    for (const emp of testEmployees) {
      // Create user first
      const existingUser = await usersCollection.findOne({ email: emp.email });
      let userId;
      
      if (!existingUser) {
        const userResult = await usersCollection.insertOne({
          name: emp.name,
          email: emp.email,
          firstName: emp.name.split(' ')[0],
          lastName: emp.name.split(' ')[1],
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
        console.log(`✅ Created user: ${emp.name}`);
      } else {
        userId = existingUser._id;
        console.log(`✅ User exists: ${emp.name}`);
      }
      
      // Create role request
      const existingRequest = await roleRequestsCollection.findOne({ 
        employeeEmail: emp.email, 
        status: 'pending' 
      });
      
      if (!existingRequest) {
        await roleRequestsCollection.insertOne({
          employeeId: userId,
          employeeEmail: emp.email,
          employeeName: emp.name,
          requestedRoles: emp.requestedRoles,
          requestReason: `Request for ${emp.requestedRoles.join(', ')} roles to support e-waste management operations.`,
          status: 'pending',
          priority: 'medium',
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log(`✅ Created role request for: ${emp.name}`);
      } else {
        console.log(`✅ Role request exists for: ${emp.name}`);
      }
    }
    
    // Final status check
    console.log('\n📊 Final Status:');
    const allCollections = await db.listCollections().toArray();
    console.log(`Collections: ${allCollections.map(c => c.name).join(', ')}`);
    
    const userCount = await usersCollection.countDocuments();
    const roleRequestCount = await roleRequestsCollection.countDocuments();
    const pendingCount = await roleRequestsCollection.countDocuments({ status: 'pending' });
    
    console.log(`Users: ${userCount}`);
    console.log(`Role Requests: ${roleRequestCount} (${pendingCount} pending)`);
    
    console.log('\n🎉 MongoDB Atlas setup completed successfully!');
    console.log('💡 You should now see role requests in your admin dashboard.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.close();
    console.log('\n🔌 Disconnected from MongoDB Atlas');
  }
}

setupAtlas();
