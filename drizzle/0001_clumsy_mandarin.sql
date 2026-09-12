CREATE TABLE `resumes` (
	`id` text PRIMARY KEY NOT NULL,
	`job_id` text NOT NULL,
	`payload` text NOT NULL,
	`latex` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
