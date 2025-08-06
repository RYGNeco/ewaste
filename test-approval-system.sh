#!/bin/bash

echo "🚀 Starting E-Waste Account Approval System Test"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if backend is running
echo -e "${BLUE}1. Checking backend server...${NC}"
if curl -s http://localhost:5000/api/auth/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend server is running${NC}"
else
    echo -e "${RED}❌ Backend server is not running on port 5000${NC}"
    echo -e "${YELLOW}Please start the backend server first:${NC}"
    echo "cd backend && npm run dev"
    exit 1
fi

# Check if frontend is running
echo -e "${BLUE}2. Checking frontend server...${NC}"
if curl -s http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend server is running${NC}"
else
    echo -e "${RED}❌ Frontend server is not running on port 5173${NC}"
    echo -e "${YELLOW}Please start the frontend server:${NC}"
    echo "cd frontend && npm run dev"
    exit 1
fi

# Test API endpoints
echo -e "${BLUE}3. Testing API endpoints...${NC}"

# Test auth status endpoint
echo -e "${YELLOW}Testing /api/auth/approval-status endpoint...${NC}"
response=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:5000/api/auth/approval-status)
if [ "$response" = "401" ]; then
    echo -e "${GREEN}✅ Auth endpoint working (401 expected without token)${NC}"
else
    echo -e "${RED}❌ Auth endpoint returned: $response${NC}"
fi

# Test manual registration endpoint
echo -e "${YELLOW}Testing /api/auth/manual-register endpoint...${NC}"
test_user='{
    "firstName": "Test",
    "lastName": "User", 
    "email": "test@example.com",
    "password": "TestPassword123!",
    "userType": "individual",
    "role": "individual_user"
}'

response=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d "$test_user" \
    -o /dev/null -w "%{http_code}" \
    http://localhost:5000/api/auth/manual-register)

if [ "$response" = "201" ] || [ "$response" = "400" ]; then
    echo -e "${GREEN}✅ Manual registration endpoint working${NC}"
else
    echo -e "${RED}❌ Manual registration endpoint returned: $response${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Test completed!${NC}"
echo ""
echo -e "${BLUE}📝 Next steps:${NC}"
echo "1. Open http://localhost:5173/auth/new-login to test new registration"
echo "2. Register a new account and check email notifications"
echo "3. Login as super admin to approve/reject accounts"
echo "4. Test the complete approval workflow"
echo ""
echo -e "${YELLOW}💡 Tip: Check the backend logs for email notifications and approval status updates${NC}"
