# ACT Prep Classes Marketing Site
This is a marketing site for ACT Prep Classes. The site will be built using Svelte5, Typescript, and Tailwind CSS. The site will be hosted on Vercel. 

The goal of this site is to provide information about the ACT Prep Classes, including class offerings, pricing, and how to sign up. 

## Style and Design
The style should be fresh and clean, with a focus on the target audience of high school students and their parents. The style should avoid overused design patterns. The site should be easy to navigate and provide clear information about the classes, pricing, and how to sign up.

## Features
- Supabase for backend and database
- Stripe for payment processing (course enrollment)
- Svelte5 for frontend development
- Tailwind CSS for styling
- Vercel for hosting

## Site Contents
- I need the standard pages, such as an "About" page, a "Classes" page, the sales funnel, enrollment, and payment processing pages, etc.
- a "resources" page, maybe different links like "for parents," or "for educators" 
- I want to include a scholarship calculator that allows students to input their GPA, ACT score, and other relevant information to see what they may expect to pay at different local colleges. I'll need a database table to manage the costs for each college.
    - maybe something like this link? https://www.bsu.edu/admissions/financial-aid-and-scholarships/scholarship-calculator
    - I want to do it for three or four "local" colleges, and then pick a couple of big popular state schools that have good scholarships. But instead of an output that just shows your result, something that tells you how close you are to the next 1-2 tiers of scholarship

- I want to have a page about the 529 update
    - Like this website: https://getsmarterprep.com/the-top-5-benefits-of-using-your-529-for-act-sat-prep/

- I want a page where students can select to enroll based on their school.
    - Like this website: https://powerprepinc.com/act-test-prep/kansas---kansas-city-area
    - Most of these links all funnel to the same class regardless of what school you are coming from, but I think it might increase sales if students can see their own school, so I would like to have a database table to manage schools and images used for each school, and then have a page that lists all the schools, and then when you click on a school, it takes you to the enrollment page for that school, but it's all the same class, just with different images and maybe some different text that is specific to that school.

### Site Contents
Use a standard structure for as many pages as possible, so that a cms can be integrated in the future.

## Agentic development
Create an AGENTS.md file to provide context about this site to future agents.

