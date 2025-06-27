/*
  Warnings:

  - Added the required column `updatedAt` to the `ImageCollaboration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ImageCollaboration` ADD COLUMN `status` ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE INDEX `ImageCollaboration_status_fkey` ON `ImageCollaboration`(`status`);
