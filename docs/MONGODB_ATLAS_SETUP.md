# MongoDB Atlas Collections Setup Guide

## 🚀 **Manual Setup Instructions**

If the automated script doesn't work, you can set up the collections manually through MongoDB Atlas web interface.

### **Step 1: Access MongoDB Atlas**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Log in to your account
3. Navigate to your cluster (RYGNeco)
4. Click "Browse Collections"

### **Step 2: Create Database**
1. Click "Create Database"
2. Database Name: `rygneco`
3. Collection Name: `users` (we'll create others next)

### **Step 3: Create All Required Collections**

Create these collections one by one:

## 📊 **Collection Schemas**

### **1. users Collection**
```javascript
{
  _id: ObjectId,
  googleId: String (indexed, unique, sparse),
  name: String (required, max 100 chars),
  email: String (required, unique, indexed, lowercase),
  firstName: String (max 50 chars),
  lastName: String (max 50 chars),
  userType: String (enum: ['employee', 'partner', 'super_admin'], required, indexed),
  role: String (enum: ['super_admin', 'admin', 'inventory_manager', 'transporter', 'coordinator', 'partner'], indexed),
  requestedRoles: [String] (enum: ['admin', 'inventory_manager', 'transporter', 'coordinator', 'super_admin']),
  roleApprovalStatus: String (enum: ['pending', 'approved', 'rejected'], default: 'pending', indexed),
  approvedRoles: [String],
  status: String (enum: ['active', 'inactive', 'pending'], default: 'pending', indexed),
  approvedBy: ObjectId (ref: User, indexed),
  approvedAt: Date,
  rejectionReason: String,
  lastLogin: Date,
  profileCompleted: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

### **2. roleRequests Collection**
```javascript
{
  _id: ObjectId,
  employeeId: ObjectId (ref: User, required, indexed),
  employeeEmail: String (required, indexed, lowercase),
  employeeName: String (required),
  requestedRoles: [String] (enum: ['admin', 'inventory_manager', 'transporter', 'coordinator'], required),
  requestReason: String (max 500 chars),
  status: String (enum: ['pending', 'approved', 'rejected'], default: 'pending', indexed),
  reviewedBy: ObjectId (ref: User, indexed),
  reviewedAt: Date,
  approvedRoles: [String],
  rejectionReason: String (max 500 chars),
  priority: String (enum: ['low', 'medium', 'high'], default: 'medium'),
  createdAt: Date,
  updatedAt: Date
}
```

### **3. partners Collection**
```javascript
{
  _id: ObjectId,
  organizationName: String (required, max 200 chars, indexed),
  contactPerson: {
    firstName: String (required, max 50 chars),
    lastName: String (required, max 50 chars),
    email: String (required, indexed, lowercase),
    phone: String (required)
  },
  address: {
    street: String (required, max 200 chars),
    city: String (required, max 100 chars, indexed),
    state: String (required, max 100 chars, indexed),
    zipCode: String (required),
    country: String (required, default: 'United States'),
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  businessInfo: {
    businessType: String (required, max 100 chars),
    industry: String (required, max 100 chars, indexed),
    employeeCount: Number (required, min: 1),
    website: String,
    description: String (max 1000 chars)
  },
  status: String (enum: ['active', 'inactive', 'pending', 'suspended'], default: 'pending', indexed),
  pickupHistory: [{
    batchId: String (required),
    pickupDate: Date (required),
    status: String (enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled'),
    weight: Number (required, min: 0),
    deviceCount: Number (required, min: 0),
    value: Number (default: 0, min: 0)
  }],
  totalPickups: Number (default: 0, min: 0),
  totalWeight: Number (default: 0, min: 0),
  totalDevices: Number (default: 0, min: 0),
  totalValue: Number (default: 0, min: 0),
  certifications: [{
    name: String (required),
    number: String (required),
    issuedDate: Date (required),
    expiryDate: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### **4. ewasteItems Collection**
```javascript
{
  _id: ObjectId,
  itemId: String (required, unique, indexed),
  qrCode: String (required),
  deviceInfo: {
    type: String (required, enum: ['desktop', 'laptop', 'tablet', 'smartphone', 'monitor', 'printer', 'scanner', 'server', 'network_equipment', 'other_electronics'], indexed),
    brand: String (required, max 100 chars),
    model: String (required, max 100 chars),
    serialNumber: String (indexed),
    yearManufactured: Number (min: 1980, max: current year)
  },
  condition: String (enum: ['working', 'partially_working', 'broken', 'unknown'], required, indexed),
  estimatedValue: Number (default: 0, min: 0),
  weight: Number (required, min: 0),
  partnerId: ObjectId (ref: Partner, required, indexed),
  batchId: ObjectId (ref: Batch, indexed),
  status: String (enum: ['received', 'in_processing', 'data_wiped', 'disassembled', 'recycled', 'resold'], default: 'received', indexed),
  photos: [{
    url: String (required),
    description: String,
    uploadedAt: Date (default: now)
  }],
  certifications: [{
    type: String (enum: ['data_destruction', 'recycling', 'disposal'], required),
    certificateNumber: String (required),
    issuedDate: Date (required),
    fileUrl: String
  }],
  processingNotes: [{
    note: String (required),
    addedBy: ObjectId (ref: User),
    addedAt: Date (default: now)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### **5. batches Collection**
```javascript
{
  _id: ObjectId,
  batchNumber: String (required, unique, indexed),
  partnerId: ObjectId (ref: Partner, required, indexed),
  items: [ObjectId] (ref: EWasteItem),
  status: String (enum: ['pending', 'scheduled', 'picked_up', 'in_processing', 'completed'], default: 'pending', indexed),
  pickupDate: Date (indexed),
  completionDate: Date (indexed),
  summary: {
    totalWeight: Number (default: 0, min: 0),
    totalValue: Number (default: 0, min: 0),
    totalItems: Number (default: 0, min: 0),
    deviceBreakdown: [{
      type: String (required),
      count: Number (required, min: 0),
      weight: Number (required, min: 0)
    }]
  },
  recyclingCertificate: {
    certificateNumber: String,
    issuedDate: Date,
    fileUrl: String
  },
  processingNotes: String (max 1000 chars),
  assignedTo: ObjectId (ref: User, indexed),
  createdAt: Date,
  updatedAt: Date
}
```

### **6. analytics Collection**
```javascript
{
  _id: ObjectId,
  type: String (required, enum: ['daily', 'weekly', 'monthly', 'yearly'], indexed),
  date: Date (required, indexed),
  metrics: {
    totalItems: Number (default: 0),
    totalWeight: Number (default: 0),
    totalValue: Number (default: 0),
    itemsProcessed: Number (default: 0),
    itemsRecycled: Number (default: 0),
    itemsResold: Number (default: 0),
    partnersActive: Number (default: 0),
    batchesCompleted: Number (default: 0)
  },
  environmentalImpact: {
    carbonFootprintReduced: Number (default: 0),
    energySaved: Number (default: 0),
    materialsRecovered: {
      copper: Number (default: 0),
      aluminum: Number (default: 0),
      steel: Number (default: 0),
      plastic: Number (default: 0),
      gold: Number (default: 0),
      silver: Number (default: 0)
    }
  },
  deviceBreakdown: [{
    type: String (required),
    count: Number (required),
    weight: Number (required),
    value: Number (required)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 **Required Indexes**

### **Users Collection Indexes:**
```javascript
{ email: 1 }                           // Unique
{ googleId: 1 }                        // Unique, sparse
{ userType: 1 }
{ roleApprovalStatus: 1 }
{ status: 1 }
{ userType: 1, roleApprovalStatus: 1 } // Compound
{ createdAt: -1 }
```

### **RoleRequests Collection Indexes:**
```javascript
{ employeeId: 1 }
{ employeeEmail: 1 }
{ status: 1 }
{ reviewedBy: 1 }
{ employeeId: 1, status: 1 }           // Compound
{ status: 1, createdAt: -1 }           // Compound
```

### **Partners Collection Indexes:**
```javascript
{ organizationName: 1 }
{ "contactPerson.email": 1 }
{ "address.city": 1 }
{ "address.state": 1 }
{ "businessInfo.industry": 1 }
{ status: 1 }
{ organizationName: "text", "contactPerson.email": "text" } // Text search
```

### **EWasteItems Collection Indexes:**
```javascript
{ itemId: 1 }                          // Unique
{ "deviceInfo.serialNumber": 1 }
{ "deviceInfo.type": 1 }
{ condition: 1 }
{ partnerId: 1 }
{ batchId: 1 }
{ status: 1 }
{ partnerId: 1, status: 1 }            // Compound
```

### **Batches Collection Indexes:**
```javascript
{ batchNumber: 1 }                     // Unique
{ partnerId: 1 }
{ status: 1 }
{ assignedTo: 1 }
{ pickupDate: 1 }
{ partnerId: 1, status: 1 }            // Compound
```

### **Analytics Collection Indexes:**
```javascript
{ type: 1 }
{ date: 1 }
{ type: 1, date: -1 }                  // Compound
```

## 🌱 **Initial Data to Insert**

### **Super Admin User:**
```javascript
{
  name: "Super Admin",
  email: "superadmin@rygneco.com",
  firstName: "Super",
  lastName: "Admin",
  userType: "super_admin",
  role: "super_admin",
  roleApprovalStatus: "approved",
  approvedRoles: ["super_admin"],
  status: "active",
  profileCompleted: true,
  createdAt: new Date(),
  updatedAt: new Date()
}
```

## 🚀 **Alternative: Use MongoDB Compass**

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect using your connection string
3. Create database `rygneco`
4. Create collections manually using the GUI
5. Import sample data using JSON files

## 📝 **Verification Steps**

After creating collections:

1. Verify all 6 collections exist:
   - users
   - roleRequests
   - partners
   - ewasteItems
   - batches
   - analytics

2. Check that indexes are created for performance
3. Insert sample data for testing
4. Test your application connection

Your MongoDB Atlas database is now ready for the e-waste tracker application!
