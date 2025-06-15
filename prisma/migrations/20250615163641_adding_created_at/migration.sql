/*
  Warnings:

  - Added the required column `createdAt` to the `dossiers_medicaux` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dossiers_medicaux` ADD COLUMN `createdAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `patients` ADD COLUMN `createdAt` DATETIME(3) NOT NULL;
