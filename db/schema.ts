import { sqliteTable,text } from 'drizzle-orm/sqlite-core';
export const jobs=sqliteTable('jobs',{id:text('id').primaryKey(),source:text('source').notNull(),payload:text('payload').notNull(),status:text('status').notNull().default('Saved'),notes:text('notes').notNull().default(''),followup:text('followup').notNull().default(''),firstSeen:text('first_seen').notNull(),lastSeen:text('last_seen').notNull(),availability:text('availability').notNull().default('Listed')});
export const settings=sqliteTable('settings',{id:text('id').primaryKey(),payload:text('payload').notNull()});
export const scans=sqliteTable('scans',{id:text('id').primaryKey(),checked:text('checked').notNull(),result:text('result').notNull()});
export const resumes=sqliteTable('resumes',{id:text('id').primaryKey(),jobId:text('job_id').notNull(),payload:text('payload').notNull(),latex:text('latex').notNull(),createdAt:text('created_at').notNull(),updatedAt:text('updated_at').notNull()});
