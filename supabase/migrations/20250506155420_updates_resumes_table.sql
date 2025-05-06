alter table "public"."resumes" alter column "attachments" set data type jsonb[] using "attachments"::jsonb[];

alter table "public"."resumes" alter column "id" set default gen_random_uuid();

alter table "public"."resumes" alter column "id" drop identity;

alter table "public"."resumes" alter column "id" set data type uuid using "id"::uuid;


