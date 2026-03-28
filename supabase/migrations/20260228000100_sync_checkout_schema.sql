alter table class_offerings
add column if not exists location text,
add column if not exists start_date date,
add column if not exists stripe_price_id text;

alter table enrollment_leads
add column if not exists payment_status text not null default 'pending',
add column if not exists stripe_session_id text,
add column if not exists stripe_payment_intent_id text,
add column if not exists paid_at timestamptz;

create index if not exists idx_class_offerings_start_date on class_offerings (start_date);
create index if not exists idx_enrollment_leads_payment_status on enrollment_leads (payment_status);
create index if not exists idx_enrollment_leads_stripe_session_id on enrollment_leads (stripe_session_id);
