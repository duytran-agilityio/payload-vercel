import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "footer_menu_columns_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar NOT NULL,
  	"link" varchar NOT NULL
  );
  
  CREATE TABLE "footer_menu_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar
  );
  
  CREATE TABLE "footer" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"socials_instagram" varchar DEFAULT 'https://',
  	"socials_youtube" varchar DEFAULT 'https://',
  	"socials_x" varchar DEFAULT 'https://',
  	"socials_tiktok" varchar DEFAULT 'https://',
  	"socials_linkedin" varchar DEFAULT 'https://',
  	"socials_facebook" varchar DEFAULT 'https://',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "footer_menu_columns_items" ADD CONSTRAINT "footer_menu_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_menu_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_menu_columns" ADD CONSTRAINT "footer_menu_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "footer_menu_columns_items_order_idx" ON "footer_menu_columns_items" USING btree ("_order");
  CREATE INDEX "footer_menu_columns_items_parent_id_idx" ON "footer_menu_columns_items" USING btree ("_parent_id");
  CREATE INDEX "footer_menu_columns_order_idx" ON "footer_menu_columns" USING btree ("_order");
  CREATE INDEX "footer_menu_columns_parent_id_idx" ON "footer_menu_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footer_menu_columns_items" CASCADE;
  DROP TABLE "footer_menu_columns" CASCADE;
  DROP TABLE "footer" CASCADE;`)
}
