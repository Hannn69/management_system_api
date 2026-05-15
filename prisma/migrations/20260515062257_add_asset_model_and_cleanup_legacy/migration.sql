/*
  Warnings:

  - You are about to drop the `settingrecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `settingrecord`;

-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `assetTag` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `serial` VARCHAR(191) NULL,
    `modelId` INTEGER NOT NULL,
    `statusId` INTEGER NOT NULL,
    `companyId` INTEGER NULL,
    `locationId` INTEGER NULL,
    `supplierId` INTEGER NULL,
    `checkedOutUserId` INTEGER NULL,
    `notes` TEXT NULL,
    `image` VARCHAR(191) NULL,
    `isRequestable` BOOLEAN NOT NULL DEFAULT false,
    `isByod` BOOLEAN NOT NULL DEFAULT false,
    `warrantyMonths` INTEGER NULL,
    `expectedCheckin` DATETIME(3) NULL,
    `nextAuditDate` DATETIME(3) NULL,
    `orderNumber` VARCHAR(191) NULL,
    `purchaseDate` DATETIME(3) NULL,
    `purchaseCost` DECIMAL(10, 2) NULL,
    `eolDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Asset_slug_key`(`slug`),
    UNIQUE INDEX `Asset_assetTag_key`(`assetTag`),
    INDEX `Asset_assetTag_idx`(`assetTag`),
    INDEX `Asset_serial_idx`(`serial`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `AssetModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_statusId_fkey` FOREIGN KEY (`statusId`) REFERENCES `StatusLabel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_checkedOutUserId_fkey` FOREIGN KEY (`checkedOutUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
