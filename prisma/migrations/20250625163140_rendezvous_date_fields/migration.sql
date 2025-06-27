/*
  Warnings:

  - You are about to drop the column `dateHeure` on the `RendezVous` table. All the data in the column will be lost.
  - Added the required column `date` to the `RendezVous` table without a default value. This is not possible if the table is not empty.
  - Added the required column `debutTime` to the `RendezVous` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `RendezVous` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RendezVous` DROP COLUMN `dateHeure`,
    ADD COLUMN `date` VARCHAR(191) NOT NULL,
    ADD COLUMN `debutTime` VARCHAR(191) NOT NULL,
    ADD COLUMN `endTime` VARCHAR(191) NOT NULL;
