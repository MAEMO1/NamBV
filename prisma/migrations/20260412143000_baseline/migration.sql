-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERADMIN', 'ADMIN');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('NEW', 'CONTACTED', 'SITE_VISIT', 'QUOTE_SENT', 'NEGOTIATING', 'WON', 'LOST', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BudgetRange" AS ENUM ('UNDER_10K', 'RANGE_10K_25K', 'RANGE_25K_50K', 'RANGE_50K_100K', 'OVER_100K', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING', 'CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED', 'REJECTED', 'NO_SHOW');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "last_login" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,

    CONSTRAINT "service_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "property_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "property_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_requests" (
    "id" TEXT NOT NULL,
    "reference_number" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'NEW',
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT,
    "street_address" TEXT,
    "description" TEXT NOT NULL,
    "preferred_start" TEXT,
    "budget_range" "BudgetRange",
    "gdpr_consent" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "converted_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "property_type_id" TEXT,
    "assigned_to" TEXT,

    CONSTRAINT "quote_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_service_selections" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quote_id" TEXT NOT NULL,
    "service_type_id" TEXT NOT NULL,

    CONSTRAINT "quote_service_selections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_photos" (
    "id" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_size" INTEGER NOT NULL,
    "mime_type" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quote_id" TEXT NOT NULL,

    CONSTRAINT "quote_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_notes" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "quote_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "quote_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_status_history" (
    "id" TEXT NOT NULL,
    "from_status" "QuoteStatus",
    "to_status" "QuoteStatus" NOT NULL,
    "reason" TEXT,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quote_id" TEXT NOT NULL,
    "changed_by" TEXT NOT NULL,

    CONSTRAINT "quote_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_availability" (
    "id" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "time_slots" TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointment_availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointment_blocked_dates" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "blocked_times" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "appointment_blocked_dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "reference_number" TEXT NOT NULL,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "gemeente" TEXT NOT NULL,
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "appointment_time" TEXT NOT NULL,
    "proposed_date" TIMESTAMP(3),
    "proposed_time" TEXT,
    "admin_notes" TEXT,
    "rejection_reason" TEXT,
    "project_type" TEXT,
    "property_type" TEXT,
    "property_age" TEXT,
    "priorities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "material_preference" TEXT,
    "budget" TEXT,
    "timing" TEXT,
    "subsidy_interest" BOOLEAN NOT NULL DEFAULT false,
    "payment_spread" BOOLEAN NOT NULL DEFAULT false,
    "motivation" TEXT,
    "message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "confirmed_at" TIMESTAMP(3),

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_views" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "visitor_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "user_agent" TEXT,
    "device_type" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "country" TEXT,
    "city" TEXT,
    "utm_source" TEXT,
    "utm_medium" TEXT,
    "utm_campaign" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "page_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "analytics_events" (
    "id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_data" JSONB,
    "path" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "session_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_stats" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "page_views" INTEGER NOT NULL DEFAULT 0,
    "unique_visitors" INTEGER NOT NULL DEFAULT 0,
    "sessions" INTEGER NOT NULL DEFAULT 0,
    "avg_session_duration" INTEGER NOT NULL DEFAULT 0,
    "bounce_rate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quote_requests" INTEGER NOT NULL DEFAULT 0,
    "appointments" INTEGER NOT NULL DEFAULT 0,
    "desktop_visits" INTEGER NOT NULL DEFAULT 0,
    "mobile_visits" INTEGER NOT NULL DEFAULT 0,
    "tablet_visits" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "short_description" TEXT,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "challenge_text" TEXT,
    "approach_text" TEXT,
    "result_text" TEXT,
    "project_type" TEXT,
    "duration" TEXT,
    "surface" TEXT,
    "completion_date" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "main_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_images" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "caption" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_before" BOOLEAN NOT NULL DEFAULT false,
    "is_after" BOOLEAN NOT NULL DEFAULT false,
    "project_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "project_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'string',
    "category" TEXT NOT NULL DEFAULT 'general',
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_blocks" (
    "id" TEXT NOT NULL,
    "page" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'text',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media_files" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "alt" TEXT,
    "folder" TEXT NOT NULL DEFAULT '/',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "media_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_admin_users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "v2_admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_admin_sessions" (
    "id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invalidated_at" TIMESTAMP(3),
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "v2_admin_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_login_attempts" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ip_address" TEXT,
    "was_successful" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "v2_login_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_submission_attempts" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "email" TEXT,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "was_accepted" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "v2_submission_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_sequence_counters" (
    "key" TEXT NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "v2_sequence_counters_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "v2_quote_requests" (
    "id" TEXT NOT NULL,
    "reference_number" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL DEFAULT 'NEW',
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "city" TEXT,
    "description" TEXT NOT NULL,
    "preferred_start" TEXT,
    "budget_range" "BudgetRange",
    "gdpr_consent" BOOLEAN NOT NULL DEFAULT false,
    "admin_notes" TEXT,
    "property_type_id" TEXT,
    "service_type_ids" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "v2_quote_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_appointments" (
    "id" TEXT NOT NULL,
    "reference_number" TEXT NOT NULL,
    "active_slot_key" TEXT,
    "status" "AppointmentStatus" NOT NULL DEFAULT 'PENDING',
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "appointment_date" DATE NOT NULL,
    "appointment_time" TEXT NOT NULL,
    "project_type" TEXT,
    "property_type" TEXT,
    "property_age" TEXT,
    "priorities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "material_preference" TEXT,
    "budget" TEXT,
    "timing" TEXT,
    "subsidy_interest" BOOLEAN NOT NULL DEFAULT false,
    "payment_spread" BOOLEAN NOT NULL DEFAULT false,
    "motivation" TEXT,
    "message" TEXT,
    "admin_notes" TEXT,
    "proposed_date" DATE,
    "proposed_time" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "confirmed_at" TIMESTAMP(3),

    CONSTRAINT "v2_appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_availability_rules" (
    "id" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "time_slots" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "v2_availability_rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_availability_exceptions" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "blocked_times" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "v2_availability_exceptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_page_sections" (
    "id" TEXT NOT NULL,
    "page_key" TEXT NOT NULL,
    "section_key" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "schema_key" TEXT NOT NULL,
    "data_json" JSONB NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "v2_page_sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_projects" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "cover_image_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "v2_projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_project_translations" (
    "id" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "short_description" TEXT,
    "description" TEXT,
    "challenge_text" TEXT,
    "approach_text" TEXT,
    "result_text" TEXT,
    "project_type" TEXT,
    "duration" TEXT,
    "surface" TEXT,
    "completion_date" TEXT,
    "seo_title" TEXT,
    "seo_description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "v2_project_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_project_images" (
    "id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "alt" TEXT,
    "caption" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "kind" TEXT NOT NULL DEFAULT 'gallery',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "project_id" TEXT NOT NULL,

    CONSTRAINT "v2_project_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_assets" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "original_name" TEXT NOT NULL,
    "mime_type" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "bucket" TEXT NOT NULL DEFAULT 'project-photos',
    "path" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "alt" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "v2_assets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_site_settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value_json" JSONB NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'general',
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "v2_site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_lead_events" (
    "id" TEXT NOT NULL,
    "lead_type" TEXT NOT NULL,
    "lead_id" TEXT NOT NULL,
    "event_type" TEXT NOT NULL,
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "quote_id" TEXT,
    "appointment_id" TEXT,

    CONSTRAINT "v2_lead_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "v2_audit_events" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "payload" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actor_id" TEXT,

    CONSTRAINT "v2_audit_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "service_types_slug_key" ON "service_types"("slug");

-- CreateIndex
CREATE INDEX "service_types_is_active_sort_order_idx" ON "service_types"("is_active", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "property_types_slug_key" ON "property_types"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "quote_requests_reference_number_key" ON "quote_requests"("reference_number");

-- CreateIndex
CREATE INDEX "quote_requests_status_idx" ON "quote_requests"("status");

-- CreateIndex
CREATE INDEX "quote_requests_created_at_idx" ON "quote_requests"("created_at" DESC);

-- CreateIndex
CREATE INDEX "quote_requests_postal_code_idx" ON "quote_requests"("postal_code");

-- CreateIndex
CREATE INDEX "quote_requests_assigned_to_idx" ON "quote_requests"("assigned_to");

-- CreateIndex
CREATE INDEX "quote_requests_deleted_at_idx" ON "quote_requests"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "quote_service_selections_quote_id_service_type_id_key" ON "quote_service_selections"("quote_id", "service_type_id");

-- CreateIndex
CREATE INDEX "quote_photos_quote_id_idx" ON "quote_photos"("quote_id");

-- CreateIndex
CREATE INDEX "quote_notes_quote_id_created_at_idx" ON "quote_notes"("quote_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "quote_status_history_quote_id_changed_at_idx" ON "quote_status_history"("quote_id", "changed_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "appointment_availability_day_of_week_key" ON "appointment_availability"("day_of_week");

-- CreateIndex
CREATE INDEX "appointment_blocked_dates_date_idx" ON "appointment_blocked_dates"("date");

-- CreateIndex
CREATE UNIQUE INDEX "appointment_blocked_dates_date_key" ON "appointment_blocked_dates"("date");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_reference_number_key" ON "appointments"("reference_number");

-- CreateIndex
CREATE INDEX "appointments_status_idx" ON "appointments"("status");

-- CreateIndex
CREATE INDEX "appointments_appointment_date_idx" ON "appointments"("appointment_date");

-- CreateIndex
CREATE INDEX "appointments_created_at_idx" ON "appointments"("created_at" DESC);

-- CreateIndex
CREATE INDEX "page_views_path_idx" ON "page_views"("path");

-- CreateIndex
CREATE INDEX "page_views_visitor_id_idx" ON "page_views"("visitor_id");

-- CreateIndex
CREATE INDEX "page_views_session_id_idx" ON "page_views"("session_id");

-- CreateIndex
CREATE INDEX "page_views_created_at_idx" ON "page_views"("created_at");

-- CreateIndex
CREATE INDEX "page_views_created_at_path_idx" ON "page_views"("created_at", "path");

-- CreateIndex
CREATE INDEX "analytics_events_event_type_event_name_idx" ON "analytics_events"("event_type", "event_name");

-- CreateIndex
CREATE INDEX "analytics_events_visitor_id_idx" ON "analytics_events"("visitor_id");

-- CreateIndex
CREATE INDEX "analytics_events_created_at_idx" ON "analytics_events"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "daily_stats_date_key" ON "daily_stats"("date");

-- CreateIndex
CREATE INDEX "daily_stats_date_idx" ON "daily_stats"("date");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_is_published_sort_order_idx" ON "projects"("is_published", "sort_order");

-- CreateIndex
CREATE INDEX "projects_featured_idx" ON "projects"("featured");

-- CreateIndex
CREATE INDEX "projects_category_idx" ON "projects"("category");

-- CreateIndex
CREATE INDEX "project_images_project_id_sort_order_idx" ON "project_images"("project_id", "sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

-- CreateIndex
CREATE INDEX "settings_category_idx" ON "settings"("category");

-- CreateIndex
CREATE INDEX "content_blocks_page_idx" ON "content_blocks"("page");

-- CreateIndex
CREATE UNIQUE INDEX "content_blocks_page_section_key_key" ON "content_blocks"("page", "section", "key");

-- CreateIndex
CREATE INDEX "media_files_folder_idx" ON "media_files"("folder");

-- CreateIndex
CREATE INDEX "media_files_mime_type_idx" ON "media_files"("mime_type");

-- CreateIndex
CREATE INDEX "media_files_created_at_idx" ON "media_files"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "v2_admin_users_email_key" ON "v2_admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "v2_admin_sessions_token_hash_key" ON "v2_admin_sessions"("token_hash");

-- CreateIndex
CREATE INDEX "v2_admin_sessions_user_id_idx" ON "v2_admin_sessions"("user_id");

-- CreateIndex
CREATE INDEX "v2_admin_sessions_expires_at_idx" ON "v2_admin_sessions"("expires_at");

-- CreateIndex
CREATE INDEX "v2_admin_sessions_invalidated_at_idx" ON "v2_admin_sessions"("invalidated_at");

-- CreateIndex
CREATE INDEX "v2_login_attempts_email_created_at_idx" ON "v2_login_attempts"("email", "created_at" DESC);

-- CreateIndex
CREATE INDEX "v2_login_attempts_ip_address_created_at_idx" ON "v2_login_attempts"("ip_address", "created_at" DESC);

-- CreateIndex
CREATE INDEX "v2_submission_attempts_kind_created_at_idx" ON "v2_submission_attempts"("kind", "created_at" DESC);

-- CreateIndex
CREATE INDEX "v2_submission_attempts_kind_email_created_at_idx" ON "v2_submission_attempts"("kind", "email", "created_at" DESC);

-- CreateIndex
CREATE INDEX "v2_submission_attempts_kind_ip_address_created_at_idx" ON "v2_submission_attempts"("kind", "ip_address", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "v2_quote_requests_reference_number_key" ON "v2_quote_requests"("reference_number");

-- CreateIndex
CREATE INDEX "v2_quote_requests_status_idx" ON "v2_quote_requests"("status");

-- CreateIndex
CREATE INDEX "v2_quote_requests_created_at_idx" ON "v2_quote_requests"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "v2_appointments_reference_number_key" ON "v2_appointments"("reference_number");

-- CreateIndex
CREATE UNIQUE INDEX "v2_appointments_active_slot_key_key" ON "v2_appointments"("active_slot_key");

-- CreateIndex
CREATE INDEX "v2_appointments_status_idx" ON "v2_appointments"("status");

-- CreateIndex
CREATE INDEX "v2_appointments_appointment_date_idx" ON "v2_appointments"("appointment_date");

-- CreateIndex
CREATE INDEX "v2_appointments_created_at_idx" ON "v2_appointments"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "v2_availability_rules_day_of_week_key" ON "v2_availability_rules"("day_of_week");

-- CreateIndex
CREATE INDEX "v2_availability_exceptions_date_idx" ON "v2_availability_exceptions"("date");

-- CreateIndex
CREATE UNIQUE INDEX "v2_availability_exceptions_date_key" ON "v2_availability_exceptions"("date");

-- CreateIndex
CREATE INDEX "v2_page_sections_page_key_locale_idx" ON "v2_page_sections"("page_key", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "v2_page_sections_page_key_section_key_locale_display_order_key" ON "v2_page_sections"("page_key", "section_key", "locale", "display_order");

-- CreateIndex
CREATE UNIQUE INDEX "v2_projects_slug_key" ON "v2_projects"("slug");

-- CreateIndex
CREATE INDEX "v2_projects_is_published_sort_order_idx" ON "v2_projects"("is_published", "sort_order");

-- CreateIndex
CREATE INDEX "v2_projects_featured_idx" ON "v2_projects"("featured");

-- CreateIndex
CREATE INDEX "v2_project_translations_locale_idx" ON "v2_project_translations"("locale");

-- CreateIndex
CREATE UNIQUE INDEX "v2_project_translations_project_id_locale_key" ON "v2_project_translations"("project_id", "locale");

-- CreateIndex
CREATE INDEX "v2_project_images_project_id_sort_order_idx" ON "v2_project_images"("project_id", "sort_order");

-- CreateIndex
CREATE INDEX "v2_assets_bucket_idx" ON "v2_assets"("bucket");

-- CreateIndex
CREATE INDEX "v2_assets_created_at_idx" ON "v2_assets"("created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "v2_site_settings_key_key" ON "v2_site_settings"("key");

-- CreateIndex
CREATE INDEX "v2_site_settings_category_idx" ON "v2_site_settings"("category");

-- CreateIndex
CREATE INDEX "v2_lead_events_lead_type_created_at_idx" ON "v2_lead_events"("lead_type", "created_at" DESC);

-- CreateIndex
CREATE INDEX "v2_lead_events_event_type_created_at_idx" ON "v2_lead_events"("event_type", "created_at" DESC);

-- CreateIndex
CREATE INDEX "v2_audit_events_action_created_at_idx" ON "v2_audit_events"("action", "created_at" DESC);

-- CreateIndex
CREATE INDEX "v2_audit_events_entity_type_created_at_idx" ON "v2_audit_events"("entity_type", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "service_types" ADD CONSTRAINT "service_types_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_property_type_id_fkey" FOREIGN KEY ("property_type_id") REFERENCES "property_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_requests" ADD CONSTRAINT "quote_requests_assigned_to_fkey" FOREIGN KEY ("assigned_to") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_service_selections" ADD CONSTRAINT "quote_service_selections_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_service_selections" ADD CONSTRAINT "quote_service_selections_service_type_id_fkey" FOREIGN KEY ("service_type_id") REFERENCES "service_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_photos" ADD CONSTRAINT "quote_photos_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_notes" ADD CONSTRAINT "quote_notes_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_notes" ADD CONSTRAINT "quote_notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_status_history" ADD CONSTRAINT "quote_status_history_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_status_history" ADD CONSTRAINT "quote_status_history_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "v2_admin_sessions" ADD CONSTRAINT "v2_admin_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "v2_admin_users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "v2_project_translations" ADD CONSTRAINT "v2_project_translations_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "v2_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "v2_project_images" ADD CONSTRAINT "v2_project_images_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "v2_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "v2_lead_events" ADD CONSTRAINT "v2_lead_events_quote_id_fkey" FOREIGN KEY ("quote_id") REFERENCES "v2_quote_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "v2_lead_events" ADD CONSTRAINT "v2_lead_events_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "v2_appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "v2_audit_events" ADD CONSTRAINT "v2_audit_events_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "v2_admin_users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

