-- CreateTable
CREATE TABLE `patients` (
    `patientID` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `dateNaissance` DATETIME(3) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `assuranceMaladie` VARCHAR(191) NOT NULL,
    `groupeSanguin` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`patientID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dossiers_medicaux` (
    `dossierID` VARCHAR(191) NOT NULL,
    `patientID` VARCHAR(191) NOT NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `etatDossier` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`dossierID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultations_medicales` (
    `consultationID` VARCHAR(191) NOT NULL,
    `dossierID` VARCHAR(191) NOT NULL,
    `patientID` VARCHAR(191) NOT NULL,
    `medecinID` VARCHAR(191) NOT NULL,
    `dateConsultation` DATETIME(3) NOT NULL,
    `motif` VARCHAR(191) NOT NULL,
    `diagnostics` VARCHAR(191) NOT NULL,
    `observations` VARCHAR(191) NOT NULL,
    `traitementPrescrit` VARCHAR(191) NOT NULL,
    `estTelemedicine` BOOLEAN NOT NULL DEFAULT false,
    `lienVisio` VARCHAR(191) NULL,

    PRIMARY KEY (`consultationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `examens_medicaux` (
    `examenID` VARCHAR(191) NOT NULL,
    `dossierID` VARCHAR(191) NOT NULL,
    `patientID` VARCHAR(191) NOT NULL,
    `typeExamenID` VARCHAR(191) NOT NULL,
    `demandeParID` VARCHAR(191) NOT NULL,
    `dateExamen` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `resultat` VARCHAR(191) NULL,
    `estAnalyse` BOOLEAN NOT NULL DEFAULT false,
    `consultationID` VARCHAR(191) NULL,

    PRIMARY KEY (`examenID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `types_examens` (
    `typeExamenID` VARCHAR(191) NOT NULL,
    `nomType` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `categorie` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`typeExamenID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `images_medicales` (
    `imageID` VARCHAR(191) NOT NULL,
    `examenID` VARCHAR(191) NOT NULL,
    `studyInstanceUID` VARCHAR(191) NOT NULL,
    `seriesInstanceUID` VARCHAR(191) NOT NULL,
    `sopInstanceUID` VARCHAR(191) NOT NULL,
    `dateAcquisition` DATETIME(3) NOT NULL,
    `modalite` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`imageID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `utilisateurs` (
    `utilisateurID` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `prenom` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `etablissementID` VARCHAR(191) NULL,
    `estActif` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `utilisateurs_username_key`(`username`),
    UNIQUE INDEX `utilisateurs_email_key`(`email`),
    PRIMARY KEY (`utilisateurID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etablissements` (
    `etablissementID` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `adresse` VARCHAR(191) NOT NULL,
    `telephone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `region` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`etablissementID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescriptions` (
    `prescriptionID` VARCHAR(191) NOT NULL,
    `ordonnanceID` VARCHAR(191) NOT NULL,
    `medicamentID` VARCHAR(191) NOT NULL,
    `posologie` VARCHAR(191) NOT NULL,
    `duree` VARCHAR(191) NOT NULL,
    `instructions` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`prescriptionID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordonnances` (
    `ordonnanceID` VARCHAR(191) NOT NULL,
    `consultationID` VARCHAR(191) NOT NULL,
    `dateEmission` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dateExpiration` DATETIME(3) NOT NULL,
    `estRenouvelable` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`ordonnanceID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicaments` (
    `medicamentID` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `forme` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`medicamentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `journal_activites` (
    `journalID` VARCHAR(191) NOT NULL,
    `utilisateurID` VARCHAR(191) NOT NULL,
    `dateAction` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `typeAction` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `ipAdresse` VARCHAR(191) NULL,

    PRIMARY KEY (`journalID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `dossiers_medicaux` ADD CONSTRAINT `dossiers_medicaux_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patients`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultations_medicales` ADD CONSTRAINT `consultations_medicales_dossierID_fkey` FOREIGN KEY (`dossierID`) REFERENCES `dossiers_medicaux`(`dossierID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultations_medicales` ADD CONSTRAINT `consultations_medicales_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patients`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultations_medicales` ADD CONSTRAINT `consultations_medicales_medecinID_fkey` FOREIGN KEY (`medecinID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examens_medicaux` ADD CONSTRAINT `examens_medicaux_dossierID_fkey` FOREIGN KEY (`dossierID`) REFERENCES `dossiers_medicaux`(`dossierID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examens_medicaux` ADD CONSTRAINT `examens_medicaux_patientID_fkey` FOREIGN KEY (`patientID`) REFERENCES `patients`(`patientID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examens_medicaux` ADD CONSTRAINT `examens_medicaux_typeExamenID_fkey` FOREIGN KEY (`typeExamenID`) REFERENCES `types_examens`(`typeExamenID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examens_medicaux` ADD CONSTRAINT `examens_medicaux_demandeParID_fkey` FOREIGN KEY (`demandeParID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `examens_medicaux` ADD CONSTRAINT `examens_medicaux_consultationID_fkey` FOREIGN KEY (`consultationID`) REFERENCES `consultations_medicales`(`consultationID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images_medicales` ADD CONSTRAINT `images_medicales_examenID_fkey` FOREIGN KEY (`examenID`) REFERENCES `examens_medicaux`(`examenID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `utilisateurs` ADD CONSTRAINT `utilisateurs_etablissementID_fkey` FOREIGN KEY (`etablissementID`) REFERENCES `etablissements`(`etablissementID`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_ordonnanceID_fkey` FOREIGN KEY (`ordonnanceID`) REFERENCES `ordonnances`(`ordonnanceID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_medicamentID_fkey` FOREIGN KEY (`medicamentID`) REFERENCES `medicaments`(`medicamentID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordonnances` ADD CONSTRAINT `ordonnances_consultationID_fkey` FOREIGN KEY (`consultationID`) REFERENCES `consultations_medicales`(`consultationID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `journal_activites` ADD CONSTRAINT `journal_activites_utilisateurID_fkey` FOREIGN KEY (`utilisateurID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;
