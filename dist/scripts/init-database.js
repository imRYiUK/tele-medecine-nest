"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDatabase = initializeDatabase;
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const prisma = new client_1.PrismaClient();
const SUPER_ADMIN_CONFIG = {
    email: 'admin@sunusante.sn',
    username: 'admin',
    password: 'Password123',
    nom: 'Admin',
    prenom: 'Système',
    telephone: '+221700000000',
    role: 'SUPER_ADMIN'
};
const EXAM_TYPES = [
    {
        nomType: 'Radiographie Thoracique',
        description: 'Examen radiographique du thorax pour évaluer les poumons et le cœur',
        categorie: 'RADIOLOGIE'
    },
    {
        nomType: 'Radiographie Abdominale',
        description: 'Examen radiographique de l\'abdomen pour évaluer les organes digestifs',
        categorie: 'RADIOLOGIE'
    },
    {
        nomType: 'Scanner Cérébral',
        description: 'Tomodensitométrie du cerveau pour évaluer les structures cérébrales',
        categorie: 'RADIOLOGIE'
    },
    {
        nomType: 'IRM Cérébrale',
        description: 'Imagerie par résonance magnétique du cerveau',
        categorie: 'RADIOLOGIE'
    },
    {
        nomType: 'Échographie Abdominale',
        description: 'Échographie des organes abdominaux',
        categorie: 'RADIOLOGIE'
    },
    {
        nomType: 'Mammographie',
        description: 'Examen radiographique des seins pour le dépistage du cancer',
        categorie: 'RADIOLOGIE'
    },
    {
        nomType: 'Numération Formule Sanguine',
        description: 'Analyse complète des cellules sanguines',
        categorie: 'BIOLOGIE'
    },
    {
        nomType: 'Glycémie à Jeun',
        description: 'Mesure du taux de glucose dans le sang à jeun',
        categorie: 'BIOLOGIE'
    },
    {
        nomType: 'Cholestérol Total',
        description: 'Dosage du cholestérol total dans le sang',
        categorie: 'BIOLOGIE'
    },
    {
        nomType: 'Créatinine',
        description: 'Dosage de la créatinine pour évaluer la fonction rénale',
        categorie: 'BIOLOGIE'
    },
    {
        nomType: 'Groupe Sanguin',
        description: 'Détermination du groupe sanguin et du facteur Rhésus',
        categorie: 'BIOLOGIE'
    },
    {
        nomType: 'Électrocardiogramme (ECG)',
        description: 'Enregistrement de l\'activité électrique du cœur',
        categorie: 'CARDIOLOGIE'
    },
    {
        nomType: 'Échocardiographie',
        description: 'Échographie du cœur pour évaluer sa structure et sa fonction',
        categorie: 'CARDIOLOGIE'
    },
    {
        nomType: 'Test d\'Effort',
        description: 'Électrocardiogramme d\'effort pour évaluer la fonction cardiaque',
        categorie: 'CARDIOLOGIE'
    },
    {
        nomType: 'Spirométrie',
        description: 'Mesure des volumes et débits pulmonaires',
        categorie: 'PNEUMOLOGIE'
    },
    {
        nomType: 'Gaz du Sang',
        description: 'Analyse des gaz dissous dans le sang artériel',
        categorie: 'PNEUMOLOGIE'
    },
    {
        nomType: 'Fibroscopie Œsogastroduodénale',
        description: 'Endoscopie de l\'œsophage, de l\'estomac et du duodénum',
        categorie: 'GASTRO_ENTEROLOGIE'
    },
    {
        nomType: 'Coloscopie',
        description: 'Endoscopie du côlon et du rectum',
        categorie: 'GASTRO_ENTEROLOGIE'
    },
    {
        nomType: 'Échographie Gynécologique',
        description: 'Échographie des organes génitaux féminins',
        categorie: 'GYNECOLOGIE'
    },
    {
        nomType: 'Frottis Cervico-vaginal',
        description: 'Prélèvement pour dépistage du cancer du col de l\'utérus',
        categorie: 'GYNECOLOGIE'
    },
    {
        nomType: 'Échographie Prostatique',
        description: 'Échographie de la prostate',
        categorie: 'UROLOGIE'
    },
    {
        nomType: 'Échographie Rénale',
        description: 'Échographie des reins et des voies urinaires',
        categorie: 'UROLOGIE'
    },
    {
        nomType: 'Biopsie Cutanée',
        description: 'Prélèvement d\'un fragment de peau pour analyse',
        categorie: 'DERMATOLOGIE'
    },
    {
        nomType: 'Fond d\'Œil',
        description: 'Examen du fond de l\'œil',
        categorie: 'OPHTALMOLOGIE'
    },
    {
        nomType: 'Champ Visuel',
        description: 'Mesure du champ visuel',
        categorie: 'OPHTALMOLOGIE'
    },
    {
        nomType: 'Fibroscopie Laryngée',
        description: 'Endoscopie du larynx',
        categorie: 'ORL'
    },
    {
        nomType: 'Audiométrie',
        description: 'Test d\'audition',
        categorie: 'ORL'
    },
    {
        nomType: 'Électroencéphalogramme (EEG)',
        description: 'Enregistrement de l\'activité électrique cérébrale',
        categorie: 'NEUROLOGIE'
    },
    {
        nomType: 'Électromyogramme (EMG)',
        description: 'Étude de l\'activité électrique des muscles',
        categorie: 'NEUROLOGIE'
    },
    {
        nomType: 'Dentascanner',
        description: 'Scanner dentaire pour évaluer les structures dentaires',
        categorie: 'AUTRES'
    },
    {
        nomType: 'Échographie Doppler',
        description: 'Échographie avec étude du flux sanguin',
        categorie: 'AUTRES'
    }
];
async function createSuperAdmin() {
    console.log('🔧 Creating super admin...');
    try {
        const hashedPassword = await bcrypt.hash(SUPER_ADMIN_CONFIG.password, 10);
        const adminUser = await prisma.utilisateur.upsert({
            where: { email: SUPER_ADMIN_CONFIG.email },
            update: {},
            create: {
                utilisateurID: 'admin-user-id',
                nom: SUPER_ADMIN_CONFIG.nom,
                prenom: SUPER_ADMIN_CONFIG.prenom,
                email: SUPER_ADMIN_CONFIG.email,
                username: SUPER_ADMIN_CONFIG.username,
                password: hashedPassword,
                telephone: SUPER_ADMIN_CONFIG.telephone,
                role: SUPER_ADMIN_CONFIG.role,
                estActif: true
            },
        });
        console.log('✅ Super admin created successfully!');
        console.log('📧 Email:', adminUser.email);
        console.log('👤 Username:', adminUser.username);
        console.log('🔑 Password:', SUPER_ADMIN_CONFIG.password);
        console.log('👑 Role:', adminUser.role);
        return adminUser;
    }
    catch (error) {
        console.error('❌ Error creating super admin:', error);
        throw error;
    }
}
async function createExamTypes() {
    console.log('🔧 Creating exam types...');
    try {
        let createdCount = 0;
        let updatedCount = 0;
        for (const examType of EXAM_TYPES) {
            const existing = await prisma.typeExamen.findFirst({
                where: {
                    nomType: examType.nomType,
                    categorie: examType.categorie
                }
            });
            if (existing) {
                await prisma.typeExamen.update({
                    where: { typeExamenID: existing.typeExamenID },
                    data: {
                        description: examType.description
                    }
                });
                updatedCount++;
            }
            else {
                await prisma.typeExamen.create({
                    data: examType
                });
                createdCount++;
            }
        }
        console.log(`✅ Exam types processed successfully!`);
        console.log(`📊 Created: ${createdCount}, Updated: ${updatedCount}`);
    }
    catch (error) {
        console.error('❌ Error creating exam types:', error);
        throw error;
    }
}
async function importMedications() {
    console.log('🔧 Importing medications from CIS_bdpm.txt...');
    try {
        const filePath = path.join(__dirname, '..', 'CIS_bdpm.txt');
        if (!fs.existsSync(filePath)) {
            console.log('⚠️  CIS_bdpm.txt not found, skipping medication import');
            return;
        }
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const lines = fileContent.split('\n').filter(line => line.trim());
        console.log(`📄 Found ${lines.length} lines in CIS_bdpm.txt`);
        let importedCount = 0;
        let skippedCount = 0;
        const linesToProcess = lines.slice(0, 1000);
        for (const line of linesToProcess) {
            try {
                const parts = line.split('\t');
                if (parts.length >= 2) {
                    const code = parts[0]?.trim();
                    const name = parts[1]?.trim();
                    if (code && name && name.length > 0) {
                        const existing = await prisma.medicament.findFirst({
                            where: { nom: name }
                        });
                        if (!existing) {
                            await prisma.medicament.create({
                                data: {
                                    medicamentID: `med-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                                    nom: name
                                }
                            });
                            importedCount++;
                        }
                        else {
                            skippedCount++;
                        }
                    }
                }
            }
            catch (lineError) {
                console.warn(`⚠️  Error processing line: ${line.substring(0, 50)}...`);
                skippedCount++;
            }
        }
        console.log(`✅ Medication import completed!`);
        console.log(`📊 Imported: ${importedCount}, Skipped: ${skippedCount}`);
    }
    catch (error) {
        console.error('❌ Error importing medications:', error);
        console.log('⚠️  Continuing with other initialization tasks...');
    }
}
async function initializeDatabase() {
    console.log('🚀 Starting database initialization...');
    console.log('=====================================');
    try {
        await prisma.$connect();
        console.log('✅ Database connection established');
        await createSuperAdmin();
        await createExamTypes();
        await importMedications();
        console.log('=====================================');
        console.log('🎉 Database initialization completed successfully!');
    }
    catch (error) {
        console.error('=====================================');
        console.error('💥 Database initialization failed:', error);
        process.exit(1);
    }
    finally {
        await prisma.$disconnect();
    }
}
if (require.main === module) {
    initializeDatabase();
}
//# sourceMappingURL=init-database.js.map