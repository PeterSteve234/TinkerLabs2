CREATE TABLE `anime_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`animeId` int NOT NULL,
	`animeTitle` text,
	`animeImage` text,
	`animeScore` varchar(10),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `anime_favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `game_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`gameId` varchar(255) NOT NULL,
	`gameTitle` text,
	`gameImage` text,
	`gamePrice` varchar(50),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `game_favorites_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `anime_favorites` ADD CONSTRAINT `anime_favorites_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `game_favorites` ADD CONSTRAINT `game_favorites_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;