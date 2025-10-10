#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Quick AI Setup Script\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Node.js version 18 or higher is required. Current version:', nodeVersion);
  process.exit(1);
}

console.log('✅ Node.js version check passed:', nodeVersion);

// Create environment files if they don't exist
const serverEnvPath = path.join(__dirname, 'server', '.env');
const clientEnvPath = path.join(__dirname, 'client', '.env');

if (!fs.existsSync(serverEnvPath)) {
  console.log('📝 Creating server .env file...');
  fs.writeFileSync(serverEnvPath, `PORT=3000
DATABASE_URL=your_neon_database_url_here
GEMINI_API_KEY=your_gemini_api_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here`);
  console.log('✅ Server .env file created');
} else {
  console.log('✅ Server .env file already exists');
}

if (!fs.existsSync(clientEnvPath)) {
  console.log('📝 Creating client .env file...');
  fs.writeFileSync(clientEnvPath, `VITE_CLERK_PUBLISHABLE_KEY=CLERK_PUBLISHABLE_KEY
VITE_API_URL=http://localhost:3000`);
  console.log('✅ Client .env file created');
} else {
  console.log('✅ Client .env file already exists');
}

console.log('\n📋 Next Steps:');
console.log('1. Fill in your environment variables in the .env files');
console.log('2. Run the database schema in your Neon database (server/database.sql)');
console.log('3. Install dependencies: npm run install-all');
console.log('4. Start development: npm run dev');
console.log('\n🎉 Setup complete! Check the README.md for detailed instructions.');
