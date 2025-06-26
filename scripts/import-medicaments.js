const fs = require('fs');
const readline = require('readline');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function importMedicaments() {
  console.log('Starting medication import...');
  
  const fileStream = fs.createReadStream('CIS_bdpm.txt');
  const rl = readline.createInterface({ 
    input: fileStream, 
    crlfDelay: Infinity 
  });

  let lineCount = 0;
  let importedCount = 0;
  let skippedCount = 0;

  for await (const line of rl) {
    lineCount++;
    
    // Skip empty lines
    if (!line.trim()) {
      skippedCount++;
      continue;
    }

    // Split by tab character
    const columns = line.split('\t');
    
    // The medication name is typically in the second column (index 1)
    // CIS code is in the first column (index 0)
    if (columns.length >= 2) {
      const cisCode = columns[0].trim();
      const medicationName = columns[1].trim();
      
      // Skip if no name or CIS code
      if (!medicationName || !cisCode) {
        skippedCount++;
        continue;
      }

      try {
        // Use upsert to avoid duplicates
        await prisma.medicament.upsert({
          where: { medicamentID: cisCode },
          update: {
            nom: medicationName
          },
          create: {
            medicamentID: cisCode,
            nom: medicationName
          }
        });
        
        importedCount++;
        
        // Log progress every 1000 records
        if (importedCount % 1000 === 0) {
          console.log(`Imported ${importedCount} medications...`);
        }
        
      } catch (error) {
        console.error(`Error importing medication ${cisCode}:`, error.message);
        skippedCount++;
      }
    } else {
      skippedCount++;
    }
  }

  console.log('\nImport completed!');
  console.log(`Total lines processed: ${lineCount}`);
  console.log(`Medications imported: ${importedCount}`);
  console.log(`Lines skipped: ${skippedCount}`);
  
  await prisma.$disconnect();
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  process.exit(1);
});

// Run the import
importMedicaments().catch((error) => {
  console.error('Import failed:', error);
  process.exit(1);
}); 