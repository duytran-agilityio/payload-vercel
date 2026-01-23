import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_bunker_comparison_table_body_battalion_bunker" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum_bunker_comparison_table_body_legacy_storage" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum_bunker_comparison_table_body_home_storage" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum_bunker_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__bunker_v_version_comparison_table_body_battalion_bunker" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum__bunker_v_version_comparison_table_body_legacy_storage" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum__bunker_v_version_comparison_table_body_home_storage" AS ENUM('Yes', 'No');
  CREATE TYPE "public"."enum__bunker_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_ira_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__ira_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_service_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__service_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_menu_items_childrens_sub_items_target" AS ENUM('_self', '_blank', '_parent', '_top');
  CREATE TYPE "public"."enum_menu_items_childrens_target" AS ENUM('_self', '_blank', '_parent', '_top');
  CREATE TYPE "public"."enum_menu_items_target" AS ENUM('_self', '_blank', '_parent', '_top');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"location" varchar DEFAULT 'Media Library' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_small_url" varchar,
  	"sizes_small_width" numeric,
  	"sizes_small_height" numeric,
  	"sizes_small_mime_type" varchar,
  	"sizes_small_filesize" numeric,
  	"sizes_small_filename" varchar,
  	"sizes_medium_url" varchar,
  	"sizes_medium_width" numeric,
  	"sizes_medium_height" numeric,
  	"sizes_medium_mime_type" varchar,
  	"sizes_medium_filesize" numeric,
  	"sizes_medium_filename" varchar,
  	"sizes_large_url" varchar,
  	"sizes_large_width" numeric,
  	"sizes_large_height" numeric,
  	"sizes_large_mime_type" varchar,
  	"sizes_large_filesize" numeric,
  	"sizes_large_filename" varchar
  );
  
  CREATE TABLE "pages_blocks_markdown_with_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer_markdown" varchar
  );
  
  CREATE TABLE "pages_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"link" varchar,
  	"hide_from_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_pages_v_blocks_markdown_with_title" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"content" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer_markdown" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_link" varchar,
  	"version_hide_from_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "global_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer NOT NULL,
  	"mask_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
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
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading_heading" varchar NOT NULL,
  	"heading_description" varchar NOT NULL,
  	"contact_details" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
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
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_markdown_with_title" ADD CONSTRAINT "pages_blocks_markdown_with_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_questions" ADD CONSTRAINT "pages_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq" ADD CONSTRAINT "pages_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_markdown_with_title" ADD CONSTRAINT "_pages_v_blocks_markdown_with_title_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_questions" ADD CONSTRAINT "_pages_v_blocks_faq_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq" ADD CONSTRAINT "_pages_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "global_info" ADD CONSTRAINT "global_info_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "global_info" ADD CONSTRAINT "global_info_mask_image_id_media_id_fk" FOREIGN KEY ("mask_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about_blocks_button" ADD CONSTRAINT "about_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_hero_banner_image_id_media_id_fk" FOREIGN KEY ("hero_banner_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_quotation_section_image_id_media_id_fk" FOREIGN KEY ("quotation_section_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_quotation_section_additional_image_id_media_id_fk" FOREIGN KEY ("quotation_section_additional_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "about" ADD CONSTRAINT "about_quotation_section_mobile_image_id_media_id_fk" FOREIGN KEY ("quotation_section_mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "consultation_heading_link_card" ADD CONSTRAINT "consultation_heading_link_card_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "consultation_heading_link_card" ADD CONSTRAINT "consultation_heading_link_card_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consultation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "consultation_information_items" ADD CONSTRAINT "consultation_information_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consultation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_menu_columns_items" ADD CONSTRAINT "footer_menu_columns_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_menu_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_menu_columns" ADD CONSTRAINT "footer_menu_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "menu_items_childrens_sub_items" ADD CONSTRAINT "menu_items_childrens_sub_items_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_childrens_sub_items" ADD CONSTRAINT "menu_items_childrens_sub_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items_childrens"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_childrens" ADD CONSTRAINT "menu_items_childrens_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items_childrens" ADD CONSTRAINT "menu_items_childrens_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_custom_image_id_media_id_fk" FOREIGN KEY ("custom_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "menu_items" ADD CONSTRAINT "menu_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_small_sizes_small_filename_idx" ON "media" USING btree ("sizes_small_filename");
  CREATE INDEX "media_sizes_medium_sizes_medium_filename_idx" ON "media" USING btree ("sizes_medium_filename");
  CREATE INDEX "media_sizes_large_sizes_large_filename_idx" ON "media" USING btree ("sizes_large_filename");
  CREATE INDEX "pages_blocks_markdown_with_title_order_idx" ON "pages_blocks_markdown_with_title" USING btree ("_order");
  CREATE INDEX "pages_blocks_markdown_with_title_parent_id_idx" ON "pages_blocks_markdown_with_title" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_markdown_with_title_path_idx" ON "pages_blocks_markdown_with_title" USING btree ("_path");
  CREATE INDEX "pages_blocks_faq_questions_order_idx" ON "pages_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_questions_parent_id_idx" ON "pages_blocks_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_order_idx" ON "pages_blocks_faq" USING btree ("_order");
  CREATE INDEX "pages_blocks_faq_parent_id_idx" ON "pages_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_faq_path_idx" ON "pages_blocks_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_link_idx" ON "pages" USING btree ("link");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "pages__status_idx" ON "pages" USING btree ("_status");
  CREATE INDEX "_pages_v_blocks_markdown_with_title_order_idx" ON "_pages_v_blocks_markdown_with_title" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_markdown_with_title_parent_id_idx" ON "_pages_v_blocks_markdown_with_title" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_markdown_with_title_path_idx" ON "_pages_v_blocks_markdown_with_title" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_faq_questions_order_idx" ON "_pages_v_blocks_faq_questions" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_questions_parent_id_idx" ON "_pages_v_blocks_faq_questions" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_order_idx" ON "_pages_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_faq_parent_id_idx" ON "_pages_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_faq_path_idx" ON "_pages_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_link_idx" ON "_pages_v" USING btree ("version_link");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_version_version__status_idx" ON "_pages_v" USING btree ("version__status");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE INDEX "_pages_v_latest_idx" ON "_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "global_info_logo_idx" ON "global_info" USING btree ("logo_id");
  CREATE INDEX "global_info_mask_image_idx" ON "global_info" USING btree ("mask_image_id");
  CREATE INDEX "about_blocks_button_order_idx" ON "about_blocks_button" USING btree ("_order");
  CREATE INDEX "about_blocks_button_parent_id_idx" ON "about_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "about_blocks_button_path_idx" ON "about_blocks_button" USING btree ("_path");
  CREATE INDEX "about_hero_banner_image_idx" ON "about" USING btree ("hero_banner_image_id");
  CREATE INDEX "about_quotation_section_quotation_section_image_idx" ON "about" USING btree ("quotation_section_image_id");
  CREATE INDEX "about_quotation_section_quotation_section_additional_ima_idx" ON "about" USING btree ("quotation_section_additional_image_id");
  CREATE INDEX "about_quotation_section_quotation_section_mobile_image_idx" ON "about" USING btree ("quotation_section_mobile_image_id");
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
  CREATE INDEX "_bunker_v_latest_idx" ON "_bunker_v" USING btree ("latest");
  CREATE INDEX "consultation_heading_link_card_order_idx" ON "consultation_heading_link_card" USING btree ("_order");
  CREATE INDEX "consultation_heading_link_card_parent_id_idx" ON "consultation_heading_link_card" USING btree ("_parent_id");
  CREATE INDEX "consultation_heading_link_card_image_idx" ON "consultation_heading_link_card" USING btree ("image_id");
  CREATE INDEX "consultation_information_items_order_idx" ON "consultation_information_items" USING btree ("_order");
  CREATE INDEX "consultation_information_items_parent_id_idx" ON "consultation_information_items" USING btree ("_parent_id");
  CREATE INDEX "footer_menu_columns_items_order_idx" ON "footer_menu_columns_items" USING btree ("_order");
  CREATE INDEX "footer_menu_columns_items_parent_id_idx" ON "footer_menu_columns_items" USING btree ("_parent_id");
  CREATE INDEX "footer_menu_columns_order_idx" ON "footer_menu_columns" USING btree ("_order");
  CREATE INDEX "footer_menu_columns_parent_id_idx" ON "footer_menu_columns" USING btree ("_parent_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
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
  CREATE INDEX "homepage_comparison_comparison_background_image_idx" ON "homepage" USING btree ("comparison_background_image_id");
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
  CREATE INDEX "_ira_v_latest_idx" ON "_ira_v" USING btree ("latest");
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
  CREATE INDEX "_service_v_latest_idx" ON "_service_v" USING btree ("latest");
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
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "pages_blocks_markdown_with_title" CASCADE;
  DROP TABLE "pages_blocks_faq_questions" CASCADE;
  DROP TABLE "pages_blocks_faq" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "_pages_v_blocks_markdown_with_title" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_questions" CASCADE;
  DROP TABLE "_pages_v_blocks_faq" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "global_info" CASCADE;
  DROP TABLE "about_blocks_button" CASCADE;
  DROP TABLE "about" CASCADE;
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
  DROP TABLE "consultation_heading_link_card" CASCADE;
  DROP TABLE "consultation_information_items" CASCADE;
  DROP TABLE "consultation" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "footer_menu_columns_items" CASCADE;
  DROP TABLE "footer_menu_columns" CASCADE;
  DROP TABLE "footer" CASCADE;
  DROP TABLE "homepage_blocks_button" CASCADE;
  DROP TABLE "homepage_hero_checklist" CASCADE;
  DROP TABLE "homepage_company_info_title" CASCADE;
  DROP TABLE "homepage_company_info_slider_items" CASCADE;
  DROP TABLE "homepage_how_it_works_list" CASCADE;
  DROP TABLE "homepage_comparison_battalion_pros" CASCADE;
  DROP TABLE "homepage_comparison_other_cons" CASCADE;
  DROP TABLE "homepage" CASCADE;
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
  DROP TABLE "menu_items_childrens_sub_items" CASCADE;
  DROP TABLE "menu_items_childrens" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  DROP TABLE "menu" CASCADE;
  DROP TYPE "public"."enum_pages_status";
  DROP TYPE "public"."enum__pages_v_version_status";
  DROP TYPE "public"."enum_bunker_comparison_table_body_battalion_bunker";
  DROP TYPE "public"."enum_bunker_comparison_table_body_legacy_storage";
  DROP TYPE "public"."enum_bunker_comparison_table_body_home_storage";
  DROP TYPE "public"."enum_bunker_status";
  DROP TYPE "public"."enum__bunker_v_version_comparison_table_body_battalion_bunker";
  DROP TYPE "public"."enum__bunker_v_version_comparison_table_body_legacy_storage";
  DROP TYPE "public"."enum__bunker_v_version_comparison_table_body_home_storage";
  DROP TYPE "public"."enum__bunker_v_version_status";
  DROP TYPE "public"."enum_ira_status";
  DROP TYPE "public"."enum__ira_v_version_status";
  DROP TYPE "public"."enum_service_status";
  DROP TYPE "public"."enum__service_v_version_status";
  DROP TYPE "public"."enum_menu_items_childrens_sub_items_target";
  DROP TYPE "public"."enum_menu_items_childrens_target";
  DROP TYPE "public"."enum_menu_items_target";`)
}
