/*
  Warnings:

  - A unique constraint covering the columns `[patientID]` on the table `dossiers_medicaux` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `dossiers_medicaux_patientID_key` ON `dossiers_medicaux`(`patientID`);
