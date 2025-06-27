-- CreateTable
CREATE TABLE `RendezVous` (
    `rendezVousID` VARCHAR(191) NOT NULL,
    `dateHeure` DATETIME(3) NOT NULL,
    `motif` VARCHAR(191) NULL,
    `patientID` VARCHAR(191) NOT NULL,
    `medecinID` VARCHAR(191) NOT NULL,
    `createdByID` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`rendezVousID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HoraireMedecin` (
    `horaireID` VARCHAR(191) NOT NULL,
    `medecinID` VARCHAR(191) NOT NULL,
    `jourSemaine` INTEGER NOT NULL,
    `heureDebut` VARCHAR(191) NOT NULL,
    `heureFin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`horaireID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RendezVous` ADD CONSTRAINT `RendezVous_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patients`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RendezVous` ADD CONSTRAINT `RendezVous_medecinID_fkey` FOREIGN KEY (`medecinID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RendezVous` ADD CONSTRAINT `RendezVous_createdByID_fkey` FOREIGN KEY (`createdByID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HoraireMedecin` ADD CONSTRAINT `HoraireMedecin_medecinID_fkey` FOREIGN KEY (`medecinID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;
