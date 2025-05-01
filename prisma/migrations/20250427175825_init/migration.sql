-- CreateTable
CREATE TABLE `User` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(191) NOT NULL,
    `UserName` VARCHAR(191) NOT NULL,
    `Password` VARCHAR(191) NOT NULL,
    `CreateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `PhoneNumber` DOUBLE NULL,

    UNIQUE INDEX `User_UserName_key`(`UserName`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
