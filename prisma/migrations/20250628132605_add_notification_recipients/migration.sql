/*
  Warnings:

  - You are about to drop the column `estLu` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `utilisateurID` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `createdByID` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/

-- Step 1: Add the new createdByID column with a default value
ALTER TABLE `Notification` ADD COLUMN `createdByID` VARCHAR(191) NULL;

-- Step 2: Migrate existing data - set createdByID to utilisateurID for existing notifications
UPDATE `Notification` SET `createdByID` = `utilisateurID` WHERE `createdByID` IS NULL;

-- Step 3: Make createdByID NOT NULL
ALTER TABLE `Notification` MODIFY COLUMN `createdByID` VARCHAR(191) NOT NULL;

-- Step 4: Create the new NotificationRecipient table
CREATE TABLE `NotificationRecipient` (
    `id` VARCHAR(191) NOT NULL,
    `notificationID` VARCHAR(191) NOT NULL,
    `utilisateurID` VARCHAR(191) NOT NULL,
    `estLu` BOOLEAN NOT NULL DEFAULT false,
    `dateLecture` DATETIME(3) NULL,

    INDEX `NotificationRecipient_notificationID_idx`(`notificationID`),
    INDEX `NotificationRecipient_utilisateurID_idx`(`utilisateurID`),
    UNIQUE INDEX `NotificationRecipient_notificationID_utilisateurID_key`(`notificationID`, `utilisateurID`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Step 5: Migrate existing notification data to NotificationRecipient table
INSERT INTO `NotificationRecipient` (`id`, `notificationID`, `utilisateurID`, `estLu`, `dateLecture`)
SELECT 
    UUID() as `id`,
    `notificationID`,
    `utilisateurID`,
    `estLu`,
    CASE WHEN `estLu` = true THEN NOW() ELSE NULL END as `dateLecture`
FROM `Notification`;

-- Step 6: Drop the old foreign key and index
ALTER TABLE `Notification` DROP FOREIGN KEY `Notification_utilisateurID_fkey`;
DROP INDEX `Notification_utilisateurID_idx` ON `Notification`;

-- Step 7: Drop the old columns
ALTER TABLE `Notification` DROP COLUMN `estLu`,
    DROP COLUMN `utilisateurID`;

-- Step 8: Create new index and foreign key
CREATE INDEX `Notification_createdByID_idx` ON `Notification`(`createdByID`);

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_createdByID_fkey` FOREIGN KEY (`createdByID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationRecipient` ADD CONSTRAINT `NotificationRecipient_notificationID_fkey` FOREIGN KEY (`notificationID`) REFERENCES `Notification`(`notificationID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `NotificationRecipient` ADD CONSTRAINT `NotificationRecipient_utilisateurID_fkey` FOREIGN KEY (`utilisateurID`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE CASCADE ON UPDATE CASCADE;
