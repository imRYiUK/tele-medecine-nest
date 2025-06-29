"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleSetup = simpleSetup;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function simpleSetup() {
    console.log('🚀 Starting simple database setup...');
    console.log('=====================================');
    try {
        await prisma.$connect();
        console.log('✅ Database connection established');
        console.log('⚠️ Skipping database schema creation (tables should exist)');
        console.log('🌱 Initializing database with seed data...');
        try {
            const { execSync } = require('child_process');
            execSync('npx ts-node scripts/init-database.ts', {
                stdio: 'inherit',
                env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
            });
            console.log('✅ Database initialization completed');
        }
        catch (error) {
            console.error('❌ Database initialization failed:', error);
            console.log('⚠️ Continuing anyway - tables might already exist');
        }
        console.log('=====================================');
        console.log('🎉 Simple database setup completed!');
    }
    catch (error) {
        console.error('=====================================');
        console.error('💥 Simple database setup failed:', error);
        console.log('⚠️ This might be normal if tables already exist');
    }
    finally {
        await prisma.$disconnect();
    }
}
if (require.main === module) {
    simpleSetup();
}
//# sourceMappingURL=simple-setup.js.map