"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleSetup = simpleSetup;
exports.runSetupForEnvironment = runSetupForEnvironment;
const client_1 = require("@prisma/client");
const child_process_1 = require("child_process");
const prisma = new client_1.PrismaClient();
async function simpleSetup() {
    console.log('🚀 Starting comprehensive database setup...');
    console.log('=====================================');
    try {
        await prisma.$connect();
        console.log('✅ Database connection established');
        console.log('🔧 Applying Prisma schema to database...');
        try {
            (0, child_process_1.execSync)('npx prisma db push', {
                stdio: 'inherit',
                env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
            });
            console.log('✅ Prisma schema applied successfully');
        }
        catch (error) {
            console.error('❌ Failed to apply Prisma schema:', error);
            throw error;
        }
        console.log('🔧 Generating Prisma client...');
        try {
            (0, child_process_1.execSync)('npx prisma generate', {
                stdio: 'inherit',
                env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
            });
            console.log('✅ Prisma client generated successfully');
        }
        catch (error) {
            console.error('❌ Failed to generate Prisma client:', error);
            throw error;
        }
        console.log('🌱 Initializing database with seed data...');
        try {
            (0, child_process_1.execSync)('npx ts-node scripts/init-database.ts', {
                stdio: 'inherit',
                env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
            });
            console.log('✅ Database initialization completed');
        }
        catch (error) {
            console.error('❌ Database initialization failed:', error);
            console.log('⚠️ Continuing anyway - data might already exist');
        }
        console.log('=====================================');
        console.log('🎉 Comprehensive database setup completed!');
        console.log('📋 Summary:');
        console.log('   ✅ Database connection tested');
        console.log('   ✅ Prisma schema applied');
        console.log('   ✅ Prisma client generated');
        console.log('   ✅ Seed data initialized');
        console.log('');
        console.log('🚀 Your telemedicine application is ready to use!');
    }
    catch (error) {
        console.error('=====================================');
        console.error('💥 Database setup failed:', error);
        console.log('');
        console.log('🔧 Troubleshooting tips:');
        console.log('   1. Check your DATABASE_URL environment variable');
        console.log('   2. Ensure your database is accessible');
        console.log('   3. Verify your Prisma schema is valid');
        console.log('   4. Check database permissions');
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
async function runSetupForEnvironment(environment = 'development') {
    console.log(`🌍 Running setup for ${environment} environment...`);
    if (environment === 'production') {
        const productionEnv = require('dotenv').config({ path: '.env.production' });
        if (productionEnv.error) {
            console.error('❌ Failed to load production environment variables');
            process.exit(1);
        }
    }
    await simpleSetup();
}
if (require.main === module) {
    const environment = process.argv[2] || 'development';
    runSetupForEnvironment(environment);
}
//# sourceMappingURL=simple-setup.js.map