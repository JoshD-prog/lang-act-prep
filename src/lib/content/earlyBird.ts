export type EarlyBirdOffer = {
  code: string;
  savingsLabel: string;
  discountedPriceLabel: string;
  deadlineLabel: string;
  expiresAt: string;
  urgencyLabel: string;
};

const EARLY_BIRD_OFFERS: Record<string, EarlyBirdOffer> = {
  'act-cram-june-2026': {
    code: 'EARLYBIRDJUNE',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends May 10 at 11:59 PM.',
    expiresAt: '2026-05-10T23:59:59-05:00',
    urgencyLabel: 'Book now and enter code EARLYBIRDJUNE before the cutoff.'
  },
  'act-cram-july-2026': {
    code: 'HAPPY-BDAY-USA',
    savingsLabel: 'Save $49',
    discountedPriceLabel: '$250 Independence Day price',
    deadlineLabel: 'Ends July 10 at 11:59 PM.',
    expiresAt: '2026-07-10T23:59:59-05:00',
    urgencyLabel: 'Book now and enter code HAPPY-BDAY-USA before the cutoff.'
  },
  'act-cram-september-2026': {
    code: 'EARLYBIRDSEPT',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends August 16 at 11:59 PM.',
    expiresAt: '2026-08-16T23:59:59-05:00',
    urgencyLabel: 'Book now and enter code EARLYBIRDSEPT before the cutoff.'
  },
  'act-cram-october-2026': {
    code: 'EARLYBIRDOCT',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends September 13 at 11:59 PM.',
    expiresAt: '2026-09-13T23:59:59-05:00',
    urgencyLabel: 'Book now and enter code EARLYBIRDOCT before the cutoff.'
  },
  'act-cram-december-2026': {
    code: 'EARLYBIRDDEC',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends November 8 at 11:59 PM.',
    expiresAt: '2026-11-08T23:59:59-06:00',
    urgencyLabel: 'Book now and enter code EARLYBIRDDEC before the cutoff.'
  },
  'act-cram-february-2027': {
    code: 'EARLYBIRDFEB',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends January 24 at 11:59 PM.',
    expiresAt: '2027-01-24T23:59:59-06:00',
    urgencyLabel: 'Book now and enter code EARLYBIRDFEB before the cutoff.'
  },
  'act-cram-april-2027': {
    code: 'EARLYBIRDAPR',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends March 7 at 11:59 PM.',
    expiresAt: '2027-03-07T23:59:59-06:00',
    urgencyLabel: 'Book now and enter code EARLYBIRDAPR before the cutoff.'
  },
  'act-cram-june-2027': {
    code: 'EARLYBIRDJUNE',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends May 9 at 11:59 PM.',
    expiresAt: '2027-05-09T23:59:59-05:00',
    urgencyLabel: 'Book now and enter code EARLYBIRDJUNE before the cutoff.'
  },
  'act-cram-july-2027': {
    code: 'EARLYBIRDJULY',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends June 6 at 11:59 PM.',
    expiresAt: '2027-06-06T23:59:59-05:00',
    urgencyLabel: 'Book now and enter code EARLYBIRDJULY before the cutoff.'
  }
};

function isOfferActive(offer: EarlyBirdOffer, now = new Date()) {
  return now.getTime() <= new Date(offer.expiresAt).getTime();
}

export function getEarlyBirdOffer(classSlug: string, now = new Date()) {
  const offer = EARLY_BIRD_OFFERS[classSlug];
  return offer && isOfferActive(offer, now) ? offer : null;
}

export function getActiveEarlyBirdOffers(now = new Date()) {
  return Object.values(EARLY_BIRD_OFFERS).filter((offer) => isOfferActive(offer, now));
}
