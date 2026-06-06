-- CreateTable
CREATE TABLE `Announcements` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `type` ENUM('Button', 'Link') NOT NULL DEFAULT 'Button',
    `createdAt` DATETIME(3) NOT NULL,
    `postById` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Announcements` ADD CONSTRAINT `Announcements_postById_fkey` FOREIGN KEY (`postById`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
