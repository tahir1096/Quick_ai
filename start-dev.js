#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Quick AI Development Environment...\n');

// Start server
console.log('📡 Starting server...');
const server = spawn('npm', ['run', 'server'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// Start client after a short delay
setTimeout(() => {
  console.log('\n💻 Starting client...');
  const client = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'client'),
    stdio: 'inherit',
    shell: true
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down...');
    server.kill();
    client.kill();
    process.exit(0);
  });
}, 2000);

server.on('error', (error) => {
  console.error('❌ Server error:', error);
});

server.on('close', (code) => {
  console.log(`📡 Server process exited with code ${code}`);
});
