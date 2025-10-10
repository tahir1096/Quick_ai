import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware } from '@clerk/express';
import { aiRouter } from './routes/aiRoutes.js';

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-production-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Clerk middleware
app.use(clerkMiddleware());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Quick AI Server is live', 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API routes (auth handled inside router via custom middleware)
app.use('/api/ai', aiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

// 404 handler (catch-all)
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Quick AI Server is running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}`);
});