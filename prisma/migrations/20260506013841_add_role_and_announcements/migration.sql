-- AlterTable
ALTER TABLE `Announcements` MODIFY `content` TEXT NOT NULL,
    MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `role` ENUM('SuperAdmin', 'Admin') NOT NULL DEFAULT 'Admin';
