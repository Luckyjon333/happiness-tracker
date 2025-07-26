#!/usr/bin/env node

console.log('🧪 Testing client build for Vercel deployment...\n');

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';

try {
  // Change to client directory
  process.chdir('./client');
  
  console.log('1. Checking client dependencies...');
  if (!existsSync('package.json')) {
    throw new Error('❌ client/package.json not found');
  }
  console.log('✅ client/package.json found\n');
  
  console.log('2. Testing client build...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Client build completed\n');
  
  console.log('3. Verifying build output...');
  const requiredFiles = ['dist/index.html', 'dist/assets'];
  for (const file of requiredFiles) {
    if (!existsSync(file)) {
      throw new Error(`❌ Missing build file: ${file}`);
    }
  }
  console.log('✅ All required build files present\n');
  
  console.log('🎉 Client build test completed successfully!');
  console.log('📦 Ready for Vercel deployment with:');
  console.log('   - Root Directory: client');
  console.log('   - Build Command: npm run build');
  console.log('   - Output Directory: dist');
  
} catch (error) {
  console.error('❌ Build test failed:', error.message);
  process.exit(1);
}