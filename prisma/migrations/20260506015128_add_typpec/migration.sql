/*
  Warnings:

  - Added the required column `typeContent` to the `Announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Announcements` ADD COLUMN `typeContent` VARCHAR(191) NOT NULL;
