## 🔍 ROLE REQUESTS TROUBLESHOOTING GUIDE

### **Why You Can't See Role Requests - Diagnosis:**

#### **Possible Issues:**

1. **❌ Database Connection Problem**
   - MongoDB Atlas not accessible
   - Incorrect connection string
   - IP address not whitelisted

2. **❌ Empty Database**
   - No role requests created yet
   - Collections don't exist

3. **❌ API Endpoint Issues**
   - Backend server not running
   - Routes not properly configured
   - Authentication middleware blocking requests

4. **❌ Frontend Issues**
   - API calls not configured
   - Wrong endpoint URLs
   - No UI components to display data

---

### **🔧 STEP-BY-STEP FIXES:**

#### **STEP 1: Test Database Connection**
```bash
cd backend
npm run check-role-requests
```

#### **STEP 2: Create Test Data**
```bash
npm run create-role-requests
```

#### **STEP 3: Verify Collections Exist**
```bash
npm run create-collections
```

#### **STEP 4: Check Database Status**
```bash
npm run status-check
```

#### **STEP 5: Start Backend Server**
```bash
npm run dev
```

#### **STEP 6: Test API Endpoints**
Open a new terminal and test:

```bash
# Test role requests endpoint (Super Admin access required)
curl -X GET http://localhost:5000/api/role-requests/pending

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@rygneco.com","password":"yourpassword"}'
```

---

### **🎯 QUICK DIAGNOSIS:**

**Run this command to diagnose the issue:**
```bash
cd backend && npm run status-check
```

**Expected Output:**
```
✅ Connected! Found X collections:
   📄 users: X documents
   📄 roleRequests: X documents
🔔 Pending role requests: X
👤 Super admins: X
```

**If you see errors:**
- ❌ ENOTFOUND = Internet/DNS issue
- ❌ Authentication failed = Wrong MongoDB credentials
- ❌ Server selection failed = IP not whitelisted in MongoDB Atlas

---

### **🚀 MOST LIKELY SOLUTIONS:**

#### **Solution 1: MongoDB Atlas IP Whitelist**
1. Go to MongoDB Atlas dashboard
2. Network Access → IP Whitelist
3. Add your current IP: `0.0.0.0/0` (or your specific IP)

#### **Solution 2: Create Test Data**
```bash
cd backend
npm run create-role-requests
```

#### **Solution 3: Fix Database Name**
Your `.env` file should have:
```
MONGODB_URI=mongodb+srv://RYGNeco:mongoRGYNeco.!@rygneco.zy8e7bz.mongodb.net/rygneco?retryWrites=true&w=majority
```
(Notice `/rygneco` before the `?`)

#### **Solution 4: Check Frontend API Calls**
Make sure your frontend is calling:
```typescript
// Get pending role requests
GET /api/role-requests/pending

// Get all role requests  
GET /api/role-requests

// User's own requests
GET /api/role-requests/my-requests
```

---

### **🔍 CURRENT STATUS CHECK:**

**Your setup has:**
- ✅ MongoDB Atlas connection string configured
- ✅ Role request controller implemented
- ✅ API routes defined
- ✅ Database schemas created
- ✅ TypeScript scripts for testing

**Most likely issue:** No test data in database OR connection problem

**Next step:** Run `npm run check-role-requests` to see actual database status
