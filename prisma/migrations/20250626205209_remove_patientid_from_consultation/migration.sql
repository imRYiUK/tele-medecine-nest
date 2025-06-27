/*
  Warnings:

  - You are about to drop the column `patientID` on the `consultations_medicales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `consultations_medicales` DROP FOREIGN KEY `consultations_medicales_patientID_fkey`;

-- DropIndex
DROP INDEX `consultations_medicales_patientID_fkey` ON `consultations_medicales`;

-- AlterTable
ALTER TABLE `consultations_medicales` DROP COLUMN `patientID`;
