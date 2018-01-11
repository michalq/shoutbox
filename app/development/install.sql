CREATE TABLE `shoutbox` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100),
    `user_agent` VARCHAR(200),
    `message` TEXT,
    `ip_addr` CHAR(15),
    `posted_at` INT
) ENGINE=InnoDB;