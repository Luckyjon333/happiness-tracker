#!/usr/bin/env node

/**
 * Simple build test script to verify deployment readiness
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🧪 Testing build process...\n');

try {
  // Test TypeScript compilation
  console.log('1. Checking TypeScript compilation...');
  execSync('npm run check', { stdio: 'inherit' });
  console.log('✅ TypeScript check passed\n');

  // Test build process
  console.log('2. Testing build process...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed\n');

  // Check if built files exist
  console.log('3. Verifying built files...');
  const requiredFiles = [
    'dist/index.js',        // Server bundle
    'dist/public/index.html', // Frontend entry
    'dist/public/assets'      // Frontend assets
  ];

  const missingFiles = requiredFiles.filter(file => !existsSync(file));
  
  if (missingFiles.length > 0) {
    console.log('❌ Missing built files:', missingFiles);
    process.exit(1);
  }
  
  console.log('✅ All required files present\n');

  console.log('🎉 Build test completed successfully!');
  console.log('📦 Ready for deployment to Vercel');
  
} catch (error) {
  console.error('❌ Build test failed:');
  console.error(error.message);
  process.exit(1);
}