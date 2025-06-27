import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const examTypes = [
  // Radiologie
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

  // Biologie
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

  // Cardiologie
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

  // Pneumologie
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

  // Gastro-entérologie
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

  // Gynécologie
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

  // Urologie
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

  // Dermatologie
  {
    nomType: 'Biopsie Cutanée',
    description: 'Prélèvement d\'un fragment de peau pour analyse',
    categorie: 'DERMATOLOGIE'
  },

  // Ophtalmologie
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

  // ORL
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

  // Neurologie
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

  // Autres
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

async function createExamTypes() {
  console.log('Création des types d\'examens...');
  
  for (const examType of examTypes) {
    try {
      // Check if exam type already exists
      const existing = await prisma.typeExamen.findFirst({
        where: {
          nomType: examType.nomType,
          categorie: examType.categorie
        }
      });

      if (existing) {
        // Update existing exam type
        const updated = await prisma.typeExamen.update({
          where: { typeExamenID: existing.typeExamenID },
          data: {
            description: examType.description
          }
        });
        console.log(`✓ Mis à jour: ${examType.nomType} (${examType.categorie})`);
      } else {
        // Create new exam type
        const created = await prisma.typeExamen.create({
          data: {
            nomType: examType.nomType,
            description: examType.description,
            categorie: examType.categorie
          }
        });
        console.log(`✓ Créé: ${examType.nomType} (${examType.categorie})`);
      }
    } catch (error) {
      console.error(`✗ Erreur lors de la création de ${examType.nomType}:`, error);
    }
  }
  
  console.log('\nTypes d\'examens créés avec succès!');
}

createExamTypes()
  .catch((e) => {
    console.error('Erreur lors de la création des types d\'examens:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 