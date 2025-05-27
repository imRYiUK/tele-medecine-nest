import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create roles
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

  // Hash password
  const hashedPassword = await bcrypt.hash('Password123', 10);

  // Create users
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {
      roleId: adminRole.id,
    },
    create: {
      nom: 'Admin',
      prenom: 'User',
      email: 'admin@example.com',
      password: hashedPassword,
      roleId: adminRole.id,
    },
  });

  const radiologistUser = await prisma.user.upsert({
    where: { email: 'radiologist@example.com' },
    update: {
      roleId: radiologistRole.id,
    },
    create: {
      nom: 'Radiologue',
      prenom: 'User',
      email: 'radiologist@example.com',
      password: hashedPassword,
      roleId: radiologistRole.id,
    },
  });

  const doctorUser = await prisma.user.upsert({
    where: { email: 'doctor@example.com' },
    update: {
      roleId: doctorRole.id,
    },
    create: {
      nom: 'Médecin',
      prenom: 'User',
      email: 'doctor@example.com',
      password: hashedPassword,
      roleId: doctorRole.id,
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
