-- CreateTable
CREATE TABLE `VisitRequest` (
    `id` VARCHAR(191) NOT NULL,
    `parentName` VARCHAR(120) NOT NULL,
    `email` VARCHAR(180) NOT NULL,
    `phone` VARCHAR(40) NOT NULL,
    `studentName` VARCHAR(120) NULL,
    `grade` VARCHAR(60) NULL,
    `preferredDate` DATE NULL,
    `preferredTime` VARCHAR(40) NULL,
    `message` TEXT NULL,
    `status` ENUM('NEW', 'CONTACTED', 'SCHEDULED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'NEW',
    `source` VARCHAR(80) NULL,
    `ipHash` VARCHAR(64) NULL,
    `userAgent` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `VisitRequest_email_createdAt_idx`(`email`, `createdAt`),
    INDEX `VisitRequest_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `VisitRequest_preferredDate_idx`(`preferredDate`),
    INDEX `VisitRequest_ipHash_createdAt_idx`(`ipHash`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Story` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(180) NOT NULL,
    `slug` VARCHAR(180) NOT NULL,
    `excerpt` TEXT NOT NULL,
    `content` LONGTEXT NOT NULL,
    `image` VARCHAR(500) NOT NULL,
    `category` VARCHAR(60) NULL,
    `locale` VARCHAR(5) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `publishedAt` DATETIME(3) NULL,
    `isDemo` BOOLEAN NOT NULL DEFAULT false,
    `authorId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Story_locale_published_publishedAt_idx`(`locale`, `published`, `publishedAt`),
    INDEX `Story_category_idx`(`category`),
    INDEX `Story_authorId_idx`(`authorId`),
    UNIQUE INDEX `Story_slug_locale_key`(`slug`, `locale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Testimonial` (
    `id` VARCHAR(191) NOT NULL,
    `author` VARCHAR(120) NOT NULL,
    `content` TEXT NOT NULL,
    `locale` VARCHAR(5) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `isDemo` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Testimonial_locale_published_sortOrder_idx`(`locale`, `published`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GalleryImage` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(120) NOT NULL,
    `imageUrl` VARCHAR(500) NOT NULL,
    `category` VARCHAR(60) NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT true,
    `isDemo` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `GalleryImage_published_category_sortOrder_idx`(`published`, `category`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdminUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(120) NOT NULL,
    `email` VARCHAR(180) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `role` ENUM('ADMIN', 'EDITOR') NOT NULL DEFAULT 'EDITOR',
    `lastLoginAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `AdminUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Story` ADD CONSTRAINT `Story_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `AdminUser`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
