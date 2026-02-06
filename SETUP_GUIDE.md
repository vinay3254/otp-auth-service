# Complete Setup Guide - OTP Authentication System

## Step 1: Install Node.js
1. Download Node.js from https://nodejs.org/
2. Install and verify:
```bash
node --version
npm --version
```

## Step 2: Install Project Dependencies
1. Open terminal in project folder
2. Run:
```bash
npm install
```

This installs:
- express
- mongoose
- express-session
- nodemailer (if needed)

## Step 3: Setup MongoDB Atlas (Cloud Database)

### Create MongoDB Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" and sign up
3. Create a free account

### Create Cluster
1. After login, click "Build a Database"
2. Choose "FREE" (M0) tier
3. Select a cloud provider and region
4. Click "Create Cluster"

### Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username and password
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### Whitelist IP Address
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Or add your specific IP: `152.57.42.177/32`
5. Click "Confirm"

### Get Connection String
1. Go back to "Database" (Clusters)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Update `config/db.js` with this connection string

## Step 4: Start the Server
```bash
node app.js
```

You should see:
```
Server running on port 5000
MongoDB connected
```

## Step 5: Install and Setup Postman

### Install Postman
1. Download from https://www.postman.com/downloads/
2. Install and open Postman

### Test API Endpoints

#### Example: Register User
1. Create new request in Postman
2. Set method to `POST`
3. Enter URL: `http://localhost:5000/api/auth/register`
4. Go to "Body" tab
5. Select "raw" and "JSON"
6. Enter JSON data:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
7. Click "Send"

#### Example: Login User
1. Method: `POST`
2. URL: `http://localhost:5000/api/auth/login`
3. Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
4. Click "Send"

## Common Terminal Commands

### Windows
```bash
# Navigate to project folder
cd "C:\Users\Admin\Desktop\otp auth"

# Install dependencies
npm install

# Start server
node app.js

# Stop server
Ctrl + C
```

### Check if port is in use
```bash
netstat -ano | findstr :5000
```

## Troubleshooting

### MongoDB Connection Failed
- Check internet connection
- Verify IP is whitelisted in MongoDB Atlas
- Confirm connection string is correct
- Ensure password has no special characters or encode them

### Port Already in Use
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

### Module Not Found
```bash
npm install
```

## Project File Structure
```
otp auth/
├── config/
│   └── db.js              # MongoDB connection
├── models/
│   └── user.js            # User schema
├── routes/
│   └── authRoutes.js      # API routes
├── app.js                 # Main server file
├── package.json           # Dependencies
└── README.md              # Documentation
```

## Quick Start Commands
```bash
# 1. Install dependencies
npm install

# 2. Start server
node app.js

# 3. Test in Postman
# POST http://localhost:5000/api/auth/register
```
