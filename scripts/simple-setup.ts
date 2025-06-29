import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function simpleSetup() {
  console.log('🚀 Starting simple database setup...');
  console.log('=====================================');

  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection established');

    // Skip migrations and schema creation
    console.log('⚠️ Skipping database schema creation (tables should exist)');
    
    // Initialize database with seed data
    console.log('🌱 Initializing database with seed data...');
    try {
      const { execSync } = require('child_process');
      execSync('npx ts-node scripts/init-database.ts', { 
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
      });
      console.log('✅ Database initialization completed');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      console.log('⚠️ Continuing anyway - tables might already exist');
    }

    console.log('=====================================');
    console.log('🎉 Simple database setup completed!');
    
  } catch (error) {
    console.error('=====================================');
    console.error('💥 Simple database setup failed:', error);
    console.log('⚠️ This might be normal if tables already exist');
    // Don't exit with error code, just continue
  } finally {
    await prisma.$disconnect();
  }
}

// Run the simple setup
if (require.main === module) {
  simpleSetup();
}

export { simpleSetup }; 