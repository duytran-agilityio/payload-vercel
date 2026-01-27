import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "consultation_heading_link_card" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"description" varchar NOT NULL,
  	"link" varchar NOT NULL,
  	"link_title" varchar DEFAULT 'Learn More'
  );
  
  CREATE TABLE "consultation_information_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "consultation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_page_header_subtitle" varchar NOT NULL,
  	"heading_page_header_title" varchar NOT NULL,
  	"heading_page_header_description" varchar,
  	"information_title" varchar,
  	"information_description" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "consultation_heading_link_card" ADD CONSTRAINT "consultation_heading_link_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "consultation_heading_link_card" ADD CONSTRAINT "consultation_heading_link_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consultation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consultation_information_items" ADD CONSTRAINT "consultation_information_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consultation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "consultation_heading_link_card_order_idx" ON "consultation_heading_link_card" USING btree ("_order");
  CREATE INDEX "consultation_heading_link_card_parent_id_idx" ON "consultation_heading_link_card" USING btree ("_parent_id");
  CREATE INDEX "consultation_heading_link_card_image_idx" ON "consultation_heading_link_card" USING btree ("image_id");
  CREATE INDEX "consultation_information_items_order_idx" ON "consultation_information_items" USING btree ("_order");
  CREATE INDEX "consultation_information_items_parent_id_idx" ON "consultation_information_items" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "consultation_heading_link_card" CASCADE;
  DROP TABLE "consultation_information_items" CASCADE;
  DROP TABLE "consultation" CASCADE;`)
}
