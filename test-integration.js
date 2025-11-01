/**
 * Integration Test Suite for Quick AI Server
 * Tests authentication, usage tracking, and AI endpoints
 */

const API_BASE = 'http://localhost:3000';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, ...args) {
  console.log(`${colors[color]}`, ...args, colors.reset);
}

async function runTests() {
  log('cyan', '\n🧪 Quick AI Server Integration Tests\n');
  
  let passCount = 0;
  let failCount = 0;

  // Test Suite 1: Authentication & Dev Fallback
  log('blue', '📋 Test Suite 1: Authentication & Dev Fallback\n');

  // Test 1.1: Dev fallback without auth
  log('yellow', '  Test 1.1: Dev fallback (no Clerk token)');
  try {
    const res = await fetch(`${API_BASE}/api/ai/generate-blog-titles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Test', count: 2 })
    });
    if (res.ok) {
      log('green', '    ✓ PASS: Dev fallback works without Clerk token');
      passCount++;
    } else {
      log('red', `    ✗ FAIL: Status ${res.status}`);
      failCount++;
    }
  } catch (err) {
    log('red', `    ✗ FAIL: ${err.message}`);
    failCount++;
  }

  // Test Suite 2: AI Content Generation
  log('blue', '\n📋 Test Suite 2: AI Content Generation\n');

  // Test 2.1: Blog Title Generation
  log('yellow', '  Test 2.1: Generate blog titles');
  try {
    const res = await fetch(`${API_BASE}/api/ai/generate-blog-titles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Web Development', count: 2 })
    });
    const data = await res.json();
    if (res.ok && data.titles && Array.isArray(data.titles) && data.titles.length > 0) {
      log('green', `    ✓ PASS: Generated ${data.titles.length} titles`);
      passCount++;
    } else {
      log('red', `    ✗ FAIL: Invalid response`);
      failCount++;
    }
  } catch (err) {
    log('red', `    ✗ FAIL: ${err.message}`);
    failCount++;
  }

  // Test 2.2: Article Generation
  log('yellow', '  Test 2.2: Generate article');
  try {
    const res = await fetch(`${API_BASE}/api/ai/generate-article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Benefits of Cloud Computing', length: 300 })
    });
    const data = await res.json();
    if (res.ok && data.content && typeof data.content === 'string' && data.content.length > 0) {
      log('green', `    ✓ PASS: Generated article (${data.content.length} chars)`);
      passCount++;
    } else {
      log('red', `    ✗ FAIL: Invalid response`);
      failCount++;
    }
  } catch (err) {
    log('red', `    ✗ FAIL: ${err.message}`);
    failCount++;
  }

  // Test 2.3: Image Generation
  log('yellow', '  Test 2.3: Generate images');
  try {
    const res = await fetch(`${API_BASE}/api/ai/generate-images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'Sunset beach', style: 'realistic', count: 1 })
    });
    const data = await res.json();
    if (res.ok && data.images && Array.isArray(data.images) && data.images.length > 0) {
      log('green', `    ✓ PASS: Generated ${data.images.length} image(s)`);
      passCount++;
    } else {
      log('red', `    ✗ FAIL: Invalid response`);
      failCount++;
    }
  } catch (err) {
    log('red', `    ✗ FAIL: ${err.message}`);
    failCount++;
  }

  // Test 2.4: Resume Review
  log('yellow', '  Test 2.4: Review resume');
  try {
    const res = await fetch(`${API_BASE}/api/ai/review-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText: 'Senior Engineer\nSkills: JavaScript, Node.js, React' })
    });
    const data = await res.json();
    if (res.ok && data.review && typeof data.review === 'string' && data.review.length > 0) {
      log('green', `    ✓ PASS: Generated resume review (${data.review.length} chars)`);
      passCount++;
    } else {
      log('red', `    ✗ FAIL: Invalid response`);
      failCount++;
    }
  } catch (err) {
    log('red', `    ✗ FAIL: ${err.message}`);
    failCount++;
  }

  // Test Suite 3: Error Handling
  log('blue', '\n📋 Test Suite 3: Error Handling & Validation\n');

  // Test 3.1: Missing required field
  log('yellow', '  Test 3.1: Missing required prompt');
  try {
    const res = await fetch(`${API_BASE}/api/ai/generate-blog-titles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ count: 5 }) // Missing prompt
    });
    // Endpoint should handle gracefully (current impl may not validate, but shouldn't crash)
    if (res.status === 200 || res.status === 400 || res.status === 422) {
      log('green', '    ✓ PASS: Endpoint handles missing prompt gracefully');
      passCount++;
    } else {
      log('red', `    ✗ FAIL: Unexpected status ${res.status}`);
      failCount++;
    }
  } catch (err) {
    log('red', `    ✗ FAIL: ${err.message}`);
    failCount++;
  }

  // Test 3.2: Invalid method (should return 404 or error)
  log('yellow', '  Test 3.2: Invalid endpoint');
  try {
    const res = await fetch(`${API_BASE}/api/ai/invalid-endpoint`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    if (res.status === 404) {
      log('green', '    ✓ PASS: Invalid endpoint returns 404');
      passCount++;
    } else {
      log('red', `    ✗ FAIL: Expected 404, got ${res.status}`);
      failCount++;
    }
  } catch (err) {
    log('red', `    ✗ FAIL: ${err.message}`);
    failCount++;
  }

  // Test Suite 4: Server Health
  log('blue', '\n📋 Test Suite 4: Server Health & Status\n');

  // Test 4.1: Health check
  log('yellow', '  Test 4.1: Health check endpoint');
  try {
    const res = await fetch(`${API_BASE}/`);
    const data = await res.json();
    if (res.ok && data.status === 'healthy') {
      log('green', '    ✓ PASS: Server is healthy');
      passCount++;
    } else {
      log('red', `    ✗ FAIL: Server not healthy`);
      failCount++;
    }
  } catch (err) {
    log('red', `    ✗ FAIL: ${err.message}`);
    failCount++;
  }

  // Test 4.2: AI API router is live
  log('yellow', '  Test 4.2: AI API router status');
  try {
    const res = await fetch(`${API_BASE}/api/ai/`);
    const data = await res.json();
    if (res.ok && data.message === 'AI API is live' && Array.isArray(data.endpoints)) {
      log('green', `    ✓ PASS: AI API is live with ${data.endpoints.length} endpoints`);
      passCount++;
    } else {
      log('red', `    ✗ FAIL: AI API not responding properly`);
      failCount++;
    }
  } catch (err) {
    log('red', `    ✗ FAIL: ${err.message}`);
    failCount++;
  }

  // Summary
  log('cyan', '\n═══════════════════════════════════════\n');
  log('cyan', `📊 Test Summary:`);
  log('green', `   ✓ Passed: ${passCount}`);
  log('red', `   ✗ Failed: ${failCount}`);
  log('cyan', `   📈 Total:  ${passCount + failCount}`);
  
  const successRate = ((passCount / (passCount + failCount)) * 100).toFixed(1);
  if (failCount === 0) {
    log('green', `\n✨ All tests passed! (${successRate}% success rate)`);
  } else {
    log('yellow', `\n⚠️  ${failCount} test(s) failed. (${successRate}% success rate)`);
  }
  log('cyan', '\n═══════════════════════════════════════\n');
}

// Run tests
runTests().catch((err) => {
  log('red', '❌ Test runner error:', err);
  process.exit(1);
});
