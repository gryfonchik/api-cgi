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
    `user_id` INTEGER NOT NULL,
    `file` VARCHAR(255) NOT NULL,
    `info` VARCHAR(255) NOT NULL,

    INDEX `portfolio_fk0`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `task_id` INTEGER NOT NULL,
    `player_stat` VARCHAR(255) NOT NULL,
    `client_stat` VARCHAR(255) NOT NULL,

    INDEX `status_fk0`(`task_id`),
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

    INDEX `task_fk0`(`player_id`),
    INDEX `task_fk1`(`client_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `contacts` VARCHAR(255) NOT NULL,
    `type` VARCHAR(15) NOT NULL,
    `info` VARCHAR(255) NULL,
    `ava` VARCHAR(255) NOT NULL,
    `role` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `archive` ADD CONSTRAINT `archive_fk0` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `portfolio` ADD CONSTRAINT `portfolio_fk0` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `status` ADD CONSTRAINT `status_fk0` FOREIGN KEY (`task_id`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_fk1` FOREIGN KEY (`client_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_fk0` FOREIGN KEY (`player_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
