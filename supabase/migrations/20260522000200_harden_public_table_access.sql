-- Harden public-schema API access.
-- The SvelteKit app reads and writes Supabase from server routes with the service role.
-- Browser clients do not need direct anon/authenticated table access.

begin;

alter table public.class_offerings enable row level security;
alter table public.cms_pages enable row level security;
alter table public.cms_sections enable row level security;
alter table public.college_scholarship_tiers enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.enrollment_leads enable row level security;
alter table public.high_schools enable row level security;
alter table public.schools enable row level security;
alter table public.scholarship_tiers enable row level security;
alter table public.scholarship_tiers_import enable row level security;

drop policy if exists "public read class_offerings" on public.class_offerings;
drop policy if exists "public read cms pages" on public.cms_pages;
drop policy if exists "public read cms sections" on public.cms_sections;
drop policy if exists "public read high schools" on public.high_schools;
drop policy if exists "public read schools" on public.schools;
drop policy if exists "public read scholarship tiers" on public.college_scholarship_tiers;

revoke all on table public.class_offerings from anon, authenticated;
revoke all on table public.cms_pages from anon, authenticated;
revoke all on table public.cms_sections from anon, authenticated;
revoke all on table public.college_scholarship_tiers from anon, authenticated;
revoke all on table public.contact_inquiries from anon, authenticated;
revoke all on table public.enrollment_leads from anon, authenticated;
revoke all on table public.high_schools from anon, authenticated;
revoke all on table public.schools from anon, authenticated;
revoke all on table public.scholarship_tiers from anon, authenticated;
revoke all on table public.scholarship_tiers_import from anon, authenticated;
revoke all on table public.scholarship_tiers_with_school from anon, authenticated;

grant select, insert, update, delete on table public.class_offerings to service_role;
grant select, insert, update, delete on table public.cms_pages to service_role;
grant select, insert, update, delete on table public.cms_sections to service_role;
grant select, insert, update, delete on table public.college_scholarship_tiers to service_role;
grant select, insert, update, delete on table public.contact_inquiries to service_role;
grant select, insert, update, delete on table public.enrollment_leads to service_role;
grant select, insert, update, delete on table public.high_schools to service_role;
grant select, insert, update, delete on table public.schools to service_role;
grant select, insert, update, delete on table public.scholarship_tiers to service_role;
grant select, insert, update, delete on table public.scholarship_tiers_import to service_role;
grant select on table public.scholarship_tiers_with_school to service_role;

commit;
