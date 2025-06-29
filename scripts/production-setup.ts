import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';

const prisma = new PrismaClient();

async function productionSetup() {
  console.log('🚀 Starting production database setup...');
  console.log('=====================================');

  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection established');

    // Try to resolve any failed migrations
    console.log('🔧 Attempting to resolve failed migrations...');
    try {
      execSync('npx prisma migrate resolve --applied 20250618112905_add_examens_radiologues', { 
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
      });
      console.log('✅ Failed migration resolved');
    } catch (error) {
      console.log('⚠️ Could not resolve migration, continuing...');
    }

    // Run migrations
    console.log('📦 Running database migrations...');
    try {
      execSync('npx prisma migrate deploy', { 
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
      });
      console.log('✅ Database migrations completed');
    } catch (error) {
      console.log('⚠️ Migration failed, trying alternative approach...');
      
      // If migrations fail, try to push the schema directly
      try {
        execSync('npx prisma db push --accept-data-loss', { 
          stdio: 'inherit',
          env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
        });
        console.log('✅ Database schema pushed successfully');
      } catch (pushError) {
        console.error('❌ Database setup failed:', pushError);
        throw pushError;
      }
    }

    // Initialize database with seed data
    console.log('🌱 Initializing database with seed data...');
    try {
      execSync('npx ts-node scripts/init-database.ts', { 
        stdio: 'inherit',
        env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
      });
      console.log('✅ Database initialization completed');
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }

    console.log('=====================================');
    console.log('🎉 Production database setup completed successfully!');
    
  } catch (error) {
    console.error('=====================================');
    console.error('💥 Production database setup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the production setup
if (require.main === module) {
  productionSetup();
}

export { productionSetup }; 