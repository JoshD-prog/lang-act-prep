-- Add Nebraska in-state scholarship opportunities to the calculator.
-- These are score-influenced competitive rows, not guaranteed automatic ACT/GPA tiers.

begin;

update schools
set notes_short = 'Nebraska publishes scholarship ranges and holistic review rather than a fixed ACT/GPA ladder',
    scholarship_page_url = 'https://admissions.unl.edu/cost/scholarships/',
    last_updated = '2026-05-22',
    updated_at = now()
where slug = 'nebraska';

delete from scholarship_tiers
where school_id = (
    select id
    from schools
    where slug = 'nebraska'
  )
  and residency_rule_type = 'in_state'
  and tier_name in (
    'Chancellor''s Tuition Scholarship In-State',
    'Nebraska Career Scholarship',
    'David Distinguished Tuition Scholarship',
    'Nebraska Emerging Leaders Tuition Scholarship',
    'Nebraska Opportunity Scholarship'
  );

insert into scholarship_tiers (
  school_id,
  tier_name,
  tier_rank,
  min_unweighted_gpa,
  max_unweighted_gpa,
  min_act,
  max_act,
  annual_award_usd,
  years_assumed,
  residency_rule_type,
  eligible_states,
  regional_rule_note,
  requires_full_time,
  requires_separate_application,
  application_note,
  renewable,
  renewal_note,
  is_major_restricted,
  is_competitive,
  is_active,
  source_url,
  source_note,
  last_updated
)
select
  schools.id,
  rows.tier_name,
  rows.tier_rank::integer,
  rows.min_unweighted_gpa::numeric,
  rows.max_unweighted_gpa::numeric,
  rows.min_act::integer,
  rows.max_act::integer,
  rows.annual_award_usd::integer,
  rows.years_assumed::integer,
  rows.residency_rule_type,
  rows.eligible_states,
  rows.regional_rule_note,
  rows.requires_full_time::boolean,
  rows.requires_separate_application::boolean,
  rows.application_note,
  rows.renewable::boolean,
  rows.renewal_note,
  rows.is_major_restricted::boolean,
  rows.is_competitive::boolean,
  rows.is_active::boolean,
  rows.source_url,
  rows.source_note,
  rows.last_updated::date
from (
  values
  ('Chancellor''s Tuition Scholarship In-State', 3, null, null, null, null, 8000, 4, 'in_state', array['NE']::text[], null, true, false, null, true, null, false, true, true, 'https://admissions.unl.edu/cost/scholarships/chancellors-tuition-scholarship-in-state/', 'Score-influenced competitive scholarship; Nebraska publishes holistic review rather than a fixed automatic ladder', '2026-05-22'),
  ('Nebraska Career Scholarship', 4, null, null, null, null, 8000, 4, 'in_state', array['NE']::text[], null, true, false, null, true, null, false, true, true, 'https://admissions.unl.edu/cost/scholarships/', 'Score-influenced competitive scholarship; published value is minimum $8000 per year', '2026-05-22'),
  ('David Distinguished Tuition Scholarship', 5, null, null, null, null, 4000, 4, 'in_state', array['NE']::text[], null, true, false, null, true, null, false, true, true, 'https://admissions.unl.edu/cost/scholarships/', 'Score-influenced competitive scholarship; Nebraska publishes holistic review rather than a fixed automatic ladder', '2026-05-22'),
  ('Nebraska Emerging Leaders Tuition Scholarship', 6, null, null, null, null, 2000, 4, 'in_state', array['NE']::text[], null, true, false, null, true, null, false, true, true, 'https://admissions.unl.edu/cost/scholarships/', 'Score-influenced competitive scholarship; Nebraska publishes holistic review rather than a fixed automatic ladder', '2026-05-22'),
  ('Nebraska Opportunity Scholarship', 7, null, null, null, null, 1000, 4, 'in_state', array['NE']::text[], null, true, false, null, true, null, false, true, true, 'https://admissions.unl.edu/cost/scholarships/', 'Score-influenced competitive scholarship; Nebraska publishes holistic review rather than a fixed automatic ladder', '2026-05-22')
) as rows (
  tier_name,
  tier_rank,
  min_unweighted_gpa,
  max_unweighted_gpa,
  min_act,
  max_act,
  annual_award_usd,
  years_assumed,
  residency_rule_type,
  eligible_states,
  regional_rule_note,
  requires_full_time,
  requires_separate_application,
  application_note,
  renewable,
  renewal_note,
  is_major_restricted,
  is_competitive,
  is_active,
  source_url,
  source_note,
  last_updated
)
join schools on schools.slug = 'nebraska';

commit;
