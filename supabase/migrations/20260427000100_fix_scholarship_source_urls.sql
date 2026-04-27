update scholarship_tiers st
set
  source_url = updates.source_url,
  updated_at = now()
from (
  values
    ('k-state', 'https://www.k-state.edu/sfa/scholarships/'),
    ('missouri-s-and-t', 'https://sfs.mst.edu/financialaid/typesofaid/scholarships/freshmen/automaticscholarships/merit-based/'),
    ('northwest-missouri-state', 'https://www.nwmissouri.edu/finaid/aid/scholarships/freshman.htm'),
    ('pitt-state', 'https://www.pittstate.edu/admission/great-gorilla-scholarships.html'),
    ('mizzou', 'https://financialaid.missouri.edu/scholarships/freshmen-ftc/'),
    ('umkc', 'https://finaid.umkc.edu/financial-aid/scholarships/first-time-college-student.html'),
    ('wichita-state', 'https://www.wichita.edu/administration/financial_aid/scholarships/merit/Freshmen_merit.php')
) as updates(school_slug, source_url)
join schools s on s.slug = updates.school_slug
where st.school_id = s.id;
