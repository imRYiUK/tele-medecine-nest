/*
  Warnings:

  - Added the required column `createdAt` to the `consultations_medicales` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `consultations_medicales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `consultations_medicales` ADD COLUMN `createdAt` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `patients` MODIFY `email` VARCHAR(191) NULL;
