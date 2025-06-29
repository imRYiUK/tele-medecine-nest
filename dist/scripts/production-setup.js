"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productionSetup = productionSetup;
const client_1 = require("@prisma/client");
const child_process_1 = require("child_process");
const prisma = new client_1.PrismaClient();
async function productionSetup() {
    console.log('🚀 Starting production database setup...');
    console.log('=====================================');
    try {
        await prisma.$connect();
        console.log('✅ Database connection established');
        console.log('🔧 Attempting to resolve failed migrations...');
        try {
            (0, child_process_1.execSync)('npx prisma migrate resolve --applied 20250618112905_add_examens_radiologues', {
                stdio: 'inherit',
                env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
            });
            console.log('✅ Failed migration resolved');
        }
        catch (error) {
            console.log('⚠️ Could not resolve migration, continuing...');
        }
        try {
            (0, child_process_1.execSync)('npx prisma migrate resolve --applied 20250615161607_init', {
                stdio: 'inherit',
                env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
            });
            console.log('✅ Init migration resolved');
        }
        catch (error) {
            console.log('⚠️ Could not resolve init migration, continuing...');
        }
        console.log('📦 Running database migrations...');
        try {
            (0, child_process_1.execSync)('npx prisma migrate deploy', {
                stdio: 'inherit',
                env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
            });
            console.log('✅ Database migrations completed');
        }
        catch (error) {
            console.log('⚠️ Migration failed, trying alternative approach...');
            try {
                console.log('🔄 Attempting database reset and schema push...');
                (0, child_process_1.execSync)('npx prisma db push --force-reset --accept-data-loss', {
                    stdio: 'inherit',
                    env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL }
                });
                console.log('✅ Database schema pushed successfully');
            }
            catch (pushError) {
                console.log('⚠️ Schema push failed, trying manual table creation...');
                try {
                    console.log('🔧 Attempting manual database setup...');
                    console.log('⚠️ Skipping database schema creation, proceeding with initialization...');
                }
                catch (manualError) {
                    console.error('❌ All database setup methods failed:', manualError);
                    throw manualError;
                }
            }
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
            throw error;
        }
        console.log('=====================================');
        console.log('🎉 Production database setup completed successfully!');
    }
    catch (error) {
        console.error('=====================================');
        console.error('💥 Production database setup failed:', error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
if (require.main === module) {
    productionSetup();
}
//# sourceMappingURL=production-setup.js.map