/*
  Warnings:

  - You are about to drop the column `latitude` on the `etablissements` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `etablissements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `etablissements` DROP COLUMN `latitude`,
    DROP COLUMN `longitude`;
