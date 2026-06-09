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
    code: 'EARLYBIRDJULY',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends June 7 at 11:59 PM.',
    expiresAt: '2026-06-07T23:59:59-05:00',
    urgencyLabel: 'Book now and enter code EARLYBIRDJULY before the cutoff.'
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
