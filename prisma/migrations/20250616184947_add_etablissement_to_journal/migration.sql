-- AlterTable
ALTER TABLE `journal_activites` ADD COLUMN `etablissementID` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `journal_activites` ADD CONSTRAINT `journal_activites_etablissementID_fkey` FOREIGN KEY (`etablissementID`) REFERENCES `etablissements`(`etablissementID`) ON DELETE SET NULL ON UPDATE CASCADE;
