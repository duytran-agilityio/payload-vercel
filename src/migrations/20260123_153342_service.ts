import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_service_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__service_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "service_header_link_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"link" varchar,
  	"link_title" varchar DEFAULT 'Learn More'
  );
  
  CREATE TABLE "service_consultations_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "service_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_title" varchar,
  	"button_url" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "service_secure_storage_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "service_ira_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "service" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"header_page_header_subtitle" varchar,
  	"header_page_header_title" varchar,
  	"header_page_header_description" varchar,
  	"consultations_title" varchar,
  	"consultations_description" varchar,
  	"consultations_image_id" integer,
  	"consultationscta_1_title" varchar,
  	"consultationscta_1_description" varchar,
  	"secure_storage_title" varchar,
  	"secure_storage_description" varchar,
  	"secure_storage_image_id" integer,
  	"ira_title" varchar,
  	"ira_description" varchar,
  	"ira_image_id" integer,
  	"ira_mobile_image_id" integer,
  	"consultationscta_2_title" varchar,
  	"consultationscta_2_description" varchar,
  	"_status" "enum_service_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_service_v_version_header_link_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"image_id" integer,
  	"description" varchar,
  	"link" varchar,
  	"link_title" varchar DEFAULT 'Learn More',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_service_v_version_consultations_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_service_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"button_title" varchar,
  	"button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_service_v_version_secure_storage_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_service_v_version_ira_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_service_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_header_page_header_subtitle" varchar,
  	"version_header_page_header_title" varchar,
  	"version_header_page_header_description" varchar,
  	"version_consultations_title" varchar,
  	"version_consultations_description" varchar,
  	"version_consultations_image_id" integer,
  	"version_consultationscta_1_title" varchar,
  	"version_consultationscta_1_description" varchar,
  	"version_secure_storage_title" varchar,
  	"version_secure_storage_description" varchar,
  	"version_secure_storage_image_id" integer,
  	"version_ira_title" varchar,
  	"version_ira_description" varchar,
  	"version_ira_image_id" integer,
  	"version_ira_mobile_image_id" integer,
  	"version_consultationscta_2_title" varchar,
  	"version_consultationscta_2_description" varchar,
  	"version__status" "enum__service_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "service_header_link_card" ADD CONSTRAINT "service_header_link_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_header_link_card" ADD CONSTRAINT "service_header_link_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_consultations_list" ADD CONSTRAINT "service_consultations_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_blocks_button" ADD CONSTRAINT "service_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_secure_storage_list" ADD CONSTRAINT "service_secure_storage_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_ira_list" ADD CONSTRAINT "service_ira_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service" ADD CONSTRAINT "service_consultations_image_id_media_id_fk" FOREIGN KEY ("consultations_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service" ADD CONSTRAINT "service_secure_storage_image_id_media_id_fk" FOREIGN KEY ("secure_storage_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service" ADD CONSTRAINT "service_ira_image_id_media_id_fk" FOREIGN KEY ("ira_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service" ADD CONSTRAINT "service_ira_mobile_image_id_media_id_fk" FOREIGN KEY ("ira_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_v_version_header_link_card" ADD CONSTRAINT "_service_v_version_header_link_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_v_version_header_link_card" ADD CONSTRAINT "_service_v_version_header_link_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_service_v_version_consultations_list" ADD CONSTRAINT "_service_v_version_consultations_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_service_v_blocks_button" ADD CONSTRAINT "_service_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_service_v_version_secure_storage_list" ADD CONSTRAINT "_service_v_version_secure_storage_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_service_v_version_ira_list" ADD CONSTRAINT "_service_v_version_ira_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_service_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_service_v" ADD CONSTRAINT "_service_v_version_consultations_image_id_media_id_fk" FOREIGN KEY ("version_consultations_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_v" ADD CONSTRAINT "_service_v_version_secure_storage_image_id_media_id_fk" FOREIGN KEY ("version_secure_storage_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_v" ADD CONSTRAINT "_service_v_version_ira_image_id_media_id_fk" FOREIGN KEY ("version_ira_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_service_v" ADD CONSTRAINT "_service_v_version_ira_mobile_image_id_media_id_fk" FOREIGN KEY ("version_ira_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "service_header_link_card_order_idx" ON "service_header_link_card" USING btree ("_order");
  CREATE INDEX "service_header_link_card_parent_id_idx" ON "service_header_link_card" USING btree ("_parent_id");
  CREATE INDEX "service_header_link_card_image_idx" ON "service_header_link_card" USING btree ("image_id");
  CREATE INDEX "service_consultations_list_order_idx" ON "service_consultations_list" USING btree ("_order");
  CREATE INDEX "service_consultations_list_parent_id_idx" ON "service_consultations_list" USING btree ("_parent_id");
  CREATE INDEX "service_blocks_button_order_idx" ON "service_blocks_button" USING btree ("_order");
  CREATE INDEX "service_blocks_button_parent_id_idx" ON "service_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "service_blocks_button_path_idx" ON "service_blocks_button" USING btree ("_path");
  CREATE INDEX "service_secure_storage_list_order_idx" ON "service_secure_storage_list" USING btree ("_order");
  CREATE INDEX "service_secure_storage_list_parent_id_idx" ON "service_secure_storage_list" USING btree ("_parent_id");
  CREATE INDEX "service_ira_list_order_idx" ON "service_ira_list" USING btree ("_order");
  CREATE INDEX "service_ira_list_parent_id_idx" ON "service_ira_list" USING btree ("_parent_id");
  CREATE INDEX "service_consultations_consultations_image_idx" ON "service" USING btree ("consultations_image_id");
  CREATE INDEX "service_secure_storage_secure_storage_image_idx" ON "service" USING btree ("secure_storage_image_id");
  CREATE INDEX "service_ira_ira_image_idx" ON "service" USING btree ("ira_image_id");
  CREATE INDEX "service_ira_ira_mobile_image_idx" ON "service" USING btree ("ira_mobile_image_id");
  CREATE INDEX "service__status_idx" ON "service" USING btree ("_status");
  CREATE INDEX "_service_v_version_header_link_card_order_idx" ON "_service_v_version_header_link_card" USING btree ("_order");
  CREATE INDEX "_service_v_version_header_link_card_parent_id_idx" ON "_service_v_version_header_link_card" USING btree ("_parent_id");
  CREATE INDEX "_service_v_version_header_link_card_image_idx" ON "_service_v_version_header_link_card" USING btree ("image_id");
  CREATE INDEX "_service_v_version_consultations_list_order_idx" ON "_service_v_version_consultations_list" USING btree ("_order");
  CREATE INDEX "_service_v_version_consultations_list_parent_id_idx" ON "_service_v_version_consultations_list" USING btree ("_parent_id");
  CREATE INDEX "_service_v_blocks_button_order_idx" ON "_service_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_service_v_blocks_button_parent_id_idx" ON "_service_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_service_v_blocks_button_path_idx" ON "_service_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_service_v_version_secure_storage_list_order_idx" ON "_service_v_version_secure_storage_list" USING btree ("_order");
  CREATE INDEX "_service_v_version_secure_storage_list_parent_id_idx" ON "_service_v_version_secure_storage_list" USING btree ("_parent_id");
  CREATE INDEX "_service_v_version_ira_list_order_idx" ON "_service_v_version_ira_list" USING btree ("_order");
  CREATE INDEX "_service_v_version_ira_list_parent_id_idx" ON "_service_v_version_ira_list" USING btree ("_parent_id");
  CREATE INDEX "_service_v_version_consultations_version_consultations_i_idx" ON "_service_v" USING btree ("version_consultations_image_id");
  CREATE INDEX "_service_v_version_secure_storage_version_secure_storage_idx" ON "_service_v" USING btree ("version_secure_storage_image_id");
  CREATE INDEX "_service_v_version_ira_version_ira_image_idx" ON "_service_v" USING btree ("version_ira_image_id");
  CREATE INDEX "_service_v_version_ira_version_ira_mobile_image_idx" ON "_service_v" USING btree ("version_ira_mobile_image_id");
  CREATE INDEX "_service_v_version_version__status_idx" ON "_service_v" USING btree ("version__status");
  CREATE INDEX "_service_v_created_at_idx" ON "_service_v" USING btree ("created_at");
  CREATE INDEX "_service_v_updated_at_idx" ON "_service_v" USING btree ("updated_at");
  CREATE INDEX "_service_v_latest_idx" ON "_service_v" USING btree ("latest");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "service_header_link_card" CASCADE;
  DROP TABLE "service_consultations_list" CASCADE;
  DROP TABLE "service_blocks_button" CASCADE;
  DROP TABLE "service_secure_storage_list" CASCADE;
  DROP TABLE "service_ira_list" CASCADE;
  DROP TABLE "service" CASCADE;
  DROP TABLE "_service_v_version_header_link_card" CASCADE;
  DROP TABLE "_service_v_version_consultations_list" CASCADE;
  DROP TABLE "_service_v_blocks_button" CASCADE;
  DROP TABLE "_service_v_version_secure_storage_list" CASCADE;
  DROP TABLE "_service_v_version_ira_list" CASCADE;
  DROP TABLE "_service_v" CASCADE;
  DROP TYPE "public"."enum_service_status";
  DROP TYPE "public"."enum__service_v_version_status";`)
}
