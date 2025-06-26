/*
  Warnings:

  - You are about to drop the column `description` on the `medicaments` table. All the data in the column will be lost.
  - You are about to drop the column `dosage` on the `medicaments` table. All the data in the column will be lost.
  - You are about to drop the column `forme` on the `medicaments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `medicaments` DROP COLUMN `description`,
    DROP COLUMN `dosage`,
    DROP COLUMN `forme`;
