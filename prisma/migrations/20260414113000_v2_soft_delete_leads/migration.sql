ALTER TABLE "v2_quote_requests"
ADD COLUMN "deleted_at" TIMESTAMP(3);

CREATE INDEX "v2_quote_requests_deleted_at_idx"
ON "v2_quote_requests"("deleted_at");

ALTER TABLE "v2_appointments"
ADD COLUMN "deleted_at" TIMESTAMP(3);

CREATE INDEX "v2_appointments_deleted_at_idx"
ON "v2_appointments"("deleted_at");
