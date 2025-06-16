/*
  Warnings:

  - Added the required column `updatedAt` to the `etablissements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `etablissements` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `estActif` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `siteWeb` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- Update existing records to set updatedAt to current timestamp
UPDATE `etablissements` SET `updatedAt` = CURRENT_TIMESTAMP(3);

-- Remove the default value after updating existing records
ALTER TABLE `etablissements` ALTER COLUMN `updatedAt` DROP DEFAULT;
