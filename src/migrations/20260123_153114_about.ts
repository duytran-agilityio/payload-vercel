import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "about_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"button_title" varchar NOT NULL,
  	"button_url" varchar NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_banner_image_id" integer NOT NULL,
  	"markdown_section_subtitle" varchar,
  	"markdown_section_title" varchar,
  	"markdown_section_markdown_content" varchar NOT NULL,
  	"quotation_section_quote" varchar NOT NULL,
  	"quotation_section_author" varchar NOT NULL,
  	"quotation_section_image_id" integer NOT NULL,
  	"quotation_section_additional_image_id" integer,
  	"quotation_section_mobile_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "about_blocks_button" ADD CONSTRAINT "about_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_hero_banner_image_id_media_id_fk" FOREIGN KEY ("hero_banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_quotation_section_image_id_media_id_fk" FOREIGN KEY ("quotation_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_quotation_section_additional_image_id_media_id_fk" FOREIGN KEY ("quotation_section_additional_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_quotation_section_mobile_image_id_media_id_fk" FOREIGN KEY ("quotation_section_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "about_blocks_button_order_idx" ON "about_blocks_button" USING btree ("_order");
  CREATE INDEX "about_blocks_button_parent_id_idx" ON "about_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "about_blocks_button_path_idx" ON "about_blocks_button" USING btree ("_path");
  CREATE INDEX "about_hero_banner_image_idx" ON "about" USING btree ("hero_banner_image_id");
  CREATE INDEX "about_quotation_section_quotation_section_image_idx" ON "about" USING btree ("quotation_section_image_id");
  CREATE INDEX "about_quotation_section_quotation_section_additional_ima_idx" ON "about" USING btree ("quotation_section_additional_image_id");
  CREATE INDEX "about_quotation_section_quotation_section_mobile_image_idx" ON "about" USING btree ("quotation_section_mobile_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "about_blocks_button" CASCADE;
  DROP TABLE "about" CASCADE;`)
}
