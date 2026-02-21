alter table contact_inquiries
add column if not exists reviewed boolean not null default false;
