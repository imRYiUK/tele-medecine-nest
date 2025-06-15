/*
  Warnings:

  - Added the required column `createdBy` to the `dossiers_medicaux` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dossiers_medicaux` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `dossiers_medicaux` ADD CONSTRAINT `dossiers_medicaux_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;
