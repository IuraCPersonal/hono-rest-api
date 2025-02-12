ALTER TABLE "cars" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "cars" ADD COLUMN "year" numeric;