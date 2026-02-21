-- Contact inquiry capture for lead generation and follow-up.

create table if not exists contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  student_grade text,
  student_school text,
  interest text,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_inquiries_email on contact_inquiries (email);
create index if not exists idx_contact_inquiries_created_at on contact_inquiries (created_at desc);

alter table contact_inquiries enable row level security;

-- No public policy: inserts are intended to occur via server-side service role.
