"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin',
            description: 'Administrator with full access',
        },
    });
    const radiologistRole = await prisma.role.upsert({
        where: { name: 'radiologist' },
        update: {},
        create: {
            name: 'radiologist',
            description: 'Radiologist with access to medical imaging',
        },
    });
    const doctorRole = await prisma.role.upsert({
        where: { name: 'doctor' },
        update: {},
        create: {
            name: 'doctor',
            description: 'Doctor with access to patient records',
        },
    });
    const patientRole = await prisma.role.upsert({
        where: { name: 'patient' },
        update: {},
        create: {
            name: 'patient',
            description: 'Patient with limited access',
        },
    });
    const hashedPassword = await bcrypt.hash('Password123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {
            roles: {
                connect: [{ id: adminRole.id }],
            },
        },
        create: {
            email: 'admin@example.com',
            password: hashedPassword,
            roles: {
                connect: [{ id: adminRole.id }],
            },
        },
    });
    const radiologistUser = await prisma.user.upsert({
        where: { email: 'radiologist@example.com' },
        update: {
            roles: {
                connect: [{ id: radiologistRole.id }],
            },
        },
        create: {
            email: 'radiologist@example.com',
            password: hashedPassword,
            roles: {
                connect: [{ id: radiologistRole.id }],
            },
        },
    });
    const doctorUser = await prisma.user.upsert({
        where: { email: 'doctor@example.com' },
        update: {
            roles: {
                connect: [{ id: doctorRole.id }],
            },
        },
        create: {
            email: 'doctor@example.com',
            password: hashedPassword,
            roles: {
                connect: [{ id: doctorRole.id }],
            },
        },
    });
    console.log({ adminUser, radiologistUser, doctorUser });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map