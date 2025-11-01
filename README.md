# Quick AI - AI-Powered Content Creation Platform

A comprehensive MERN stack application that provides various AI-powered tools for content creation, including article writing, blog title generation, image generation, resume reviewing, and more.

## 🚀 Features

- **AI Article Writer**: Generate high-quality articles on any topic
- **Blog Title Generator**: Create catchy, SEO-friendly blog titles
- **AI Image Generation**: Generate images from text prompts
- **Resume Reviewer**: Get AI-powered feedback on your resume
- **User Authentication**: Secure authentication with Clerk
- **Usage Tracking**: Track free usage and premium plans
- **Modern UI**: Beautiful, responsive interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Clerk** - Authentication and user management
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Neon Database** - Serverless PostgreSQL
- **Clerk Express** - Server-side authentication
- **Google Gemini AI** - AI content generation
- **Axios** - HTTP client

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- A Neon database account
- A Clerk account for authentication
- A Google AI API key

## 🔧 Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Quick_ai
```

### 2. Install dependencies

#### Server dependencies
```bash
cd server
npm install
```

#### Client dependencies
```bash
cd client
npm install
```

### 3. Environment Setup

#### Server Environment Variables
Create a `.env` file in the `server` directory:
```env
PORT=3000
DATABASE_URL=your_neon_database_url_here
GEMINI_API_KEY=your_gemini_api_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

#### Client Environment Variables
Create a `.env` file in the `client` directory:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
VITE_API_URL=http://localhost:3000
```

### 4. Database Setup

Run the SQL schema in your Neon database:
```bash
# Copy the contents of server/database.sql and run it in your Neon database console
```

### 5. Start the application

You can start the application in two ways:

#### Option A: Start both together (recommended for development)
```bash
npm run dev
```
This will start both the server and client concurrently.

#### Option B: Start individually (if Option A has issues)

**Terminal 1 - Start the server:**
```bash
cd server
npm run server
```

**Terminal 2 - Start the client:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173 (or http://localhost:5174 if port 5173 is in use)
- Backend: http://localhost:3000

### 6. Testing the API

After the server is running, you can test the API endpoints:

```bash
# In a new terminal, run the test suite
node test-api.js
```

Or run the comprehensive integration tests:

```bash
node test-integration.js
```

Expected output: All tests should pass (9/9 with 100% success rate)

## 🔑 API Keys Setup

### Google Gemini AI
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new project
3. Generate an API key
4. Add it to your server `.env` file as `GEMINI_API_KEY`

### Clerk Authentication
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy the publishable key to client `.env`
4. Copy the secret key to server `.env`

### Neon Database
1. Go to [Neon Console](https://console.neon.tech/)
2. Create a new database
3. Copy the connection string to server `.env`

## 📁 Project Structure

```
Quick_ai/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── package.json
├── server/                # Node.js backend
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Express middlewares
│   ├── routes/           # API routes
│   ├── configs/          # Configuration files
│   ├── database.sql      # Database schema
│   └── package.json
└── README.md
```

## 🚀 Available Scripts

### Client Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Server Scripts
```bash
npm run server       # Start development server with nodemon
npm start           # Start production server
```

## 🔌 API Endpoints

### Authentication Required
All API endpoints require authentication via Clerk.

### Available Endpoints
- `POST /api/ai/generate-article` - Generate articles
- `POST /api/ai/generate-blog-titles` - Generate blog titles
- `POST /api/ai/generate-images` - Generate images
- `POST /api/ai/review-resume` - Review resumes

## 🎨 Features Overview

### Article Writer
- Generate articles of different lengths (Short, Medium, Long)
- AI-powered content creation
- Real-time generation with loading states

### Blog Title Generator
- Generate multiple catchy titles
- SEO-optimized suggestions
- Search and filter functionality

### Image Generator
- Text-to-image generation
- Multiple style options
- Batch image generation

### Resume Reviewer
- AI-powered resume analysis
- Detailed feedback and suggestions
- File upload support

## 🔒 Authentication & Authorization

The application uses Clerk for:
- User registration and login
- Session management
- Plan-based access control (Free vs Premium)
- Usage tracking

## 📊 Usage Limits

- **Free Plan**: 10 generations per user
- **Premium Plan**: Unlimited generations

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variables in your hosting platform

### Backend Deployment (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the environment variables
2. Ensure all dependencies are installed
3. Verify API keys are correct
4. Check the database connection

## 🔄 Recent Updates

- Fixed API connection issues
- Added comprehensive error handling
- Implemented proper authentication flow
- Added loading states and user feedback
- Created database schema
- Added environment configuration

---

**Happy Coding! 🚀**
