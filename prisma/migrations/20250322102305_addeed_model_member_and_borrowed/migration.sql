-- CreateTable
CREATE TABLE `members` (
    `code` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `isPenalized` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `borrow_records` (
    `id` VARCHAR(191) NOT NULL,
    `memberCode` VARCHAR(100) NOT NULL,
    `bookCode` VARCHAR(100) NOT NULL,
    `borrowedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `returnedAt` DATETIME(3) NULL,

    UNIQUE INDEX `borrow_records_bookCode_key`(`bookCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `borrow_records` ADD CONSTRAINT `borrow_records_memberCode_fkey` FOREIGN KEY (`memberCode`) REFERENCES `members`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `borrow_records` ADD CONSTRAINT `borrow_records_bookCode_fkey` FOREIGN KEY (`bookCode`) REFERENCES `books`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
