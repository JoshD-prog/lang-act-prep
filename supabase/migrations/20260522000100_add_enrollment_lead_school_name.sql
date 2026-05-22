alter table enrollment_leads
add column if not exists high_school_slug text,
add column if not exists high_school_name text;

create index if not exists idx_enrollment_high_school_slug
on enrollment_leads (high_school_slug);
