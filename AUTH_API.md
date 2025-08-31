# Better-Auth API Documentation

This project provides authentication APIs using better-auth with email and password authentication.

## Environment Setup

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/brainly_next"
BETTER_AUTH_SECRET="your-secret-key-here-make-it-long-and-random"
BETTER_AUTH_URL="http://localhost:3000"
```

## Database Setup

1. Run Prisma migration to create the authentication tables:
```bash
npx prisma migrate dev --name init
```

2. Generate Prisma client:
```bash
npx prisma generate
```

## API Endpoints

### Authentication Endpoints

All authentication endpoints are available through the better-auth handler:

**Base URL:** `/api/auth/`

The main better-auth endpoints include:
- `POST /api/auth/sign-up/email` - Sign up with email and password
- `POST /api/auth/sign-in/email` - Sign in with email and password
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session

### Custom API Endpoints

#### Sign Up
- **URL:** `POST /api/v1/signup`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "User Name" // optional
}
```

#### Sign In
- **URL:** `POST /api/v1/signin`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Sign Out
- **URL:** `POST /api/v1/signout`
- **Headers:** Include session cookies

#### Get Session
- **URL:** `GET /api/v1/session`
- **Headers:** Include session cookies
- **Response:**
```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  },
  "session": {
    "id": "session-id",
    "expiresAt": "2025-09-07T..."
  }
}
```

## Database Schema

The authentication system uses the following tables:
- `User` - User accounts
- `Account` - OAuth accounts and password storage
- `Session` - User sessions
- `Verification` - Email verification tokens

## Usage Examples

### Using fetch to sign up:
```javascript
const response = await fetch('/api/v1/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
    name: 'John Doe'
  })
});
const result = await response.json();
```

### Using fetch to sign in:
```javascript
const response = await fetch('/api/v1/signin', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  }),
  credentials: 'include' // Important for cookies
});
const result = await response.json();
```

### Check session:
```javascript
const response = await fetch('/api/v1/session', {
  credentials: 'include'
});
if (response.ok) {
  const session = await response.json();
  console.log('User:', session.user);
} else {
  console.log('Not authenticated');
}
```
