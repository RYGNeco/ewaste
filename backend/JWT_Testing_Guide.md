# Express.js JWT Authentication - Quick Test Guide

## 1. Start the Server
Run in your project root:
```
node backend/server.js
```

## 2. Login to Get a JWT Token
- Send a POST request to `http://localhost:5000/api/auth/login`
- Body (raw, JSON):
  - For admin:
    ```json
    {
      "username": "admin",
      "password": "adminpass"
    }
    ```
  - For user:
    ```json
    {
      "username": "user",
      "password": "userpass"
    }
    ```
- Copy the `token` from the response.

## 3. Access Protected Route
- Send a GET request to `http://localhost:5000/api/protected`
- Add header:
  - `Authorization Value: Bearer <your_token>`
- Should return user info.

## 4. Access Admin-Only Route
- Send a GET request to `http://localhost:5000/api/admin`
- Add header:
  - `Authorization Value: Bearer <your_token>`
- Only works with admin token. User token will return 403 Forbidden.

## 5. Error Cases
- No token: 401 Unauthorized
- Invalid token: 403 Forbidden
- Non-admin on `/api/admin`: 403 Forbidden

---

