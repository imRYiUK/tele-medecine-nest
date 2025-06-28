import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating super admin...');

  // Hash password
  const hashedPassword = await bcrypt.hash('Password123', 10);


  // Create super admin user
  const adminUser = await prisma.utilisateur.upsert({
    where: { email: 'admin@sunusante.sn' },
    update: {},
    create: {
      utilisateurID: 'admin-user-id',
      nom: 'Admin',
      prenom: 'Système',
      email: 'admin@sunusante.sn',
      username: 'admin',
      password: hashedPassword,
      telephone: '+221700000000',
      role: 'SUPER_ADMIN',
      estActif: true
    },
  });

  console.log('Super admin created successfully!');
  console.log('Email:', adminUser.email);
  console.log('Username:', adminUser.username);
  console.log('Password: Password123');
  console.log('Role:', adminUser.role);
}

main()
  .catch((e) => {
    console.error('Error creating super admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 