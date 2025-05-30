DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
      FROM pg_type t
      JOIN pg_namespace n ON n.oid = t.typnamespace
     WHERE n.nspname = 'public'
       AND t.typname = 'role'
  ) THEN
    CREATE TYPE "public"."role" AS ENUM('admin', 'user', 'superadmin');
  END IF;
END
$$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_items" (
	"oiid" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "order_items_oiid_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"order_id" integer NOT NULL,
	"product_id" varchar(255) NOT NULL,
	"quantity" integer NOT NULL,
	"price_per_unit" double precision NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"oid" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "orders_oid_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"status" varchar(50) DEFAULT 'new' NOT NULL,
	"user_id" serial NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"pid" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"description" text,
	"price" double precision,
	"image" varchar(1000),
	"quantity" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(256) NOT NULL,
	"lastname" varchar(256),
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"address" text,
	"phone" varchar(256),
	"role" "role" DEFAULT 'user' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_oid_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("oid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_pid_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("pid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;