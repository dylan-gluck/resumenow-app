alter table "public"."resumes" add column "company" text not null;

alter table "public"."resumes" add column "job_data" jsonb;

alter table "public"."resumes" add column "job_url" text;

alter table "public"."resumes" add column "title" text not null;

create policy "Enable update for users based on user_id"
on "public"."profiles"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));



