# Production Environment Setup Guide

## Environment Variables Required

Make sure these environment variables are set in your production environment (e.g., Vercel):

### Required Variables:
```bash
# Database
DATABASE_URL="postgresql://username:password@host:5432/database_name"

# Better Auth - Server Side
BETTER_AUTH_SECRET="your-long-random-secret-key-here"

# Better Auth - Client Side (Public)
NEXT_PUBLIC_BETTER_AUTH_URL="https://your-production-domain.com"

# Email Service
RESEND_API_KEY="your-resend-api-key-here"
```

### Important Notes:

1. **NEXT_PUBLIC_BETTER_AUTH_URL**: This MUST be set to your production domain (e.g., `https://synapse-sage.vercel.app`)
2. **BETTER_AUTH_SECRET**: Must be a long, random string (at least 32 characters)
3. **DATABASE_URL**: Must point to your production PostgreSQL database
4. **RESEND_API_KEY**: Required for email verification

## Common Production Issues Fixed:

### 1. Cookie Name Mismatch
- Fixed: Changed cookie name from `"auth.session_token"` to `"better-auth.session_token"`
- This ensures consistency between server and client

### 2. Base URL Configuration
- Fixed: Improved base URL detection logic for production
- Added fallback to `NEXT_PUBLIC_BETTER_AUTH_URL` environment variable
- Added proper Vercel URL detection

### 3. Error Handling
- Added comprehensive error logging for debugging
- Enhanced error messages for better user experience
- Added network error detection

### 4. CORS and Security
- Updated trusted origins to include production domain
- Ensured secure cookies in production
- Added proper SameSite cookie settings

## Debugging Production Issues:

1. Check browser console for detailed error logs
2. Verify environment variables are set correctly
3. Check network tab for failed API requests
4. Ensure database connection is working
5. Verify email service configuration

## Testing Checklist:

- [ ] Environment variables are set correctly
- [ ] Database connection is working
- [ ] Email verification is working
- [ ] Sign-in works in production
- [ ] Sign-up works in production
- [ ] Session persistence works
- [ ] Sign-out works correctly
