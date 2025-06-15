import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const hashedPassword = await bcrypt.hash('Password123', 10);

  // Créer un établissement pour les utilisateurs
  const etablissement = await prisma.etablissement.upsert({
    where: { etablissementID: 'test-etablissement-id' },
    update: {},
    create: {
      etablissementID: 'test-etablissement-id',
      nom: 'Hôpital Sunu Santé',
      adresse: 'Avenue Cheikh Anta Diop, Dakar',
      telephone: '+221338675309',
      email: 'contact@sunusante.sn',
      type: 'HOPITAL',
      region: 'Dakar'
    },
  });

  // Créer des utilisateurs de test avec différents rôles
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@sunusante.sn' },
    update: {},
    create: {
      userId: 'admin-user-id',
      nom: 'Admin',
      prenom: 'Système',
      email: 'admin@sunusante.sn',
      username: 'admin',
      password: hashedPassword,
      telephone: '+221700000000',
      etablissementID: etablissement.etablissementID,
      roleId: 1, // ADMIN
    },
  });

  const radiologueUser = await prisma.user.upsert({
    where: { email: 'radiologue@sunusante.sn' },
    update: {},
    create: {
      userId: 'radiologue-user-id',
      nom: 'Diop',
      prenom: 'Fatou',
      email: 'radiologue@sunusante.sn',
      username: 'fdiop',
      password: hashedPassword,
      telephone: '+221777777777',
      etablissementID: etablissement.etablissementID,
      roleId: 3, // RADIOLOGUE
    },
  });

  const medecinUser = await prisma.user.upsert({
    where: { email: 'medecin@sunusante.sn' },
    update: {},
    create: {
      userId: 'medecin-user-id',
      nom: 'Sow',
      prenom: 'Amadou',
      email: 'medecin@sunusante.sn',
      username: 'asow',
      password: hashedPassword,
      telephone: '+221788888888',
      etablissementID: etablissement.etablissementID,
      roleId: 2, // MEDECIN
    },
  });
  
  const technicienUser = await prisma.user.upsert({
    where: { email: 'technicien@sunusante.sn' },
    update: {},
    create: {
      userId: 'technicien-user-id',
      nom: 'Ndiaye',
      prenom: 'Moussa',
      email: 'technicien@sunusante.sn',
      username: 'mndiaye',
      password: hashedPassword,
      telephone: '+221799999999',
      etablissementID: etablissement.etablissementID,
      roleId: 5, // TECHNICIEN
    },
  });

  console.log('Utilisateurs créés avec succès:');
  console.log({ adminUser, radiologueUser, medecinUser, technicienUser });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
