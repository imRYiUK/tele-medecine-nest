-- CreateTable
CREATE TABLE `ImageCollaboration` (
    `id` VARCHAR(191) NOT NULL,
    `imageID` VARCHAR(191) NOT NULL,
    `inviterID` VARCHAR(191) NOT NULL,
    `inviteeID` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ImageCollaboration` ADD CONSTRAINT `ImageCollaboration_imageID_fkey` FOREIGN KEY (`imageID`) REFERENCES `images_medicales`(`imageID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageCollaboration` ADD CONSTRAINT `ImageCollaboration_inviterID_fkey` FOREIGN KEY (`inviterID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImageCollaboration` ADD CONSTRAINT `ImageCollaboration_inviteeID_fkey` FOREIGN KEY (`inviteeID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;
