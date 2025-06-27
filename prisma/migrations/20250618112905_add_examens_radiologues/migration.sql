-- CreateTable
CREATE TABLE `_ExamensRadiologues` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ExamensRadiologues_AB_unique`(`A`, `B`),
    INDEX `_ExamensRadiologues_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ExamensRadiologues` ADD CONSTRAINT `_ExamensRadiologues_A_fkey` FOREIGN KEY (`A`) REFERENCES `examens_medicaux`(`examenID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ExamensRadiologues` ADD CONSTRAINT `_ExamensRadiologues_B_fkey` FOREIGN KEY (`B`) REFERENCES `utilisateurs`(`utilisateurID`) ON DELETE CASCADE ON UPDATE CASCADE;
