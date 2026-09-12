CREATE TABLE `jobs` (
	`id` text PRIMARY KEY NOT NULL,
	`source` text NOT NULL,
	`payload` text NOT NULL,
	`status` text DEFAULT 'Saved' NOT NULL,
	`notes` text DEFAULT '' NOT NULL,
	`followup` text DEFAULT '' NOT NULL,
	`first_seen` text NOT NULL,
	`last_seen` text NOT NULL,
	`availability` text DEFAULT 'Listed' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `scans` (
	`id` text PRIMARY KEY NOT NULL,
	`checked` text NOT NULL,
	`result` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL
);
