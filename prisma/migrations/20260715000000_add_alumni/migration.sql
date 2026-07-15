-- CreateTable
CREATE TABLE `Alumni` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nis` VARCHAR(191) NOT NULL,
    `namaLengkap` VARCHAR(191) NOT NULL,
    `jenisKelamin` ENUM('LakiLaki', 'Perempuan') NOT NULL,
    `tanggalLahir` DATETIME(3) NOT NULL,
    `tahunLulus` INTEGER NOT NULL,
    `riwayatPendidikanPekerjaan` TEXT,
    `alamat` TEXT NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `noHp` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Alumni_nis_key`(`nis`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
