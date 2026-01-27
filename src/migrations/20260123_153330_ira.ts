import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_ira_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ira_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "ira_why_us_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "ira_benefits_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "ira_how_to_get_started_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "ira_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_title" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "ira" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_page_header_subtitle" varchar,
  	"header_page_header_title" varchar,
  	"header_page_header_description" varchar,
  	"header_image_id" integer,
  	"why_us_title" varchar,
  	"why_us_description" varchar,
  	"why_us_image_id" integer,
  	"benefits_title" varchar,
  	"how_to_get_started_title" varchar,
  	"consultations_c_t_a_title" varchar,
  	"consultations_c_t_a_description" varchar,
  	"_status" "enum_ira_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_ira_v_version_why_us_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ira_v_version_benefits_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ira_v_version_how_to_get_started_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ira_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_title" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_ira_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_page_header_subtitle" varchar,
  	"version_header_page_header_title" varchar,
  	"version_header_page_header_description" varchar,
  	"version_header_image_id" integer,
  	"version_why_us_title" varchar,
  	"version_why_us_description" varchar,
  	"version_why_us_image_id" integer,
  	"version_benefits_title" varchar,
  	"version_how_to_get_started_title" varchar,
  	"version_consultations_c_t_a_title" varchar,
  	"version_consultations_c_t_a_description" varchar,
  	"version__status" "enum__ira_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "ira_why_us_list" ADD CONSTRAINT "ira_why_us_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ira"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ira_benefits_list" ADD CONSTRAINT "ira_benefits_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ira"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ira_how_to_get_started_list" ADD CONSTRAINT "ira_how_to_get_started_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ira"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ira_blocks_button" ADD CONSTRAINT "ira_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ira"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ira" ADD CONSTRAINT "ira_header_image_id_media_id_fk" FOREIGN KEY ("header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ira" ADD CONSTRAINT "ira_why_us_image_id_media_id_fk" FOREIGN KEY ("why_us_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ira_v_version_why_us_list" ADD CONSTRAINT "_ira_v_version_why_us_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ira_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ira_v_version_benefits_list" ADD CONSTRAINT "_ira_v_version_benefits_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ira_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ira_v_version_how_to_get_started_list" ADD CONSTRAINT "_ira_v_version_how_to_get_started_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ira_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ira_v_blocks_button" ADD CONSTRAINT "_ira_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ira_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ira_v" ADD CONSTRAINT "_ira_v_version_header_image_id_media_id_fk" FOREIGN KEY ("version_header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ira_v" ADD CONSTRAINT "_ira_v_version_why_us_image_id_media_id_fk" FOREIGN KEY ("version_why_us_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "ira_why_us_list_order_idx" ON "ira_why_us_list" USING btree ("_order");
  CREATE INDEX "ira_why_us_list_parent_id_idx" ON "ira_why_us_list" USING btree ("_parent_id");
  CREATE INDEX "ira_benefits_list_order_idx" ON "ira_benefits_list" USING btree ("_order");
  CREATE INDEX "ira_benefits_list_parent_id_idx" ON "ira_benefits_list" USING btree ("_parent_id");
  CREATE INDEX "ira_how_to_get_started_list_order_idx" ON "ira_how_to_get_started_list" USING btree ("_order");
  CREATE INDEX "ira_how_to_get_started_list_parent_id_idx" ON "ira_how_to_get_started_list" USING btree ("_parent_id");
  CREATE INDEX "ira_blocks_button_order_idx" ON "ira_blocks_button" USING btree ("_order");
  CREATE INDEX "ira_blocks_button_parent_id_idx" ON "ira_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "ira_blocks_button_path_idx" ON "ira_blocks_button" USING btree ("_path");
  CREATE INDEX "ira_header_header_image_idx" ON "ira" USING btree ("header_image_id");
  CREATE INDEX "ira_why_us_why_us_image_idx" ON "ira" USING btree ("why_us_image_id");
  CREATE INDEX "ira__status_idx" ON "ira" USING btree ("_status");
  CREATE INDEX "_ira_v_version_why_us_list_order_idx" ON "_ira_v_version_why_us_list" USING btree ("_order");
  CREATE INDEX "_ira_v_version_why_us_list_parent_id_idx" ON "_ira_v_version_why_us_list" USING btree ("_parent_id");
  CREATE INDEX "_ira_v_version_benefits_list_order_idx" ON "_ira_v_version_benefits_list" USING btree ("_order");
  CREATE INDEX "_ira_v_version_benefits_list_parent_id_idx" ON "_ira_v_version_benefits_list" USING btree ("_parent_id");
  CREATE INDEX "_ira_v_version_how_to_get_started_list_order_idx" ON "_ira_v_version_how_to_get_started_list" USING btree ("_order");
  CREATE INDEX "_ira_v_version_how_to_get_started_list_parent_id_idx" ON "_ira_v_version_how_to_get_started_list" USING btree ("_parent_id");
  CREATE INDEX "_ira_v_blocks_button_order_idx" ON "_ira_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_ira_v_blocks_button_parent_id_idx" ON "_ira_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_ira_v_blocks_button_path_idx" ON "_ira_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_ira_v_version_header_version_header_image_idx" ON "_ira_v" USING btree ("version_header_image_id");
  CREATE INDEX "_ira_v_version_why_us_version_why_us_image_idx" ON "_ira_v" USING btree ("version_why_us_image_id");
  CREATE INDEX "_ira_v_version_version__status_idx" ON "_ira_v" USING btree ("version__status");
  CREATE INDEX "_ira_v_created_at_idx" ON "_ira_v" USING btree ("created_at");
  CREATE INDEX "_ira_v_updated_at_idx" ON "_ira_v" USING btree ("updated_at");
  CREATE INDEX "_ira_v_latest_idx" ON "_ira_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "ira_why_us_list" CASCADE;
  DROP TABLE "ira_benefits_list" CASCADE;
  DROP TABLE "ira_how_to_get_started_list" CASCADE;
  DROP TABLE "ira_blocks_button" CASCADE;
  DROP TABLE "ira" CASCADE;
  DROP TABLE "_ira_v_version_why_us_list" CASCADE;
  DROP TABLE "_ira_v_version_benefits_list" CASCADE;
  DROP TABLE "_ira_v_version_how_to_get_started_list" CASCADE;
  DROP TABLE "_ira_v_blocks_button" CASCADE;
  DROP TABLE "_ira_v" CASCADE;
  DROP TYPE "public"."enum_ira_status";
  DROP TYPE "public"."enum__ira_v_version_status";`)
}
