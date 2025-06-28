# Scripts Directory

This directory contains utility scripts for the tele-medicine application.

## Available Scripts

### create-super-admin.ts
Creates a super admin user and establishment for the application.

**Usage:**
```bash
npm run create-super-admin
```

**What it creates:**
- Establishment: "Hôpital Sunu Santé" in Dakar
- Super Admin User:
  - Email: admin@sunusante.sn
  - Username: admin
  - Password: Password123
  - Role: ADMIN

### create-exam-types.ts
Creates predefined examination types in the database.

**Usage:**
```bash
npx ts-node scripts/create-exam-types.ts
```

### import-medicaments.js
Imports medication data from the CIS_bdpm.txt file into the database.

**Usage:**
```bash
node scripts/import-medicaments.js
```

## Notes

- The `create-super-admin` script uses upsert operations, so it's safe to run multiple times
- All scripts require a valid database connection and Prisma client
- Make sure to run `npm run prisma:generate` before running any TypeScript scripts 