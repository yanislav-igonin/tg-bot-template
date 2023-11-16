DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('private', 'group', 'supergroup', 'channel');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chats" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT '2023-11-16 09:43:13.477' NOT NULL,
	"updated_at" timestamp DEFAULT '2023-11-16 09:43:13.477' NOT NULL,
	"name" varchar(256) NOT NULL,
	"tg_id" varchar(256) NOT NULL,
	"type" "type" NOT NULL,
	CONSTRAINT "chats_tg_id_unique" UNIQUE("tg_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT '2023-11-16 09:43:13.477' NOT NULL,
	"updated_at" timestamp DEFAULT '2023-11-16 09:43:13.477' NOT NULL,
	"chat_id" integer NOT NULL,
	"text" text,
	"tg_id" varchar(256) NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT '2023-11-16 09:43:13.477' NOT NULL,
	"updated_at" timestamp DEFAULT '2023-11-16 09:43:13.477' NOT NULL,
	"first_name" varchar(256),
	"is_allowed" boolean DEFAULT false NOT NULL,
	"language_code" varchar(2),
	"last_name" varchar(256),
	"name" varchar(256),
	"tg_id" varchar(256) NOT NULL,
	CONSTRAINT "users_tg_id_unique" UNIQUE("tg_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_chats_id_fk" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
