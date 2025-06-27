-- AlterTable
ALTER TABLE `etablissements` ADD COLUMN `orthancLogin` VARCHAR(191) NULL,
    ADD COLUMN `orthancPassword` VARCHAR(191) NULL,
    ADD COLUMN `orthancUrl` VARCHAR(191) NULL;
