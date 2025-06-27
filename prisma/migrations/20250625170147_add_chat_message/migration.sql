-- CreateTable
CREATE TABLE `ChatMessage` (
    `messageID` VARCHAR(191) NOT NULL,
    `imageID` VARCHAR(191) NOT NULL,
    `senderID` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`messageID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_imageID_fkey` FOREIGN KEY (`imageID`) REFERENCES `images_medicales`(`imageID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ChatMessage` ADD CONSTRAINT `ChatMessage_senderID_fkey` FOREIGN KEY (`senderID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;
