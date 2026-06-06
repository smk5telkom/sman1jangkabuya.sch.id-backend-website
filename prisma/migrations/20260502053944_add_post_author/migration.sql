/*
  Warnings:

  - Added the required column `postById` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Posts` ADD COLUMN `postById` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Users` ADD COLUMN `refreshToken` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_postById_fkey` FOREIGN KEY (`postById`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
