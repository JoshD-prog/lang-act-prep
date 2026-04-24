alter table enrollment_leads
add column if not exists heard_about_us text;

alter table contact_inquiries
add column if not exists heard_about_us text;
