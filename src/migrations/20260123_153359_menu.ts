import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_menu_items_childrens_sub_items_target" AS ENUM('_self', '_blank', '_parent', '_top');
  CREATE TYPE "public"."enum_menu_items_childrens_target" AS ENUM('_self', '_blank', '_parent', '_top');
  CREATE TYPE "public"."enum_menu_items_target" AS ENUM('_self', '_blank', '_parent', '_top');
  CREATE TABLE "menu_items_childrens_sub_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar NOT NULL,
  	"url" varchar,
  	"target" "enum_menu_items_childrens_sub_items_target" DEFAULT '_self',
  	"custom_image_id" integer
  );
  
  CREATE TABLE "menu_items_childrens" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar NOT NULL,
  	"url" varchar,
  	"target" "enum_menu_items_childrens_target" DEFAULT '_self',
  	"custom_image_id" integer
  );
  
  CREATE TABLE "menu_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"order" numeric,
  	"title" varchar NOT NULL,
  	"url" varchar,
  	"target" "enum_menu_items_target" DEFAULT '_self',
  	"custom_image_id" integer
  );
  
  CREATE TABLE "menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "menu_items_childrens_sub_items" ADD CONSTRAINT "menu_items_childrens_sub_items_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_childrens_sub_items" ADD CONSTRAINT "menu_items_childrens_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items_childrens"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_childrens" ADD CONSTRAINT "menu_items_childrens_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_childrens" ADD CONSTRAINT "menu_items_childrens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "menu_items_childrens_sub_items_order_idx" ON "menu_items_childrens_sub_items" USING btree ("_order");
  CREATE INDEX "menu_items_childrens_sub_items_parent_id_idx" ON "menu_items_childrens_sub_items" USING btree ("_parent_id");
  CREATE INDEX "menu_items_childrens_sub_items_custom_image_idx" ON "menu_items_childrens_sub_items" USING btree ("custom_image_id");
  CREATE INDEX "menu_items_childrens_order_idx" ON "menu_items_childrens" USING btree ("_order");
  CREATE INDEX "menu_items_childrens_parent_id_idx" ON "menu_items_childrens" USING btree ("_parent_id");
  CREATE INDEX "menu_items_childrens_custom_image_idx" ON "menu_items_childrens" USING btree ("custom_image_id");
  CREATE INDEX "menu_items_order_idx" ON "menu_items" USING btree ("_order");
  CREATE INDEX "menu_items_parent_id_idx" ON "menu_items" USING btree ("_parent_id");
  CREATE INDEX "menu_items_custom_image_idx" ON "menu_items" USING btree ("custom_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "menu_items_childrens_sub_items" CASCADE;
  DROP TABLE "menu_items_childrens" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  DROP TABLE "menu" CASCADE;
  DROP TYPE "public"."enum_menu_items_childrens_sub_items_target";
  DROP TYPE "public"."enum_menu_items_childrens_target";
  DROP TYPE "public"."enum_menu_items_target";`)
}
