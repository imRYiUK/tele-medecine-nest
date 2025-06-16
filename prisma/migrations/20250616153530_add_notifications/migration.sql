-- CreateTable
CREATE TABLE `Notification` (
    `notificationID` VARCHAR(191) NOT NULL,
    `utilisateurID` VARCHAR(191) NOT NULL,
    `titre` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NULL,
    `lien` VARCHAR(191) NULL,
    `dateCreation` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estLu` BOOLEAN NOT NULL DEFAULT false,

    INDEX `Notification_utilisateurID_idx`(`utilisateurID`),
    PRIMARY KEY (`notificationID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_utilisateurID_fkey` FOREIGN KEY (`utilisateurID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;
