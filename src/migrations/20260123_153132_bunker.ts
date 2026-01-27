import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_bunker_comparison_table_body_battalion_bunker" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum_bunker_comparison_table_body_legacy_storage" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum_bunker_comparison_table_body_home_storage" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum_bunker_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__bunker_v_version_comparison_table_body_battalion_bunker" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum__bunker_v_version_comparison_table_body_legacy_storage" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum__bunker_v_version_comparison_table_body_home_storage" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum__bunker_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "bunker_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_title" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "bunker_header_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "bunker_how_it_works_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "bunker_pricing_metal_rates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"min" numeric,
  	"max" numeric,
  	"allocated_rate" numeric,
  	"segregated_rate" numeric
  );
  
  CREATE TABLE "bunker_why_battalion_bunker_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "bunker_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer_markdown" varchar
  );
  
  CREATE TABLE "bunker_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "bunker_comparison_table_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"battalion_bunker" "enum_bunker_comparison_table_body_battalion_bunker",
  	"legacy_storage" "enum_bunker_comparison_table_body_legacy_storage",
  	"home_storage" "enum_bunker_comparison_table_body_home_storage"
  );
  
  CREATE TABLE "bunker" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_page_header_subtitle" varchar,
  	"header_page_header_title" varchar,
  	"header_page_header_description" varchar,
  	"header_header_image_id" integer,
  	"how_it_works_title" varchar,
  	"pricing_title" varchar,
  	"pricing_description" varchar,
  	"pricing_subtitle" varchar,
  	"why_battalion_bunker_title" varchar,
  	"why_battalion_bunker_description" varchar,
  	"consultations_c_t_a_title" varchar,
  	"consultations_c_t_a_description" varchar,
  	"comparison_title" varchar,
  	"comparison_table_header_heading_1" varchar,
  	"comparison_table_header_heading_2" varchar,
  	"comparison_table_header_heading_3" varchar,
  	"comparison_table_header_heading_4" varchar,
  	"_status" "enum_bunker_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_bunker_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_title" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_bunker_v_version_header_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bunker_v_version_how_it_works_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bunker_v_version_pricing_metal_rates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"min" numeric,
  	"max" numeric,
  	"allocated_rate" numeric,
  	"segregated_rate" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bunker_v_version_why_battalion_bunker_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bunker_v_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer_markdown" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bunker_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_bunker_v_version_comparison_table_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"battalion_bunker" "enum__bunker_v_version_comparison_table_body_battalion_bunker",
  	"legacy_storage" "enum__bunker_v_version_comparison_table_body_legacy_storage",
  	"home_storage" "enum__bunker_v_version_comparison_table_body_home_storage",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bunker_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_page_header_subtitle" varchar,
  	"version_header_page_header_title" varchar,
  	"version_header_page_header_description" varchar,
  	"version_header_header_image_id" integer,
  	"version_how_it_works_title" varchar,
  	"version_pricing_title" varchar,
  	"version_pricing_description" varchar,
  	"version_pricing_subtitle" varchar,
  	"version_why_battalion_bunker_title" varchar,
  	"version_why_battalion_bunker_description" varchar,
  	"version_consultations_c_t_a_title" varchar,
  	"version_consultations_c_t_a_description" varchar,
  	"version_comparison_title" varchar,
  	"version_comparison_table_header_heading_1" varchar,
  	"version_comparison_table_header_heading_2" varchar,
  	"version_comparison_table_header_heading_3" varchar,
  	"version_comparison_table_header_heading_4" varchar,
  	"version__status" "enum__bunker_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "bunker_blocks_button" ADD CONSTRAINT "bunker_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bunker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bunker_header_list" ADD CONSTRAINT "bunker_header_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bunker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bunker_how_it_works_list" ADD CONSTRAINT "bunker_how_it_works_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bunker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bunker_pricing_metal_rates" ADD CONSTRAINT "bunker_pricing_metal_rates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bunker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bunker_why_battalion_bunker_list" ADD CONSTRAINT "bunker_why_battalion_bunker_list_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "bunker_why_battalion_bunker_list" ADD CONSTRAINT "bunker_why_battalion_bunker_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bunker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bunker_blocks_faq_questions" ADD CONSTRAINT "bunker_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bunker_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bunker_blocks_faq" ADD CONSTRAINT "bunker_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bunker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bunker_comparison_table_body" ADD CONSTRAINT "bunker_comparison_table_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bunker"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bunker" ADD CONSTRAINT "bunker_header_header_image_id_media_id_fk" FOREIGN KEY ("header_header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_bunker_v_blocks_button" ADD CONSTRAINT "_bunker_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bunker_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bunker_v_version_header_list" ADD CONSTRAINT "_bunker_v_version_header_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bunker_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bunker_v_version_how_it_works_list" ADD CONSTRAINT "_bunker_v_version_how_it_works_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bunker_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bunker_v_version_pricing_metal_rates" ADD CONSTRAINT "_bunker_v_version_pricing_metal_rates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bunker_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bunker_v_version_why_battalion_bunker_list" ADD CONSTRAINT "_bunker_v_version_why_battalion_bunker_list_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_bunker_v_version_why_battalion_bunker_list" ADD CONSTRAINT "_bunker_v_version_why_battalion_bunker_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bunker_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bunker_v_blocks_faq_questions" ADD CONSTRAINT "_bunker_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bunker_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bunker_v_blocks_faq" ADD CONSTRAINT "_bunker_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bunker_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bunker_v_version_comparison_table_body" ADD CONSTRAINT "_bunker_v_version_comparison_table_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bunker_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bunker_v" ADD CONSTRAINT "_bunker_v_version_header_header_image_id_media_id_fk" FOREIGN KEY ("version_header_header_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "bunker_blocks_button_order_idx" ON "bunker_blocks_button" USING btree ("_order");
  CREATE INDEX "bunker_blocks_button_parent_id_idx" ON "bunker_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "bunker_blocks_button_path_idx" ON "bunker_blocks_button" USING btree ("_path");
  CREATE INDEX "bunker_header_list_order_idx" ON "bunker_header_list" USING btree ("_order");
  CREATE INDEX "bunker_header_list_parent_id_idx" ON "bunker_header_list" USING btree ("_parent_id");
  CREATE INDEX "bunker_how_it_works_list_order_idx" ON "bunker_how_it_works_list" USING btree ("_order");
  CREATE INDEX "bunker_how_it_works_list_parent_id_idx" ON "bunker_how_it_works_list" USING btree ("_parent_id");
  CREATE INDEX "bunker_pricing_metal_rates_order_idx" ON "bunker_pricing_metal_rates" USING btree ("_order");
  CREATE INDEX "bunker_pricing_metal_rates_parent_id_idx" ON "bunker_pricing_metal_rates" USING btree ("_parent_id");
  CREATE INDEX "bunker_why_battalion_bunker_list_order_idx" ON "bunker_why_battalion_bunker_list" USING btree ("_order");
  CREATE INDEX "bunker_why_battalion_bunker_list_parent_id_idx" ON "bunker_why_battalion_bunker_list" USING btree ("_parent_id");
  CREATE INDEX "bunker_why_battalion_bunker_list_icon_idx" ON "bunker_why_battalion_bunker_list" USING btree ("icon_id");
  CREATE INDEX "bunker_blocks_faq_questions_order_idx" ON "bunker_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "bunker_blocks_faq_questions_parent_id_idx" ON "bunker_blocks_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "bunker_blocks_faq_order_idx" ON "bunker_blocks_faq" USING btree ("_order");
  CREATE INDEX "bunker_blocks_faq_parent_id_idx" ON "bunker_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "bunker_blocks_faq_path_idx" ON "bunker_blocks_faq" USING btree ("_path");
  CREATE INDEX "bunker_comparison_table_body_order_idx" ON "bunker_comparison_table_body" USING btree ("_order");
  CREATE INDEX "bunker_comparison_table_body_parent_id_idx" ON "bunker_comparison_table_body" USING btree ("_parent_id");
  CREATE INDEX "bunker_header_header_header_image_idx" ON "bunker" USING btree ("header_header_image_id");
  CREATE INDEX "bunker__status_idx" ON "bunker" USING btree ("_status");
  CREATE INDEX "_bunker_v_blocks_button_order_idx" ON "_bunker_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_bunker_v_blocks_button_parent_id_idx" ON "_bunker_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_bunker_v_blocks_button_path_idx" ON "_bunker_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_bunker_v_version_header_list_order_idx" ON "_bunker_v_version_header_list" USING btree ("_order");
  CREATE INDEX "_bunker_v_version_header_list_parent_id_idx" ON "_bunker_v_version_header_list" USING btree ("_parent_id");
  CREATE INDEX "_bunker_v_version_how_it_works_list_order_idx" ON "_bunker_v_version_how_it_works_list" USING btree ("_order");
  CREATE INDEX "_bunker_v_version_how_it_works_list_parent_id_idx" ON "_bunker_v_version_how_it_works_list" USING btree ("_parent_id");
  CREATE INDEX "_bunker_v_version_pricing_metal_rates_order_idx" ON "_bunker_v_version_pricing_metal_rates" USING btree ("_order");
  CREATE INDEX "_bunker_v_version_pricing_metal_rates_parent_id_idx" ON "_bunker_v_version_pricing_metal_rates" USING btree ("_parent_id");
  CREATE INDEX "_bunker_v_version_why_battalion_bunker_list_order_idx" ON "_bunker_v_version_why_battalion_bunker_list" USING btree ("_order");
  CREATE INDEX "_bunker_v_version_why_battalion_bunker_list_parent_id_idx" ON "_bunker_v_version_why_battalion_bunker_list" USING btree ("_parent_id");
  CREATE INDEX "_bunker_v_version_why_battalion_bunker_list_icon_idx" ON "_bunker_v_version_why_battalion_bunker_list" USING btree ("icon_id");
  CREATE INDEX "_bunker_v_blocks_faq_questions_order_idx" ON "_bunker_v_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "_bunker_v_blocks_faq_questions_parent_id_idx" ON "_bunker_v_blocks_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "_bunker_v_blocks_faq_order_idx" ON "_bunker_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_bunker_v_blocks_faq_parent_id_idx" ON "_bunker_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_bunker_v_blocks_faq_path_idx" ON "_bunker_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_bunker_v_version_comparison_table_body_order_idx" ON "_bunker_v_version_comparison_table_body" USING btree ("_order");
  CREATE INDEX "_bunker_v_version_comparison_table_body_parent_id_idx" ON "_bunker_v_version_comparison_table_body" USING btree ("_parent_id");
  CREATE INDEX "_bunker_v_version_header_version_header_header_image_idx" ON "_bunker_v" USING btree ("version_header_header_image_id");
  CREATE INDEX "_bunker_v_version_version__status_idx" ON "_bunker_v" USING btree ("version__status");
  CREATE INDEX "_bunker_v_created_at_idx" ON "_bunker_v" USING btree ("created_at");
  CREATE INDEX "_bunker_v_updated_at_idx" ON "_bunker_v" USING btree ("updated_at");
  CREATE INDEX "_bunker_v_latest_idx" ON "_bunker_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "bunker_blocks_button" CASCADE;
  DROP TABLE "bunker_header_list" CASCADE;
  DROP TABLE "bunker_how_it_works_list" CASCADE;
  DROP TABLE "bunker_pricing_metal_rates" CASCADE;
  DROP TABLE "bunker_why_battalion_bunker_list" CASCADE;
  DROP TABLE "bunker_blocks_faq_questions" CASCADE;
  DROP TABLE "bunker_blocks_faq" CASCADE;
  DROP TABLE "bunker_comparison_table_body" CASCADE;
  DROP TABLE "bunker" CASCADE;
  DROP TABLE "_bunker_v_blocks_button" CASCADE;
  DROP TABLE "_bunker_v_version_header_list" CASCADE;
  DROP TABLE "_bunker_v_version_how_it_works_list" CASCADE;
  DROP TABLE "_bunker_v_version_pricing_metal_rates" CASCADE;
  DROP TABLE "_bunker_v_version_why_battalion_bunker_list" CASCADE;
  DROP TABLE "_bunker_v_blocks_faq_questions" CASCADE;
  DROP TABLE "_bunker_v_blocks_faq" CASCADE;
  DROP TABLE "_bunker_v_version_comparison_table_body" CASCADE;
  DROP TABLE "_bunker_v" CASCADE;
  DROP TYPE "public"."enum_bunker_comparison_table_body_battalion_bunker";
  DROP TYPE "public"."enum_bunker_comparison_table_body_legacy_storage";
  DROP TYPE "public"."enum_bunker_comparison_table_body_home_storage";
  DROP TYPE "public"."enum_bunker_status";
  DROP TYPE "public"."enum__bunker_v_version_comparison_table_body_battalion_bunker";
  DROP TYPE "public"."enum__bunker_v_version_comparison_table_body_legacy_storage";
  DROP TYPE "public"."enum__bunker_v_version_comparison_table_body_home_storage";
  DROP TYPE "public"."enum__bunker_v_version_status";`)
}
