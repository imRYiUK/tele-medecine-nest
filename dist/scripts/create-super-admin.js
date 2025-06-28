"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Creating super admin...');
    const hashedPassword = await bcrypt.hash('Password123', 10);
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
    console.log('Establishment created:', etablissement.nom);
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
            role: 'ADMIN',
            etablissementID: etablissement.etablissementID,
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
//# sourceMappingURL=create-super-admin.js.map