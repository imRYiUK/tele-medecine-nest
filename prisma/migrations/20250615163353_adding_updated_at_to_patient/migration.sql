/*
  Warnings:

  - Added the required column `createdBy` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patients` ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;
