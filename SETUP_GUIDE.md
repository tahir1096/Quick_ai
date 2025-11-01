# Quick AI SaaS - Setup Guide

## 🚀 Quick Start

This guide will help you set up and run the Quick AI SaaS application properly.

## 📋 Prerequisites

- **Node.js** (version 18 or higher)
- **Git** (for cloning the repository)
- **Neon Database** account (for PostgreSQL database)
- **Clerk** account (for authentication)
- **Google Gemini API** key (for AI features)

## 🔧 Installation Steps

### 1. Clone and Install Dependencies

```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

### 2. Environment Configuration

#### Server Environment (`server/.env`)
```env
PORT=3000
DATABASE_URL=your_neon_database_url_here
GEMINI_API_KEY=your_gemini_api_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

#### Client Environment (`client/.env`)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_API_URL=http://localhost:3000
```

### 3. Database Setup

1. Create a Neon database account at [neon.tech](https://neon.tech)
2. Create a new database project
3. Copy the connection string to `DATABASE_URL` in your server `.env`
4. Run the SQL schema in your Neon database:

```sql
-- Copy and run the contents of server/database.sql in your Neon database
CREATE TABLE IF NOT EXISTS creations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    prompt TEXT NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_creations_user_id ON creations(user_id);
CREATE INDEX IF NOT EXISTS idx_creations_type ON creations(type);
CREATE INDEX IF NOT EXISTS idx_creations_created_at ON creations(created_at);
```

### 4. Clerk Authentication Setup

1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the **Publishable Key** to `VITE_CLERK_PUBLISHABLE_KEY` in client `.env`
4. Copy the **Secret Key** to `CLERK_SECRET_KEY` in server `.env`
5. Configure your Clerk application:
   - Enable **Email** authentication
   - Set **Redirect URLs**: `http://localhost:5173/ai` (for development)
   - Set **Sign-in URL**: `http://localhost:5173/ai`

### 5. Google Gemini API Setup

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the key to `GEMINI_API_KEY` in your server `.env`
4. (Optional) Test the API with: `node test-api.js` (requires server running)

## 🚀 Running the Application

### Development Mode (Recommended)

```bash
# Start both server and client concurrently
npm run dev
```

This will start:
- **Server**: http://localhost:3000
- **Client**: http://localhost:5173

### Individual Services

```bash
# Start server only
cd server && npm run server

# Start client only (in another terminal)
cd client && npm run dev
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading
- Ensure `.env` files are in the correct directories (`server/.env` and `client/.env`)
- Check that variable names match exactly (case-sensitive)
- Restart the development servers after changing `.env` files

#### 2. Database Connection Issues
- Verify your Neon database URL is correct
- Check that the database schema has been created
- Ensure your Neon database is active (not paused)

#### 3. Authentication Issues
- Verify Clerk keys are correct
- Check that redirect URLs are properly configured in Clerk dashboard
- Ensure you're using the correct environment (development vs production)

#### 4. API Errors
- Check server console for detailed error messages
- Verify all environment variables are set
- Ensure the server is running on the correct port

#### 5. CORS Issues
- The server is configured to allow requests from `http://localhost:5173`
- If using a different port, update the CORS configuration in `server/server.js`

### Port Conflicts

If you encounter port conflicts:

```bash
# Kill processes on specific ports
npx kill-port 3000  # Server port
npx kill-port 5173  # Client port
```

## 📁 Project Structure

```
Quick_ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utilities
│   │   └── assets/         # Static assets
│   ├── .env               # Client environment variables
│   └── package.json
├── server/                 # Express backend
│   ├── controllers/        # Route handlers
│   ├── middlewares/        # Authentication middleware
│   ├── routes/            # API routes
│   ├── configs/           # Database configuration
│   ├── .env               # Server environment variables
│   └── package.json
├── package.json           # Root package.json
├── setup.js              # Setup script
├── start-dev.js          # Development startup script
└── database.sql          # Database schema
```

## 🎯 Features

- **Article Generation**: AI-powered article writing
- **Blog Title Generation**: Create catchy blog titles
- **Image Generation**: Generate images from text prompts
- **Background Removal**: Remove backgrounds from images
- **Object Removal**: Remove objects from images
- **Resume Review**: AI-powered resume feedback
- **User Authentication**: Secure user management with Clerk
- **Usage Tracking**: Free tier with premium upgrades

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- The application uses JWT tokens for authentication
- All API routes are protected with authentication middleware

## 🚀 Production Deployment

For production deployment:

1. Update CORS origins in `server/server.js`
2. Set production environment variables
3. Build the client: `npm run build`
4. Use a process manager like PM2 for the server
5. Set up proper SSL certificates
6. Configure production database and authentication services

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review server console logs for error messages
3. Verify all environment variables are correctly set
4. Ensure all external services (Clerk, Neon, Gemini) are properly configured

## 🎉 You're Ready!

Once everything is set up correctly, you should be able to:

1. Visit http://localhost:5173
2. Sign up/Login with Clerk
3. Access the AI tools at http://localhost:5173/ai
4. Generate content using the various AI features

Happy coding! 🚀

