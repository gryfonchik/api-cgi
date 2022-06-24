-- CreateTable
CREATE TABLE `archive` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_id` INTEGER NOT NULL,
    `title` VARCHAR(225) NOT NULL,
    `info` VARCHAR(500) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `file` VARCHAR(250) NOT NULL,

    INDEX `archive_fk0`(`task_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portfolio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `file` VARCHAR(255) NOT NULL,
    `info` VARCHAR(255) NOT NULL,

    INDEX `portfolio_fk0`(`player_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `task` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NULL,
    `client_id` INTEGER NULL,
    `title` VARCHAR(255) NOT NULL,
    `info` VARCHAR(500) NOT NULL,
    `type` VARCHAR(50) NOT NULL,
    `moderated` BOOLEAN NOT NULL DEFAULT false,
    `url` VARCHAR(300) NULL,

    INDEX `task_fk0`(`player_id`),
    INDEX `task_fk1`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `contacts` VARCHAR(255) NOT NULL,
    `type` VARCHAR(30) NULL,
    `info` VARCHAR(255) NULL,
    `pay` VARCHAR(20) NULL,
    `ava` VARCHAR(255) NOT NULL,
    `role` INTEGER NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `archive` ADD CONSTRAINT `archive_fk0` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `portfolio` ADD CONSTRAINT `portfolio_fk0` FOREIGN KEY (`player_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_fk1` FOREIGN KEY (`client_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_fk0` FOREIGN KEY (`player_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
