import { Migration } from '@mikro-orm/migrations';

export class Migration20231115140044 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "chats" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "tg_id" varchar(255) not null, "name" varchar(255) not null, "type" text check ("type" in (\'channel\', \'group\', \'private\', \'supergroup\')) not null);',
    );
    this.addSql(
      'alter table "chats" add constraint "chats_tg_id_unique" unique ("tg_id");',
    );

    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "tg_id" varchar(255) not null, "username" varchar(255) null, "first_name" varchar(255) null, "last_name" varchar(255) null, "language_code" varchar(255) null, "is_allowed" boolean not null default false);',
    );
    this.addSql(
      'alter table "users" add constraint "users_tg_id_unique" unique ("tg_id");',
    );

    this.addSql(
      'create table "messages" ("id" serial primary key, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) not null default now(), "tg_id" varchar(255) not null, "text" text not null, "user_id" int not null, "chat_id" int not null);',
    );

    this.addSql(
      'alter table "messages" add constraint "messages_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "messages" add constraint "messages_chat_id_foreign" foreign key ("chat_id") references "chats" ("id") on update cascade;',
    );

    this.addSql(
      "insert into users (tg_id, username, first_name, last_name) values ('1', 'bot', 'bot', 'bot');",
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table "messages" cascade;');
    this.addSql('drop table "users" cascade;');
    this.addSql('drop table "chats" cascade;');
  }
}
