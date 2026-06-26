import type { ClassOffering, CollegeTier, School } from '$lib/types';

export const classOfferings: ClassOffering[] = [
  {
    id: 'cls-june-2026',
    slug: 'act-cram-june-2026',
    title: 'June ACT Cram Course',
    schedule: 'Mon-Thu, June 8-11, 6:30-8:00 PM',
    location: 'Shawnee Civic Center - final room details sent after enrollment',
    format: '4 sessions - 90 minutes each',
    priceCents: 29900,
    seatsAvailable: 0,
    featured: false,
    startDate: '2026-06-08',
    endDate: '2026-06-11',
    actTestDate: '2026-06-13',
    scoreReleaseDate: '2026-06-23'
  },
  {
    id: 'cls-july-2026',
    slug: 'act-cram-july-2026',
    title: 'July ACT Cram Course',
    schedule: 'Mon-Thu, July 6-9, 6:30-8:00 PM',
    location: 'Harvest Ridge Covenant Church',
    format: '4 sessions - 90 minutes each',
    priceCents: 29900,
    seatsAvailable: 15,
    featured: true,
    startDate: '2026-07-06',
    endDate: '2026-07-09',
    actTestDate: '2026-07-11',
    scoreReleaseDate: '2026-07-21'
  },
  {
    id: 'cls-september-2026',
    slug: 'act-cram-september-2026',
    title: 'September ACT Cram Course',
    schedule: 'Mon-Thu, September 14-17, 6:30-8:00 PM',
    location: 'Lansing Community Center',
    format: '4 sessions - 90 minutes each',
    priceCents: 29900,
    seatsAvailable: 15,
    startDate: '2026-09-14',
    endDate: '2026-09-17',
    actTestDate: '2026-09-19',
    scoreReleaseDate: '2026-10-06'
  },
  {
    id: 'cls-october-2026',
    slug: 'act-cram-october-2026',
    title: 'October ACT Cram Course',
    schedule: 'Mon-Thu, October 12-15, 6:30-8:00 PM',
    location: 'Harvest Ridge Covenant Church',
    format: '4 sessions - 90 minutes each',
    priceCents: 29900,
    seatsAvailable: 15,
    featured: false,
    stripePriceId: 'price_1TgQdORJisJe1D168XCYWiQD',
    startDate: '2026-10-12',
    endDate: '2026-10-15',
    actTestDate: '2026-10-17',
    scoreReleaseDate: '2026-10-27'
  },
  {
    id: 'cls-december-2026',
    slug: 'act-cram-december-2026',
    title: 'December ACT Cram Course',
    schedule: 'Mon-Thu, December 7-10, 6:30-8:00 PM',
    location: 'Haven Baptist Church',
    format: '4 sessions - 90 minutes each',
    priceCents: 29900,
    seatsAvailable: 15,
    featured: false,
    startDate: '2026-12-07',
    endDate: '2026-12-10',
    actTestDate: '2026-12-12',
    scoreReleaseDate: '2026-12-22'
  },
  {
    id: 'cls-february-2027',
    slug: 'act-cram-february-2027',
    title: 'February ACT Cram Course',
    schedule: 'Mon-Thu, February 22-25, 6:30-8:00 PM',
    location: 'Lansing Community Center',
    format: '4 sessions - 90 minutes each',
    priceCents: 29900,
    seatsAvailable: 15,
    featured: false,
    startDate: '2027-02-22',
    endDate: '2027-02-25',
    actTestDate: '2027-02-27',
    scoreReleaseDate: '2027-03-16'
  },
  {
    id: 'cls-april-2027',
    slug: 'act-cram-april-2027',
    title: 'April ACT Cram Course',
    schedule: 'Mon-Thu, April 5-8, 6:30-8:00 PM',
    location: 'Lansing Community Center',
    format: '4 sessions - 90 minutes each',
    priceCents: 29900,
    seatsAvailable: 15,
    featured: false,
    startDate: '2027-04-05',
    endDate: '2027-04-08',
    actTestDate: '2027-04-10',
    scoreReleaseDate: '2027-04-20'
  },
  {
    id: 'cls-june-2027',
    slug: 'act-cram-june-2027',
    title: 'June ACT Cram Course',
    schedule: 'Mon-Thu, June 7-10, 6:30-8:00 PM',
    location: 'Lansing Community Center',
    format: '4 sessions - 90 minutes each',
    priceCents: 29900,
    seatsAvailable: 15,
    featured: false,
    startDate: '2027-06-07',
    endDate: '2027-06-10',
    actTestDate: '2027-06-12',
    scoreReleaseDate: '2027-06-22'
  },
  {
    id: 'cls-july-2027',
    slug: 'act-cram-july-2027',
    title: 'July ACT Cram Course',
    schedule: 'Mon-Thu, July 5-8, 6:30-8:00 PM',
    location: 'Lansing Community Center',
    format: '4 sessions - 90 minutes each',
    priceCents: 29900,
    seatsAvailable: 15,
    featured: false,
    startDate: '2027-07-05',
    endDate: '2027-07-08',
    actTestDate: '2027-07-10',
    scoreReleaseDate: '2027-07-20'
  }
];

export const schools: School[] = [
  {
    id: 'sch-basehor-linwood',
    slug: 'basehor-linwood-high-school',
    name: 'Basehor-Linwood High School',
    district: 'Basehor-Linwood USD 458',
    heroImageUrl: 'https://3.files.edl.io/be94/19/12/31/195057-445ac24e-e393-403f-8b3e-d79e9f73456a.png',
    shortPitch: 'A focused ACT cram option for Basehor-Linwood students planning around college goals and busy schedules.'
  },
  {
    id: 'sch-bishop-ward',
    slug: 'bishop-ward-high-school',
    name: 'Bishop Ward High School',
    district: 'Kansas City, Kansas',
    heroImageUrl: 'https://cmsv2-assets.apptegy.net/uploads/3414/logo/3038/BishopWard_header-img.png',
    shortPitch: 'Concise ACT prep for Bishop Ward families who want a practical review path before the next test date.'
  },
  {
    id: 'sch-bishop-miege',
    slug: 'bishop-miege-high-school',
    name: 'Bishop Miege High School',
    district: 'Roeland Park, Kansas',
    heroImageUrl: 'https://bishopmiege.com/wp-content/uploads/2025/05/logo.jpg',
    shortPitch: 'Focused ACT prep for Bishop Miege students balancing a strong academic schedule with college goals.'
  },
  {
    id: 'sch-blue-valley',
    slug: 'blue-valley-high-school',
    name: 'Blue Valley High School',
    district: 'Blue Valley USD 229',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1747249447/bluevalleyk12org/c3mmbodjewdpz4lr4b7p/Copy-of-BlVaHS_tiger_corp_CMYK.png',
    shortPitch: 'A compact ACT cram option for Blue Valley students looking to sharpen timing, strategy, and confidence.'
  },
  {
    id: 'sch-blue-valley-north',
    slug: 'blue-valley-north-high-school',
    name: 'Blue Valley North High School',
    district: 'Blue Valley USD 229',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1753304646/bluevalleyk12org/kt9r3a45k9znrtpcjm16/BVNLogo_Navy.png',
    shortPitch: 'Efficient ACT preparation for Blue Valley North students planning around college applications and test dates.'
  },
  {
    id: 'sch-blue-valley-northwest',
    slug: 'blue-valley-northwest-high-school',
    name: 'Blue Valley Northwest High School',
    district: 'Blue Valley USD 229',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1747679496/bluevalleyk12org/i3bisjqgotixp6ip1whf/Copy-of-BVNWHS_Huski_corp_CMYK.png',
    shortPitch: 'High-yield ACT review for Blue Valley Northwest students who want focused practice before test day.'
  },
  {
    id: 'sch-blue-valley-southwest',
    slug: 'blue-valley-southwest-high-school',
    name: 'Blue Valley Southwest High School',
    district: 'Blue Valley USD 229',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1747249447/bluevalleyk12org/oazv5dci0iky2y5pmqju/Copy-of-BVSWHS_Twolf_corp_CMYK.png',
    shortPitch: 'A practical ACT cram-course option for Blue Valley Southwest students preparing for upcoming test dates.'
  },
  {
    id: 'sch-blue-valley-west',
    slug: 'blue-valley-west-high-school',
    name: 'Blue Valley West High School',
    district: 'Blue Valley USD 229',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1758570226/bluevalleyk12org/dfd8itzamegpkkaxdu1o/BVW_Logo.png',
    shortPitch: 'Concise ACT prep for Blue Valley West students working toward stronger scores and scholarship options.'
  },
  {
    id: 'sch-bonner-springs',
    slug: 'bonner-springs-high-school',
    name: 'Bonner Springs High School',
    district: 'Bonner Springs USD 204',
    heroImageUrl: 'https://cmsv2-assets.apptegy.net/uploads/20824/logo/23638/logo_template_300.png',
    shortPitch: 'A nearby ACT cram-course path for Bonner Springs students looking for high-yield review close to test day.'
  },
  {
    id: 'sch-brighton-academy',
    slug: 'brighton-academy',
    name: 'Brighton Academy',
    district: 'Overland Park, Kansas',
    heroImageUrl: 'https://static.wixstatic.com/media/800ae2_cf745f2907794618b7f7add8def007e6~mv2.png/v1/fill/w_1000,h_1000,al_c/800ae2_cf745f2907794618b7f7add8def007e6~mv2.png',
    shortPitch: 'Flexible ACT prep for Brighton Academy families balancing hybrid coursework, activities, and college planning.'
  },
  {
    id: 'sch-christ-prep',
    slug: 'christ-preparatory-academy',
    name: 'Christ Preparatory Academy',
    district: 'Lenexa, Kansas',
    heroImageUrl: '/school-logos/christ-preparatory-academy.png',
    shortPitch: 'Focused ACT review for Christ Prep students who want efficient practice before the next test date.'
  },
  {
    id: 'sch-classical-conversations',
    slug: 'classical-conversations',
    name: 'Classical Conversations',
    district: 'Kansas City homeschool community',
    heroImageUrl: 'https://classicalconversations.com/wp-content/uploads/2021/05/logo-blue.png',
    shortPitch: 'A practical ACT cram-course option for Classical Conversations and homeschool families across the metro.'
  },
  {
    id: 'sch-de-soto',
    slug: 'de-soto-high-school',
    name: 'De Soto High School',
    district: 'De Soto USD 232',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1696498588/usd232org/v9h75onpieaffp5fpulh/DHS.png',
    shortPitch: 'Score-focused ACT preparation for De Soto students balancing academics, activities, and college planning.'
  },
  {
    id: 'sch-fl-schlagle',
    slug: 'fl-schlagle-high-school',
    name: 'F. L. Schlagle High School',
    district: 'Kansas City Kansas Public Schools',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1772643792/kckpsorg/l9sxtif7tnytvchnkgkx/StallionHeadCircle.png',
    shortPitch: 'A focused ACT cram option for Schlagle students who want efficient strategy, pacing, and review.'
  },
  {
    id: 'sch-jc-harmon',
    slug: 'jc-harmon-high-school',
    name: 'J. C. Harmon High School',
    district: 'Kansas City Kansas Public Schools',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1654861668/kckpsorg/cnexk7mcayxatjn3awqe/harmonhawks.png',
    shortPitch: 'Targeted ACT preparation for Harmon students working toward stronger scores and more college options.'
  },
  {
    id: 'sch-heritage-christian-academy',
    slug: 'heritage-christian-academy',
    name: 'Heritage Christian Academy',
    district: 'Olathe, Kansas',
    heroImageUrl: 'https://bbk12e1-cdn.myschoolcdn.com/ftpimages/2552/logo/HCA_Academic_Shield%20Hor_FFFFFF.png',
    shortPitch: 'Concise ACT preparation for Heritage Christian Academy students planning for college and scholarship opportunities.'
  },
  {
    id: 'sch-lansing',
    slug: 'lansing-high-school',
    name: 'Lansing High School',
    district: 'Lansing USD 469',
    heroImageUrl: '/school-logos/lansing-high-school.png',
    shortPitch: 'A practical ACT cram-course option for Lansing students preparing for spring, summer, or fall test dates.'
  },
  {
    id: 'sch-leavenworth',
    slug: 'leavenworth-high-school',
    name: 'Leavenworth High School',
    district: 'Leavenworth USD 453',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1680771585/usd453org/v70fu90ujlpf7s6o4xjb/LHS_Logo_noBkg.png',
    shortPitch: 'Efficient ACT prep for Leavenworth families who want focused review close to test day.'
  },
  {
    id: 'sch-mill-valley',
    slug: 'mill-valley-high-school',
    name: 'Mill Valley High School',
    district: 'De Soto USD 232',
    heroImageUrl:
      'https://resources.finalsite.net/images/f_auto,q_auto/v1696498939/usd232org/uc99eyphlyjmxrkcj6wg/MV2010jaguar-medallionfw.png',
    shortPitch: 'Focused pacing, test strategy, and scholarship-minded ACT prep for Mill Valley students.'
  },
  {
    id: 'sch-maranatha-christian-academy',
    slug: 'maranatha-christian-academy',
    name: 'Maranatha Christian Academy',
    district: 'Shawnee, Kansas',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1731948520/mcaeaglesorg/zeees2jynqzx2xqjnyis/Untitleddesign80_1_1.png',
    shortPitch: 'A focused ACT cram option for Maranatha students balancing academics, activities, and college goals.'
  },
  {
    id: 'sch-piper',
    slug: 'piper-high-school',
    name: 'Piper High School',
    district: 'Piper USD 203',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1674819311/piperschoolscom/jkfzslbqnxnl8f6sbwqa/piratecircle.png',
    shortPitch: 'A convenient cram-course path for Piper students who want efficient ACT review close to home.'
  },
  {
    id: 'sch-rockhurst-high-school',
    slug: 'rockhurst-high-school',
    name: 'Rockhurst High School',
    district: 'Kansas City, Missouri',
    heroImageUrl: 'https://bbk12e1-cdn.myschoolcdn.com/ftpimages/1222/logo/navigationCrest.png',
    shortPitch: 'High-yield ACT preparation for Rockhurst students looking to sharpen timing, strategy, and confidence.'
  },
  {
    id: 'sch-olathe-east',
    slug: 'olathe-east-high-school',
    name: 'Olathe East High School',
    district: 'Olathe USD 233',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1721301204/olatheschoolsorg/vgnosxjyv6dm3ghkllia/OlatheEastHighSchoolPrimaryThumbnailImage.png',
    shortPitch: 'Focused ACT strategy and pacing review for Olathe East students preparing for the next test date.'
  },
  {
    id: 'sch-olathe-north',
    slug: 'olathe-north-high-school',
    name: 'Olathe North High School',
    district: 'Olathe USD 233',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1721301208/olatheschoolsorg/s8gbc3sokrqfotzderz0/OlatheNorthHighSchoolPrimaryThumbnailImage.png',
    shortPitch: 'A streamlined ACT cram option for Olathe North students looking for efficient, score-focused review.'
  },
  {
    id: 'sch-olathe-northwest',
    slug: 'olathe-northwest-high-school',
    name: 'Olathe Northwest High School',
    district: 'Olathe USD 233',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1721301213/olatheschoolsorg/rillfgs8rhvwf2xnh2kv/OlatheNorthwestHighSchoolPrimaryThumbnailImage.png',
    shortPitch: 'Targeted ACT preparation for Olathe Northwest students balancing test prep with a full school calendar.'
  },
  {
    id: 'sch-olathe-south',
    slug: 'olathe-south-high-school',
    name: 'Olathe South High School',
    district: 'Olathe USD 233',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1722891993/olatheschoolsorg/fnzxjhc6phls5362s3jf/Olathe-South-logo-2024.png',
    shortPitch: 'Concise ACT prep for Olathe South students who want high-yield practice before test day.'
  },
  {
    id: 'sch-olathe-west',
    slug: 'olathe-west-high-school',
    name: 'Olathe West High School',
    district: 'Olathe USD 233',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1721301222/olatheschoolsorg/tfewewi5lt7cfjtw0fgp/OlatheWestHighSchoolPrimaryThumbnailImage.png',
    shortPitch: 'A practical ACT cram-course path for Olathe West students working toward college-ready scores.'
  },
  {
    id: 'sch-shawnee-mission-east',
    slug: 'shawnee-mission-east-high-school',
    name: 'Shawnee Mission East High School',
    district: 'Shawnee Mission School District',
    heroImageUrl: 'https://resources.finalsite.net/images/v1528397524/smsdorg/hytwjmijm5rbldxdgub8/logo-shawnee-mission-east-high.svg',
    shortPitch: 'Focused ACT review for Shawnee Mission East students working toward stronger scores and scholarship opportunities.'
  },
  {
    id: 'sch-shawnee-mission-north',
    slug: 'shawnee-mission-north-high-school',
    name: 'Shawnee Mission North High School',
    district: 'Shawnee Mission School District',
    heroImageUrl: 'https://resources.finalsite.net/images/v1528397550/smsdorg/arovs2tuhsqam1shwjao/logo-shawnee-mission-north-high.svg',
    shortPitch: 'A streamlined ACT cram option for Shawnee Mission North students preparing for the next available test date.'
  },
  {
    id: 'sch-shawnee-mission-northwest',
    slug: 'shawnee-mission-northwest-high-school',
    name: 'Shawnee Mission Northwest High School',
    district: 'Shawnee Mission School District',
    heroImageUrl: 'https://resources.finalsite.net/images/v1528397558/smsdorg/bjlrcycdsezhirm2qcom/logo-shawnee-mission-northwest-high.svg',
    shortPitch:
      'A nearby ACT cram option for Shawnee Mission Northwest families planning around spring and summer test dates.'
  },
  {
    id: 'sch-shawnee-mission-south',
    slug: 'shawnee-mission-south-high-school',
    name: 'Shawnee Mission South High School',
    district: 'Shawnee Mission School District',
    heroImageUrl: 'https://resources.finalsite.net/images/v1526483011/smsdorg/kgrj3avbmuaqjn9uugqx/logo-shawnee-mission-south-high.svg',
    shortPitch: 'Concise ACT preparation for Shawnee Mission South families balancing test prep with a full school calendar.'
  },
  {
    id: 'sch-shawnee-mission-west',
    slug: 'shawnee-mission-west-high-school',
    name: 'Shawnee Mission West High School',
    district: 'Shawnee Mission School District',
    heroImageUrl: 'https://resources.finalsite.net/images/v1526483005/smsdorg/ooso3nbmpzriff7qplrl/logo-shawnee-mission-west-high.svg',
    shortPitch: 'High-yield ACT review for Shawnee Mission West students looking to sharpen timing, strategy, and confidence.'
  },
  {
    id: 'sch-shawnee-mission-christian',
    slug: 'shawnee-mission-christian-school',
    name: 'Shawnee Mission Christian School',
    district: 'Westwood, Kansas',
    heroImageUrl: '/school-logos/shawnee-mission-christian-school.png',
    shortPitch: 'Practical ACT prep for Shawnee Mission Christian students preparing for college admissions and scholarships.'
  },
  {
    id: 'sch-southland-academy',
    slug: 'southland-academy',
    name: 'Southland Academy',
    district: 'Kansas City, Missouri',
    heroImageUrl: '/school-logos/southland-academy.png',
    shortPitch: 'Focused ACT review for Southland Academy families who want a compact, strategy-heavy path before test day.'
  },
  {
    id: 'sch-st-james-academy',
    slug: 'st-james-academy',
    name: 'St. James Academy',
    district: 'Lenexa, Kansas',
    heroImageUrl:
      'https://sjathunder.org/wp-content/uploads/2022/08/sja-stacked-shield-full-color.png',
    shortPitch:
      'Concise ACT preparation for St. James families balancing college goals, activities, and busy calendars.'
  },
  {
    id: 'sch-st-thomas-aquinas',
    slug: 'st-thomas-aquinas-high-school',
    name: 'St. Thomas Aquinas High School',
    district: 'Overland Park, Kansas',
    heroImageUrl: 'https://resources.finalsite.net/images/v1683106778/stasaintsnet/dix8jrvmkvwkifntnv8j/Frame.svg',
    shortPitch: 'Focused ACT preparation for St. Thomas Aquinas students balancing college goals, activities, and academics.'
  },
  {
    id: 'sch-sumner-academy',
    slug: 'sumner-academy-of-arts-and-science',
    name: 'Sumner Academy of Arts and Science',
    district: 'Kansas City Kansas Public Schools',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1657041225/kckpsorg/hz8w7hglg8bgw4rwkr4y/Sumner_SabresLogo.png',
    shortPitch: 'Focused ACT prep for Sumner Academy students who want a compact, strategy-heavy review before test day.'
  },
  {
    id: 'sch-turner',
    slug: 'turner-high-school',
    name: 'Turner High School',
    district: 'Turner USD 202',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1653507580/turner/rahtsyshbr4eco3kinyp/TurnerBearLogo.png',
    shortPitch: 'A practical ACT cram path for Turner students preparing for stronger scores and more college options.'
  },
  {
    id: 'sch-washington-kck',
    slug: 'washington-high-school-kck',
    name: 'Washington High School',
    district: 'Kansas City Kansas Public Schools',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1727360942/kckpsorg/hewxlm6su0asuk7gqspl/washington-circle-new.png',
    shortPitch: 'Targeted ACT review for Washington students who want efficient practice with pacing and test strategy.'
  },
  {
    id: 'sch-wyandotte',
    slug: 'wyandotte-high-school',
    name: 'Wyandotte High School',
    district: 'Kansas City Kansas Public Schools',
    heroImageUrl: '/school-logos/wyandotte-high-school.png',
    shortPitch: 'A focused ACT cram option for Wyandotte students planning next steps after high school.'
  },
  {
    id: 'sch-whitefield-academy',
    slug: 'whitefield-academy',
    name: 'Whitefield Academy',
    district: 'Kansas City, Missouri',
    heroImageUrl: 'https://resources.finalsite.net/images/f_auto,q_auto/v1701883143/whitefieldacademyorg/lltuaqzlthtaq5hh0hq5/CrestFavicon.png',
    shortPitch: 'ACT prep for Whitefield Academy students and families looking for focused review close to test day.'
  }
];

export const scholarshipTiers: CollegeTier[] = [
  {
    collegeSlug: 'ball-state',
    collegeName: 'Ball State University',
    tierName: 'Cardinal Merit',
    minGpa: 3.0,
    minAct: 24,
    annualAwardUsd: 6000
  },
  {
    collegeSlug: 'ball-state',
    collegeName: 'Ball State University',
    tierName: 'Presidential Merit',
    minGpa: 3.5,
    minAct: 28,
    annualAwardUsd: 10000
  },
  {
    collegeSlug: 'ball-state',
    collegeName: 'Ball State University',
    tierName: 'Honors Distinction',
    minGpa: 3.8,
    minAct: 31,
    annualAwardUsd: 13000
  },
  {
    collegeSlug: 'iu-bloomington',
    collegeName: 'Indiana University Bloomington',
    tierName: 'Select Scholar',
    minGpa: 3.2,
    minAct: 26,
    annualAwardUsd: 5000
  },
  {
    collegeSlug: 'iu-bloomington',
    collegeName: 'Indiana University Bloomington',
    tierName: 'Dean Scholar',
    minGpa: 3.6,
    minAct: 30,
    annualAwardUsd: 9000
  },
  {
    collegeSlug: 'iu-bloomington',
    collegeName: 'Indiana University Bloomington',
    tierName: 'Provost Scholar',
    minGpa: 3.85,
    minAct: 33,
    annualAwardUsd: 13000
  },
  {
    collegeSlug: 'purdue',
    collegeName: 'Purdue University',
    tierName: 'Boilermaker Award',
    minGpa: 3.5,
    minAct: 29,
    annualAwardUsd: 6500
  },
  {
    collegeSlug: 'purdue',
    collegeName: 'Purdue University',
    tierName: 'Trustees Scholarship',
    minGpa: 3.75,
    minAct: 32,
    annualAwardUsd: 11000
  },
  {
    collegeSlug: 'purdue',
    collegeName: 'Purdue University',
    tierName: 'Presidential Scholarship',
    minGpa: 3.95,
    minAct: 34,
    annualAwardUsd: 15000
  },
  {
    collegeSlug: 'alabama',
    collegeName: 'University of Alabama',
    tierName: 'Capstone Scholar',
    minGpa: 3.5,
    minAct: 30,
    annualAwardUsd: 9000
  },
  {
    collegeSlug: 'alabama',
    collegeName: 'University of Alabama',
    tierName: 'Foundation in Excellence',
    minGpa: 3.7,
    minAct: 32,
    annualAwardUsd: 18000
  },
  {
    collegeSlug: 'alabama',
    collegeName: 'University of Alabama',
    tierName: 'Premier Award',
    minGpa: 3.9,
    minAct: 34,
    annualAwardUsd: 28000
  }
];
