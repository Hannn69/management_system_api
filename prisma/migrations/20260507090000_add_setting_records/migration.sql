CREATE TABLE `SettingRecord` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kind` ENUM('ASSET_MODEL', 'CATEGORY', 'MANUFACTURER', 'SUPPLIER', 'DEPARTMENT', 'LOCATION', 'COMPANY') NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SettingRecord_kind_slug_key`(`kind`, `slug`),
    UNIQUE INDEX `SettingRecord_kind_name_key`(`kind`, `name`),
    INDEX `SettingRecord_kind_isActive_idx`(`kind`, `isActive`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
