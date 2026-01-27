import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "homepage_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_title" varchar NOT NULL,
  	"button_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "homepage_hero_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "homepage_company_info_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_company_info_slider_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"link_text" varchar,
  	"link_url" varchar,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_how_it_works_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_comparison_battalion_pros" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage_comparison_other_cons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_banner_id" integer NOT NULL,
  	"hero_mobile_banner_id" integer,
  	"hero_title" varchar NOT NULL,
  	"hero_description" varchar NOT NULL,
  	"quotation_quote" varchar NOT NULL,
  	"quotation_author" varchar NOT NULL,
  	"quotation_image_id" integer NOT NULL,
  	"quotation_additional_image_id" integer,
  	"quotation_mobile_image_id" integer,
  	"company_info_sub_title" varchar,
  	"company_info_description" varchar NOT NULL,
  	"how_it_works_title" varchar NOT NULL,
  	"how_it_works_background_image_id" integer NOT NULL,
  	"comparison_title" varchar NOT NULL,
  	"comparison_description" varchar NOT NULL,
  	"comparison_logo_id" integer,
  	"comparison_background_image_id" integer,
  	"product_slider_title" varchar NOT NULL,
  	"product_slider_description" varchar NOT NULL,
  	"newsletter_heading" varchar NOT NULL,
  	"newsletter_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "homepage_blocks_button" ADD CONSTRAINT "homepage_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_checklist" ADD CONSTRAINT "homepage_hero_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_company_info_title" ADD CONSTRAINT "homepage_company_info_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_company_info_slider_items" ADD CONSTRAINT "homepage_company_info_slider_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_company_info_slider_items" ADD CONSTRAINT "homepage_company_info_slider_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_how_it_works_list" ADD CONSTRAINT "homepage_how_it_works_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_comparison_battalion_pros" ADD CONSTRAINT "homepage_comparison_battalion_pros_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_comparison_other_cons" ADD CONSTRAINT "homepage_comparison_other_cons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_banner_id_media_id_fk" FOREIGN KEY ("hero_banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_hero_mobile_banner_id_media_id_fk" FOREIGN KEY ("hero_mobile_banner_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_quotation_image_id_media_id_fk" FOREIGN KEY ("quotation_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_quotation_additional_image_id_media_id_fk" FOREIGN KEY ("quotation_additional_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_quotation_mobile_image_id_media_id_fk" FOREIGN KEY ("quotation_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_how_it_works_background_image_id_media_id_fk" FOREIGN KEY ("how_it_works_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_comparison_logo_id_media_id_fk" FOREIGN KEY ("comparison_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage" ADD CONSTRAINT "homepage_comparison_background_image_id_media_id_fk" FOREIGN KEY ("comparison_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "homepage_blocks_button_order_idx" ON "homepage_blocks_button" USING btree ("_order");
  CREATE INDEX "homepage_blocks_button_parent_id_idx" ON "homepage_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "homepage_blocks_button_path_idx" ON "homepage_blocks_button" USING btree ("_path");
  CREATE INDEX "homepage_hero_checklist_order_idx" ON "homepage_hero_checklist" USING btree ("_order");
  CREATE INDEX "homepage_hero_checklist_parent_id_idx" ON "homepage_hero_checklist" USING btree ("_parent_id");
  CREATE INDEX "homepage_company_info_title_order_idx" ON "homepage_company_info_title" USING btree ("_order");
  CREATE INDEX "homepage_company_info_title_parent_id_idx" ON "homepage_company_info_title" USING btree ("_parent_id");
  CREATE INDEX "homepage_company_info_slider_items_order_idx" ON "homepage_company_info_slider_items" USING btree ("_order");
  CREATE INDEX "homepage_company_info_slider_items_parent_id_idx" ON "homepage_company_info_slider_items" USING btree ("_parent_id");
  CREATE INDEX "homepage_company_info_slider_items_image_idx" ON "homepage_company_info_slider_items" USING btree ("image_id");
  CREATE INDEX "homepage_how_it_works_list_order_idx" ON "homepage_how_it_works_list" USING btree ("_order");
  CREATE INDEX "homepage_how_it_works_list_parent_id_idx" ON "homepage_how_it_works_list" USING btree ("_parent_id");
  CREATE INDEX "homepage_comparison_battalion_pros_order_idx" ON "homepage_comparison_battalion_pros" USING btree ("_order");
  CREATE INDEX "homepage_comparison_battalion_pros_parent_id_idx" ON "homepage_comparison_battalion_pros" USING btree ("_parent_id");
  CREATE INDEX "homepage_comparison_other_cons_order_idx" ON "homepage_comparison_other_cons" USING btree ("_order");
  CREATE INDEX "homepage_comparison_other_cons_parent_id_idx" ON "homepage_comparison_other_cons" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_hero_banner_idx" ON "homepage" USING btree ("hero_banner_id");
  CREATE INDEX "homepage_hero_hero_mobile_banner_idx" ON "homepage" USING btree ("hero_mobile_banner_id");
  CREATE INDEX "homepage_quotation_quotation_image_idx" ON "homepage" USING btree ("quotation_image_id");
  CREATE INDEX "homepage_quotation_quotation_additional_image_idx" ON "homepage" USING btree ("quotation_additional_image_id");
  CREATE INDEX "homepage_quotation_quotation_mobile_image_idx" ON "homepage" USING btree ("quotation_mobile_image_id");
  CREATE INDEX "homepage_how_it_works_how_it_works_background_image_idx" ON "homepage" USING btree ("how_it_works_background_image_id");
  CREATE INDEX "homepage_comparison_comparison_logo_idx" ON "homepage" USING btree ("comparison_logo_id");
  CREATE INDEX "homepage_comparison_comparison_background_image_idx" ON "homepage" USING btree ("comparison_background_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "homepage_blocks_button" CASCADE;
  DROP TABLE "homepage_hero_checklist" CASCADE;
  DROP TABLE "homepage_company_info_title" CASCADE;
  DROP TABLE "homepage_company_info_slider_items" CASCADE;
  DROP TABLE "homepage_how_it_works_list" CASCADE;
  DROP TABLE "homepage_comparison_battalion_pros" CASCADE;
  DROP TABLE "homepage_comparison_other_cons" CASCADE;
  DROP TABLE "homepage" CASCADE;`)
}
