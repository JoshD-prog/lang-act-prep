if (process.argv.includes('--help')) {
  console.log(`Usage:
  npm run scholarships:validate
  npm run scholarships:validate -- --base-url=http://127.0.0.1:4176
  npm run scholarships:validate -- --strict

Environment:
  SCHOLARSHIP_CALCULATOR_BASE_URL=http://host  Override the calculator server URL.
  STRICT_SCHOLARSHIP_SCENARIOS=1              Fail when school-specific cards are absent.

The target app must already be running. Start it with npm run dev first.`);
  process.exit(0);
}

const baseUrlArg = process.argv.find((argument) => argument.startsWith('--base-url='));
const baseUrl =
  baseUrlArg?.slice('--base-url='.length).replace(/\/$/, '') ??
  process.env.SCHOLARSHIP_CALCULATOR_BASE_URL?.replace(/\/$/, '') ??
  'http://127.0.0.1:4176';
const strictSchoolChecks =
  process.argv.includes('--strict') || process.env.STRICT_SCHOLARSHIP_SCENARIOS === '1';

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getCardText(html, schoolName) {
  const heading = `<h3 class="mt-2 text-2xl font-black text-ink">${schoolName}</h3>`;
  const start = html.indexOf(heading);

  if (start === -1) {
    return null;
  }

  const nextCard = html.indexOf('<h3 class="mt-2 text-2xl font-black text-ink">', start + heading.length);
  return stripTags(html.slice(start, nextCard === -1 ? undefined : nextCard));
}

function includesText(text, expected) {
  const normalize = (value) => value.toLowerCase().replace(/:/g, '').replace(/\s+/g, ' ').trim();
  return normalize(text).includes(normalize(expected));
}

function requirePageText(expected) {
  return (html) => {
    const pageText = stripTags(html);
    return includesText(pageText, expected)
      ? { status: 'pass' }
      : { status: 'fail', message: `Expected page to include "${expected}".` };
  };
}

function requireAnyPageText(expectedOptions) {
  return (html) => {
    const pageText = stripTags(html);
    const matched = expectedOptions.some((expected) => includesText(pageText, expected));

    return matched
      ? { status: 'pass' }
      : {
          status: 'fail',
          message: `Expected page to include one of: ${expectedOptions.map((item) => `"${item}"`).join(', ')}.`
        };
  };
}

function forbidPagePattern(pattern, label) {
  return (html) => {
    return pattern.test(html)
      ? { status: 'fail', message: `Expected page not to include ${label}.` }
      : { status: 'pass' };
  };
}

function requireCardText(schoolName, expected) {
  return (html) => {
    const cardText = getCardText(html, schoolName);

    if (!cardText) {
      const message = `${schoolName} card is not present in this data set.`;
      return strictSchoolChecks ? { status: 'fail', message } : { status: 'skip', message };
    }

    return includesText(cardText, expected)
      ? { status: 'pass' }
      : {
          status: 'fail',
          message: `Expected ${schoolName} card to include "${expected}".`
        };
  };
}

function forbidCardText(schoolName, forbidden) {
  return (html) => {
    const cardText = getCardText(html, schoolName);

    if (!cardText) {
      const message = `${schoolName} card is not present in this data set.`;
      return strictSchoolChecks ? { status: 'fail', message } : { status: 'skip', message };
    }

    return includesText(cardText, forbidden)
      ? {
          status: 'fail',
          message: `Expected ${schoolName} card not to include "${forbidden}".`
        }
      : { status: 'pass' };
  };
}

const scenarios = [
  {
    name: 'below-band students show no current automatic award',
    path: '/scholarship-calculator?gpa=3.2&act=23&residency=KS&filter=best',
    checks: [
      requirePageText('Scholarship outlook'),
      requirePageText('No automatic tier yet'),
      requirePageText('$0'),
      requirePageText('Next target'),
      requirePageText('Strongest nearby value opportunities'),
      requirePageText('Score target snapshot'),
      requirePageText('Merit tier')
    ]
  },
  {
    name: 'nearby ACT upside is concrete when Northwest Missouri State is present',
    path: '/scholarship-calculator?gpa=3.2&act=23&residency=KS&filter=best',
    checks: [
      requireCardText('Northwest Missouri State University', 'Nearby upside'),
      forbidCardText('Northwest Missouri State University', 'Scholarship value can move quickly from here')
    ]
  },
  {
    name: 'non-score-based KU-style awards do not look like missing ACT data',
    path: '/scholarship-calculator?gpa=3.2&act=23&residency=KS&filter=best',
    checks: [
      requireCardText('University of Kansas', 'ACT: not used for this award'),
      forbidCardText('University of Kansas', 'ACT: improve score')
    ]
  },
  {
    name: 'max automatic tier still points families toward competitive upside',
    path: '/scholarship-calculator?gpa=4&act=36&residency=KS&filter=best',
    checks: [requirePageText('Competitive upside')]
  },
  {
    name: 'local-school filter returns a valid calculator response',
    path: '/scholarship-calculator?gpa=3.2&act=23&residency=KS&filter=local',
    checks: [requireAnyPageText(['Scholarship outlook', 'No matching scholarship tiers were found'])]
  },
  {
    name: 'invalid numeric inputs do not leak NaN into the rendered page',
    path: '/scholarship-calculator?gpa=abc&act=23&residency=KS&filter=best',
    checks: [
      requirePageText('Enter GPA and ACT score to estimate scholarships.'),
      forbidPagePattern(/\bNaN\b|\$NaN|\+NaN/, 'NaN')
    ]
  }
];

let failureCount = 0;

for (const scenario of scenarios) {
  let response;

  try {
    response = await fetch(`${baseUrl}${scenario.path}`);
  } catch (error) {
    failureCount += 1;
    console.error(`FAIL ${scenario.name}: unable to reach ${baseUrl}`);
    console.error(`  - ${error.message}`);
    continue;
  }

  if (!response.ok) {
    failureCount += 1;
    console.error(`FAIL ${scenario.name}: ${response.status} ${response.statusText}`);
    continue;
  }

  const html = await response.text();
  const results = scenario.checks.map((check) => check(html));
  const failures = results.filter((result) => result.status === 'fail');
  const skips = results.filter((result) => result.status === 'skip');

  if (failures.length) {
    failureCount += failures.length;
    console.error(`FAIL ${scenario.name}`);
    for (const failure of failures) {
      console.error(`  - ${failure.message}`);
    }
    continue;
  }

  if (skips.length) {
    console.log(
      `PASS ${scenario.name} (${skips.length} optional check${skips.length === 1 ? '' : 's'} skipped)`
    );
    for (const skip of skips) {
      console.log(`  - SKIP ${skip.message}`);
    }
    continue;
  }

  console.log(`PASS ${scenario.name}`);
}

if (failureCount > 0) {
  console.error(`${failureCount} scholarship scenario check${failureCount === 1 ? '' : 's'} failed.`);
  process.exit(1);
}

console.log('All scholarship scenario checks passed.');
if (!strictSchoolChecks) {
  console.log('Set STRICT_SCHOLARSHIP_SCENARIOS=1 to fail when school-specific cards are absent.');
}
