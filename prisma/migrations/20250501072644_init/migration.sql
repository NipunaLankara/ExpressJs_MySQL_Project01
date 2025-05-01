-- CreateTable
CREATE TABLE `Car` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `CarNumber` VARCHAR(191) NOT NULL,
    `Model` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Car_CarNumber_key`(`CarNumber`),
    UNIQUE INDEX `Car_userId_key`(`userId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car` ADD CONSTRAINT `Car_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`Id`) ON DELETE RESTRICT ON UPDATE CASCADE;
