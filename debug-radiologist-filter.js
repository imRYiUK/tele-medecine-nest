// Script de diagnostic pour le filtrage des radiologues
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function debugRadiologistFilter() {
  try {
    console.log('🔍 Diagnostic du filtrage par établissement pour les radiologues...\n');

    // 1. Récupérer tous les radiologues
    const radiologues = await prisma.utilisateur.findMany({
      where: { role: 'RADIOLOGUE' },
      select: {
        utilisateurID: true,
        nom: true,
        prenom: true,
        etablissementID: true,
        etablissement: {
          select: {
            nom: true
          }
        }
      }
    });

    console.log('📋 Radiologues trouvés:');
    radiologues.forEach(radiologue => {
      console.log(`  - ${radiologue.prenom} ${radiologue.nom} (${radiologue.etablissement?.nom || 'Aucun établissement'})`);
    });

    // 2. Récupérer tous les examens avec leurs relations
    const examens = await prisma.examenMedical.findMany({
      include: {
        patient: {
          select: { nom: true, prenom: true }
        },
        demandePar: {
          select: { 
            nom: true, 
            prenom: true, 
            etablissementID: true,
            etablissement: {
              select: { nom: true }
            }
          }
        },
        radiologues: {
          select: { 
            utilisateurID: true, 
            nom: true, 
            prenom: true,
            etablissementID: true,
            etablissement: {
              select: { nom: true }
            }
          }
        }
      }
    });

    console.log(`\n📊 Total des examens: ${examens.length}`);

    // 3. Analyser chaque radiologue
    for (const radiologue of radiologues) {
      console.log(`\n🔬 Analyse pour ${radiologue.prenom} ${radiologue.nom}:`);
      
      if (!radiologue.etablissementID) {
        console.log('  ❌ Pas d\'établissement assigné');
        continue;
      }

      console.log(`  🏥 Établissement: ${radiologue.etablissement.nom}`);

      // Examens où ce radiologue est assigné
      const examensAssignes = examens.filter(exam => 
        exam.radiologues.some(rad => rad.utilisateurID === radiologue.utilisateurID)
      );

      console.log(`  📋 Examens assignés: ${examensAssignes.length}`);

      // Examens de son établissement (où le médecin demandeur est du même établissement)
      const examensEtablissement = examens.filter(exam => 
        exam.demandePar.etablissementID === radiologue.etablissementID
      );

      console.log(`  🏥 Examens de son établissement: ${examensEtablissement.length}`);

      // Intersection des deux
      const examensFiltres = examens.filter(exam => 
        exam.radiologues.some(rad => rad.utilisateurID === radiologue.utilisateurID) &&
        exam.demandePar.etablissementID === radiologue.etablissementID
      );

      console.log(`  ✅ Examens après filtrage: ${examensFiltres.length}`);

      // Détails des examens assignés
      if (examensAssignes.length > 0) {
        console.log('  📋 Détails des examens assignés:');
        examensAssignes.forEach(exam => {
          const estMemeEtablissement = exam.demandePar.etablissementID === radiologue.etablissementID;
          console.log(`    - Patient: ${exam.patient.prenom} ${exam.patient.nom}`);
          console.log(`      Demandé par: ${exam.demandePar.prenom} ${exam.demandePar.nom} (${exam.demandePar.etablissement?.nom || 'Aucun établissement'})`);
          console.log(`      Même établissement: ${estMemeEtablissement ? '✅' : '❌'}`);
        });
      }

      // Détails des examens de son établissement
      if (examensEtablissement.length > 0) {
        console.log('  🏥 Détails des examens de son établissement:');
        examensEtablissement.forEach(exam => {
          const estAssigne = exam.radiologues.some(rad => rad.utilisateurID === radiologue.utilisateurID);
          console.log(`    - Patient: ${exam.patient.prenom} ${exam.patient.nom}`);
          console.log(`      Demandé par: ${exam.demandePar.prenom} ${exam.demandePar.nom}`);
          console.log(`      Assigné au radiologue: ${estAssigne ? '✅' : '❌'}`);
        });
      }
    }

    // 4. Statistiques globales
    console.log('\n📊 Statistiques globales:');
    
    const examensAvecDemandePar = examens.filter(exam => exam.demandePar.etablissementID);
    console.log(`  Examens avec demandePar.etablissementID: ${examensAvecDemandePar.length}`);
    
    const examensSansDemandePar = examens.filter(exam => !exam.demandePar.etablissementID);
    console.log(`  Examens SANS demandePar.etablissementID: ${examensSansDemandePar.length}`);

    if (examensSansDemandePar.length > 0) {
      console.log('  ⚠️  Examens sans établissement du demandeur:');
      examensSansDemandePar.forEach(exam => {
        console.log(`    - ${exam.patient.prenom} ${exam.patient.nom} (demandé par ${exam.demandePar.prenom} ${exam.demandePar.nom})`);
      });
    }

  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le diagnostic
debugRadiologistFilter(); 