# OTP Authentication System

## Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure MongoDB
- Ensure your IP address is whitelisted in MongoDB Atlas
- Connection string is already configured in `config/db.js`

### 3. Start the Server
```bash
node app.js
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes
All routes are prefixed with `/api/auth`

Example:
```bash
# Register/Login endpoint
POST http://localhost:5000/api/auth/register
```

## Project Structure
```
otp auth/
├── config/
│   └── db.js           # Database configuration
├── models/
│   └── user.js         # User model
├── routes/
│   └── authRoutes.js   # Authentication routes
├── app.js              # Main application file
└── package.json        # Dependencies
```

## Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB Atlas IP whitelist includes your IP
- Check internet connection
- Ensure connection string is correct

### Port Already in Use
```bash
# Change PORT in app.js or set environment variable
set PORT=3000
node app.js
```
