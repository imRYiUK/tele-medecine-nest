import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash password
  const hashedPassword = await bcrypt.hash('Password123', 10);

  // Create establishment
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

  // Create users with different roles
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

  const medecinUser = await prisma.utilisateur.upsert({
    where: { email: 'medecin@sunusante.sn' },
    update: {},
    create: {
      utilisateurID: 'medecin-user-id',
      nom: 'Sow',
      prenom: 'Amadou',
      email: 'medecin@sunusante.sn',
      username: 'asow',
      password: hashedPassword,
      telephone: '+221788888888',
      role: 'MEDECIN',
      etablissementID: etablissement.etablissementID,
      estActif: true
    },
  });

  // Create a test patient
  const patient = await prisma.patient.upsert({
    where: { patientID: 'patient@example.com' },
    update: {},
    create: {
      patientID: 'test-patient-id',
      nom: 'Diallo',
      prenom: 'Mamadou',
      dateNaissance: new Date('1990-01-01'),
      genre: 'M',
      adresse: '123 Rue Test, Dakar',
      telephone: '+221711111111',
      email: 'patient@example.com',
      assuranceMaladie: 'ASN123456',
      groupeSanguin: 'O+',
      createdBy: adminUser.utilisateurID,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  // Create a medical record for the patient
  const dossierMedical = await prisma.dossierMedical.upsert({
    where: { dossierID: 'test-dossier-id' },
    update: {},
    create: {
      dossierID: 'test-dossier-id',
      patientID: patient.patientID,
      dateCreation: new Date(),
      etatDossier: 'ACTIF',
      createdBy: adminUser.utilisateurID,
      createdAt: new Date()
    },
  });

  // Create a type of examination
  const typeExamen = await prisma.typeExamen.upsert({
    where: { typeExamenID: 'test-type-examen-id' },
    update: {},
    create: {
      typeExamenID: 'test-type-examen-id',
      nomType: 'Radiographie Thoracique',
      description: 'Examen radiographique du thorax',
      categorie: 'RADIOLOGIE'
    },
  });

  // Create a medical consultation
  const consultation = await prisma.consultationMedicale.upsert({
    where: { consultationID: 'test-consultation-id' },
    update: {},
    create: {
      consultationID: 'test-consultation-id',
      dossierID: dossierMedical.dossierID,
      patientID: patient.patientID,
      medecinID: medecinUser.utilisateurID,
      dateConsultation: new Date(),
      motif: 'Douleur thoracique',
      diagnostics: 'Suspicion de pneumonie',
      observations: 'Patient présente une toux sèche',
      traitementPrescrit: 'Antibiotiques et repos',
      estTelemedicine: false,
      lienVisio: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  });

  // Create a medical examination
  const examenMedical = await prisma.examenMedical.upsert({
    where: { examenID: 'test-examen-id' },
    update: {},
    create: {
      examenID: 'test-examen-id',
      dossierID: dossierMedical.dossierID,
      patientID: patient.patientID,
      typeExamenID: typeExamen.typeExamenID,
      demandeParID: medecinUser.utilisateurID,
      dateExamen: new Date(),
      description: 'Radiographie thoracique standard',
      resultat: null,
      estAnalyse: false,
      consultationID: consultation.consultationID
    },
  });

  // Create a medication
  const medicament = await prisma.medicament.upsert({
    where: { medicamentID: 'test-medicament-id' },
    update: {},
    create: {
      medicamentID: 'test-medicament-id',
      nom: 'Amoxicilline',
      dosage: '500mg',
      forme: 'Comprimé',
      description: 'Antibiotique à large spectre'
    },
  });

  // Create a prescription
  const ordonnance = await prisma.ordonnance.upsert({
    where: { ordonnanceID: 'test-ordonnance-id' },
    update: {},
    create: {
      ordonnanceID: 'test-ordonnance-id',
      consultationID: consultation.consultationID,
      dateEmission: new Date(),
      dateExpiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      estRenouvelable: false
    },
  });

  // Create a prescription detail
  const prescription = await prisma.prescription.upsert({
    where: { prescriptionID: 'test-prescription-id' },
    update: {},
    create: {
      prescriptionID: 'test-prescription-id',
      ordonnanceID: ordonnance.ordonnanceID,
      medicamentID: medicament.medicamentID,
      posologie: '1 comprimé 3 fois par jour',
      duree: '7 jours',
      instructions: 'À prendre après les repas'
    },
  });

  // Create an activity log
  const journalActivite = await prisma.journalActivite.upsert({
    where: { journalID: 'test-journal-id' },
    update: {},
    create: {
      journalID: 'test-journal-id',
      utilisateurID: medecinUser.utilisateurID,
      dateAction: new Date(),
      typeAction: 'CONSULTATION',
      description: 'Création d\'une nouvelle consultation',
      ipAdresse: '127.0.0.1'
    },
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
