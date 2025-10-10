#!/usr/bin/env node

// Simple test script to verify server configuration
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Quick AI Server Configuration...\n');

// Check if environment files exist
const serverEnvPath = path.join(__dirname, 'server', '.env');
const clientEnvPath = path.join(__dirname, 'client', '.env');

console.log('📁 Environment Files:');
console.log(`Server .env: ${fs.existsSync(serverEnvPath) ? '✅ Found' : '❌ Missing'}`);
console.log(`Client .env: ${fs.existsSync(clientEnvPath) ? '✅ Found' : '❌ Missing'}`);

// Check if required directories exist
const requiredDirs = ['server/controllers', 'server/routes', 'server/middlewares', 'server/configs'];
console.log('\n📂 Required Directories:');
requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  console.log(`${dir}: ${fs.existsSync(dirPath) ? '✅ Found' : '❌ Missing'}`);
});

// Check if required files exist
const requiredFiles = [
  'server/server.js',
  'server/controllers/aiController.js',
  'server/routes/aiRoutes.js',
  'server/middlewares/auth.js',
  'server/configs/db.js',
  'client/src/utils/api.js'
];

console.log('\n📄 Required Files:');
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  console.log(`${file}: ${fs.existsSync(filePath) ? '✅ Found' : '❌ Missing'}`);
});

// Check package.json files
const packageFiles = ['package.json', 'server/package.json', 'client/package.json'];
console.log('\n📦 Package Files:');
packageFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`${file}: ✅ Found (${pkg.name || 'unnamed'})`);
    } catch (e) {
      console.log(`${file}: ❌ Invalid JSON`);
    }
  } else {
    console.log(`${file}: ❌ Missing`);
  }
});

console.log('\n🎉 Configuration test completed!');
console.log('\n📋 Next Steps:');
console.log('1. Fill in your environment variables in the .env files');
console.log('2. Set up your Neon database and run the schema');
console.log('3. Configure Clerk authentication');
console.log('4. Get your Google Gemini API key');
console.log('5. Run: npm run dev');

