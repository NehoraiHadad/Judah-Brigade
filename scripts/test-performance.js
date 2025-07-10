#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Performance Test Suite...\n');

const runCommand = (command, description) => {
  console.log(`📊 ${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    console.log(`✅ ${description} completed\n`);
    return output;
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    return null;
  }
};

// Performance test checklist
const tests = [
  {
    name: 'Bundle Analysis',
    command: 'npm run build:analyze',
    description: 'Analyzing bundle size and dependencies'
  },
  {
    name: 'Build Performance',
    command: 'time npm run build:prod',
    description: 'Measuring build time'
  },
  {
    name: 'TypeScript Check',
    command: 'npx tsc --noEmit',
    description: 'Checking TypeScript compilation'
  },
  {
    name: 'Lint Check',
    command: 'npm run lint',
    description: 'Running ESLint checks'
  }
];

console.log('Running performance tests...\n');

const results = tests.map(test => {
  const startTime = Date.now();
  const output = runCommand(test.command, test.description);
  const endTime = Date.now();
  
  return {
    ...test,
    duration: endTime - startTime,
    success: output !== null,
    output: output?.slice(0, 500) // Truncate long outputs
  };
});

// Generate report
console.log('📈 Performance Test Results:');
console.log('='.repeat(50));

results.forEach(result => {
  const status = result.success ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} ${result.name} (${result.duration}ms)`);
});

console.log('\n' + '='.repeat(50));

const passedTests = results.filter(r => r.success).length;
const totalTests = results.length;

console.log(`📊 Summary: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
  console.log('🎉 All performance tests passed!');
  
  // Check if bundle analysis was successful
  const bundleStatsPath = path.join(__dirname, '../.next/analyze/client.html');
  if (fs.existsSync(bundleStatsPath)) {
    console.log(`📊 Bundle analysis available at: ${bundleStatsPath}`);
  }
  
  console.log('\n💡 Performance Optimization Tips:');
  console.log('- Run `npm run dev:turbo` for faster development');
  console.log('- Use `npm run perf:lighthouse` to test live performance');
  console.log('- Press Ctrl+Shift+P in development to see performance metrics');
  console.log('- Monitor bundle sizes with `npm run test:bundle`');
  
} else {
  console.log('⚠️  Some tests failed. Check the output above for details.');
  process.exit(1);
}

console.log('\n🔧 For detailed performance monitoring, use:');
console.log('  npm run dev:turbo    # Development with Turbopack');
console.log('  npm run build:analyze # Analyze bundle size');
console.log('  npm run perf:lighthouse # Lighthouse performance audit'); 