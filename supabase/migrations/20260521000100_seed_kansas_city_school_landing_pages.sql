-- Seed Kansas City-area high school landing page rows without touching the scholarship calculator schools table.

create table if not exists high_schools (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  district text,
  hero_image_url text not null,
  short_pitch text not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_high_schools_slug on high_schools (slug);

alter table high_schools enable row level security;

drop policy if exists "public read high schools" on high_schools;
create policy "public read high schools"
on high_schools for select
using (true);

insert into high_schools (slug, name, district, hero_image_url, short_pitch)
    values
      ('basehor-linwood-high-school', 'Basehor-Linwood High School', 'Basehor-Linwood USD 458', 'https://3.files.edl.io/be94/19/12/31/195057-445ac24e-e393-403f-8b3e-d79e9f73456a.png', 'A focused ACT cram option for Basehor-Linwood students planning around college goals and busy schedules.'),
      ('bishop-ward-high-school', 'Bishop Ward High School', 'Kansas City, Kansas', 'https://cmsv2-assets.apptegy.net/uploads/3414/logo/3038/BishopWard_header-img.png', 'Concise ACT prep for Bishop Ward families who want a practical review path before the next test date.'),
      ('bishop-miege-high-school', 'Bishop Miege High School', 'Roeland Park, Kansas', 'https://bishopmiege.com/wp-content/uploads/2025/05/logo.jpg', 'Focused ACT prep for Bishop Miege students balancing a strong academic schedule with college goals.'),
      ('blue-valley-high-school', 'Blue Valley High School', 'Blue Valley USD 229', 'https://resources.finalsite.net/images/f_auto,q_auto/v1747249447/bluevalleyk12org/c3mmbodjewdpz4lr4b7p/Copy-of-BlVaHS_tiger_corp_CMYK.png', 'A compact ACT cram option for Blue Valley students looking to sharpen timing, strategy, and confidence.'),
      ('blue-valley-north-high-school', 'Blue Valley North High School', 'Blue Valley USD 229', 'https://resources.finalsite.net/images/f_auto,q_auto/v1753304646/bluevalleyk12org/kt9r3a45k9znrtpcjm16/BVNLogo_Navy.png', 'Efficient ACT preparation for Blue Valley North students planning around college applications and test dates.'),
      ('blue-valley-northwest-high-school', 'Blue Valley Northwest High School', 'Blue Valley USD 229', 'https://resources.finalsite.net/images/f_auto,q_auto/v1747679496/bluevalleyk12org/i3bisjqgotixp6ip1whf/Copy-of-BVNWHS_Huski_corp_CMYK.png', 'High-yield ACT review for Blue Valley Northwest students who want focused practice before test day.'),
      ('blue-valley-southwest-high-school', 'Blue Valley Southwest High School', 'Blue Valley USD 229', 'https://resources.finalsite.net/images/f_auto,q_auto/v1747249447/bluevalleyk12org/oazv5dci0iky2y5pmqju/Copy-of-BVSWHS_Twolf_corp_CMYK.png', 'A practical ACT cram-course option for Blue Valley Southwest students preparing for upcoming test dates.'),
      ('blue-valley-west-high-school', 'Blue Valley West High School', 'Blue Valley USD 229', 'https://resources.finalsite.net/images/f_auto,q_auto/v1758570226/bluevalleyk12org/dfd8itzamegpkkaxdu1o/BVW_Logo.png', 'Concise ACT prep for Blue Valley West students working toward stronger scores and scholarship options.'),
      ('bonner-springs-high-school', 'Bonner Springs High School', 'Bonner Springs USD 204', 'https://cmsv2-assets.apptegy.net/uploads/20824/logo/23638/logo_template_300.png', 'A nearby ACT cram-course path for Bonner Springs students looking for high-yield review close to test day.'),
      ('brighton-academy', 'Brighton Academy', 'Overland Park, Kansas', 'https://static.wixstatic.com/media/800ae2_cf745f2907794618b7f7add8def007e6~mv2.png/v1/fill/w_1000,h_1000,al_c/800ae2_cf745f2907794618b7f7add8def007e6~mv2.png', 'Flexible ACT prep for Brighton Academy families balancing hybrid coursework, activities, and college planning.'),
      ('christ-preparatory-academy', 'Christ Preparatory Academy', 'Lenexa, Kansas', '/school-logos/christ-preparatory-academy.png', 'Focused ACT review for Christ Prep students who want efficient practice before the next test date.'),
      ('classical-conversations', 'Classical Conversations', 'Kansas City homeschool community', 'https://classicalconversations.com/wp-content/uploads/2021/05/logo-blue.png', 'A practical ACT cram-course option for Classical Conversations and homeschool families across the metro.'),
      ('de-soto-high-school', 'De Soto High School', 'De Soto USD 232', 'https://resources.finalsite.net/images/f_auto,q_auto/v1696498588/usd232org/v9h75onpieaffp5fpulh/DHS.png', 'Score-focused ACT preparation for De Soto students balancing academics, activities, and college planning.'),
      ('fl-schlagle-high-school', 'F. L. Schlagle High School', 'Kansas City Kansas Public Schools', 'https://resources.finalsite.net/images/f_auto,q_auto/v1772643792/kckpsorg/l9sxtif7tnytvchnkgkx/StallionHeadCircle.png', 'A focused ACT cram option for Schlagle students who want efficient strategy, pacing, and review.'),
      ('jc-harmon-high-school', 'J. C. Harmon High School', 'Kansas City Kansas Public Schools', 'https://resources.finalsite.net/images/f_auto,q_auto/v1654861668/kckpsorg/cnexk7mcayxatjn3awqe/harmonhawks.png', 'Targeted ACT preparation for Harmon students working toward stronger scores and more college options.'),
      ('heritage-christian-academy', 'Heritage Christian Academy', 'Olathe, Kansas', 'https://bbk12e1-cdn.myschoolcdn.com/ftpimages/2552/logo/HCA_Academic_Shield%20Hor_FFFFFF.png', 'Concise ACT preparation for Heritage Christian Academy students planning for college and scholarship opportunities.'),
      ('lansing-high-school', 'Lansing High School', 'Lansing USD 469', '/school-logos/lansing-high-school.png', 'A practical ACT cram-course option for Lansing students preparing for spring, summer, or fall test dates.'),
      ('leavenworth-high-school', 'Leavenworth High School', 'Leavenworth USD 453', 'https://resources.finalsite.net/images/f_auto,q_auto/v1680771585/usd453org/v70fu90ujlpf7s6o4xjb/LHS_Logo_noBkg.png', 'Efficient ACT prep for Leavenworth families who want focused review without months of extra coursework.'),
      ('mill-valley-high-school', 'Mill Valley High School', 'De Soto USD 232', 'https://resources.finalsite.net/images/f_auto,q_auto/v1696498939/usd232org/uc99eyphlyjmxrkcj6wg/MV2010jaguar-medallionfw.png', 'Focused pacing, test strategy, and scholarship-minded ACT prep for Mill Valley students.'),
      ('maranatha-christian-academy', 'Maranatha Christian Academy', 'Shawnee, Kansas', 'https://resources.finalsite.net/images/f_auto,q_auto/v1731948520/mcaeaglesorg/zeees2jynqzx2xqjnyis/Untitleddesign80_1_1.png', 'A focused ACT cram option for Maranatha students balancing academics, activities, and college goals.'),
      ('piper-high-school', 'Piper High School', 'Piper USD 203', 'https://resources.finalsite.net/images/f_auto,q_auto/v1674819311/piperschoolscom/jkfzslbqnxnl8f6sbwqa/piratecircle.png', 'A convenient cram-course path for Piper students who want efficient ACT review close to home.'),
      ('rockhurst-high-school', 'Rockhurst High School', 'Kansas City, Missouri', 'https://bbk12e1-cdn.myschoolcdn.com/ftpimages/1222/logo/navigationCrest.png', 'High-yield ACT preparation for Rockhurst students looking to sharpen timing, strategy, and confidence.'),
      ('olathe-east-high-school', 'Olathe East High School', 'Olathe USD 233', 'https://resources.finalsite.net/images/f_auto,q_auto/v1721301204/olatheschoolsorg/vgnosxjyv6dm3ghkllia/OlatheEastHighSchoolPrimaryThumbnailImage.png', 'Focused ACT strategy and pacing review for Olathe East students preparing for the next test date.'),
      ('olathe-north-high-school', 'Olathe North High School', 'Olathe USD 233', 'https://resources.finalsite.net/images/f_auto,q_auto/v1721301208/olatheschoolsorg/s8gbc3sokrqfotzderz0/OlatheNorthHighSchoolPrimaryThumbnailImage.png', 'A streamlined ACT cram option for Olathe North students looking for efficient, score-focused review.'),
      ('olathe-northwest-high-school', 'Olathe Northwest High School', 'Olathe USD 233', 'https://resources.finalsite.net/images/f_auto,q_auto/v1721301213/olatheschoolsorg/rillfgs8rhvwf2xnh2kv/OlatheNorthwestHighSchoolPrimaryThumbnailImage.png', 'Targeted ACT preparation for Olathe Northwest students balancing test prep with a full school calendar.'),
      ('olathe-south-high-school', 'Olathe South High School', 'Olathe USD 233', 'https://resources.finalsite.net/images/f_auto,q_auto/v1722891993/olatheschoolsorg/fnzxjhc6phls5362s3jf/Olathe-South-logo-2024.png', 'Concise ACT prep for Olathe South students who want high-yield practice before test day.'),
      ('olathe-west-high-school', 'Olathe West High School', 'Olathe USD 233', 'https://resources.finalsite.net/images/f_auto,q_auto/v1721301222/olatheschoolsorg/tfewewi5lt7cfjtw0fgp/OlatheWestHighSchoolPrimaryThumbnailImage.png', 'A practical ACT cram-course path for Olathe West students working toward college-ready scores.'),
      ('shawnee-mission-east-high-school', 'Shawnee Mission East High School', 'Shawnee Mission School District', 'https://resources.finalsite.net/images/v1528397524/smsdorg/hytwjmijm5rbldxdgub8/logo-shawnee-mission-east-high.svg', 'Focused ACT review for Shawnee Mission East students working toward stronger scores and scholarship opportunities.'),
      ('shawnee-mission-north-high-school', 'Shawnee Mission North High School', 'Shawnee Mission School District', 'https://resources.finalsite.net/images/v1528397550/smsdorg/arovs2tuhsqam1shwjao/logo-shawnee-mission-north-high.svg', 'A streamlined ACT cram option for Shawnee Mission North students preparing for the next available test date.'),
      ('shawnee-mission-northwest-high-school', 'Shawnee Mission Northwest High School', 'Shawnee Mission School District', 'https://resources.finalsite.net/images/v1528397558/smsdorg/bjlrcycdsezhirm2qcom/logo-shawnee-mission-northwest-high.svg', 'A nearby ACT cram option for Shawnee Mission Northwest families planning around spring and summer test dates.'),
      ('shawnee-mission-south-high-school', 'Shawnee Mission South High School', 'Shawnee Mission School District', 'https://resources.finalsite.net/images/v1526483011/smsdorg/kgrj3avbmuaqjn9uugqx/logo-shawnee-mission-south-high.svg', 'Concise ACT preparation for Shawnee Mission South families balancing test prep with a full school calendar.'),
      ('shawnee-mission-west-high-school', 'Shawnee Mission West High School', 'Shawnee Mission School District', 'https://resources.finalsite.net/images/v1526483005/smsdorg/ooso3nbmpzriff7qplrl/logo-shawnee-mission-west-high.svg', 'High-yield ACT review for Shawnee Mission West students looking to sharpen timing, strategy, and confidence.'),
      ('shawnee-mission-christian-school', 'Shawnee Mission Christian School', 'Westwood, Kansas', '/school-logos/shawnee-mission-christian-school.png', 'Practical ACT prep for Shawnee Mission Christian students preparing for college admissions and scholarships.'),
      ('southland-academy', 'Southland Academy', 'Kansas City, Missouri', '/school-logos/southland-academy.png', 'Focused ACT review for Southland Academy families who want a compact, strategy-heavy path before test day.'),
      ('st-james-academy', 'St. James Academy', 'Lenexa, Kansas', 'https://sjathunder.org/wp-content/uploads/2022/08/sja-stacked-shield-full-color.png', 'Concise ACT preparation for St. James families balancing college goals, activities, and busy calendars.'),
      ('st-thomas-aquinas-high-school', 'St. Thomas Aquinas High School', 'Overland Park, Kansas', 'https://resources.finalsite.net/images/v1683106778/stasaintsnet/dix8jrvmkvwkifntnv8j/Frame.svg', 'Focused ACT preparation for St. Thomas Aquinas students balancing college goals, activities, and academics.'),
      ('sumner-academy-of-arts-and-science', 'Sumner Academy of Arts and Science', 'Kansas City Kansas Public Schools', 'https://resources.finalsite.net/images/f_auto,q_auto/v1657041225/kckpsorg/hz8w7hglg8bgw4rwkr4y/Sumner_SabresLogo.png', 'Focused ACT prep for Sumner Academy students who want a compact, strategy-heavy review before test day.'),
      ('turner-high-school', 'Turner High School', 'Turner USD 202', 'https://resources.finalsite.net/images/f_auto,q_auto/v1653507580/turner/rahtsyshbr4eco3kinyp/TurnerBearLogo.png', 'A practical ACT cram path for Turner students preparing for stronger scores and more college options.'),
      ('washington-high-school-kck', 'Washington High School', 'Kansas City Kansas Public Schools', 'https://resources.finalsite.net/images/f_auto,q_auto/v1727360942/kckpsorg/hewxlm6su0asuk7gqspl/washington-circle-new.png', 'Targeted ACT review for Washington students who want efficient practice with pacing and test strategy.'),
      ('wyandotte-high-school', 'Wyandotte High School', 'Kansas City Kansas Public Schools', '/school-logos/wyandotte-high-school.png', 'A focused ACT cram option for Wyandotte students planning next steps after high school.'),
      ('whitefield-academy', 'Whitefield Academy', 'Kansas City, Missouri', 'https://resources.finalsite.net/images/f_auto,q_auto/v1701883143/whitefieldacademyorg/lltuaqzlthtaq5hh0hq5/CrestFavicon.png', 'ACT prep for Whitefield Academy students and families looking for focused review close to test day.')
    on conflict (slug) do update set
      name = excluded.name,
      district = excluded.district,
      hero_image_url = excluded.hero_image_url,
      short_pitch = excluded.short_pitch,
      is_active = true,
      updated_at = now();
