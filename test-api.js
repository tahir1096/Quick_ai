#!/usr/bin/env node

/**
 * Quick AI API Test Script
 * Tests basic server health and AI endpoints with mock Bearer tokens
 */

const API_BASE = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Quick AI API Test Suite\n');

  // Test 1: Health check
  console.log('✅ Test 1: Server Health Check');
  try {
    const res = await fetch(`${API_BASE}/`);
    const data = await res.json();
    console.log('   Response:', data);
    console.log('   Status:', res.status, res.ok ? '✓' : '✗');
  } catch (err) {
    console.error('   Error:', err.message);
  }

  console.log('\n✅ Test 2: AI Router Health Check (no auth)');
  try {
    const res = await fetch(`${API_BASE}/api/ai/`);
    const data = await res.json();
    console.log('   Response:', data);
    console.log('   Status:', res.status, res.ok ? '✓ (should fail without auth)' : '✗');
  } catch (err) {
    console.error('   Error:', err.message);
  }

  console.log('\n✅ Test 3: AI Router Health Check (with mock dev fallback)');
  console.log('   Note: Running without Clerk token will use dev fallback (dev-user)\n');
  try {
    // In dev, the server should fallback to dev-user without a real token
    const res = await fetch(`${API_BASE}/api/ai/`);
    const data = await res.json();
    console.log('   Response:', data);
    console.log('   Status:', res.status, res.ok ? '✓' : '✗');
  } catch (err) {
    console.error('   Error:', err.message);
  }

  console.log('\n✅ Test 4: Generate Blog Titles (dev fallback mode)');
  try {
    const res = await fetch(`${API_BASE}/api/ai/generate-blog-titles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Machine Learning Basics', count: 3 })
    });
    const data = await res.json();
    console.log('   Response:', data);
    console.log('   Status:', res.status, res.ok ? '✓' : '✗');
    if (data.titles) {
      console.log('   Generated titles:');
      data.titles.forEach((title, i) => console.log(`     ${i+1}. ${title}`));
    }
  } catch (err) {
    console.error('   Error:', err.message);
  }

  console.log('\n✅ Test 5: Generate Article (dev fallback mode)');
  try {
    const res = await fetch(`${API_BASE}/api/ai/generate-article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'What is Artificial Intelligence?', length: 500 })
    });
    const data = await res.json();
    console.log('   Response (first 200 chars):', data.content?.substring(0, 200) + '...');
    console.log('   Status:', res.status, res.ok ? '✓' : '✗');
  } catch (err) {
    console.error('   Error:', err.message);
  }

  console.log('\n✅ Test 6: Generate Images (dev fallback mode)');
  try {
    const res = await fetch(`${API_BASE}/api/ai/generate-images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'A futuristic city', style: 'realistic', count: 2 })
    });
    const data = await res.json();
    console.log('   Response:', data);
    console.log('   Status:', res.status, res.ok ? '✓' : '✗');
    if (data.images) {
      console.log('   Generated image URLs:');
      data.images.forEach((img, i) => console.log(`     ${i+1}. ${img.url}`));
    }
  } catch (err) {
    console.error('   Error:', err.message);
  }

  console.log('\n✅ Test 7: Review Resume (dev fallback mode)');
  try {
    const res = await fetch(`${API_BASE}/api/ai/review-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText: 'Senior Developer\nExperience: 5 years in Node.js\nSkills: JavaScript, React, Express' })
    });
    const data = await res.json();
    console.log('   Response (first 200 chars):', data.review?.substring(0, 200) + '...');
    console.log('   Status:', res.status, res.ok ? '✓' : '✗');
  } catch (err) {
    console.error('   Error:', err.message);
  }

  console.log('\n✨ API Tests Complete!\n');
}

testAPI().catch(console.error);
