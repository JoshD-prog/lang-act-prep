export type EarlyBirdOffer = {
  code: string;
  savingsLabel: string;
  discountedPriceLabel: string;
  deadlineLabel: string;
  urgencyLabel: string;
};

const EARLY_BIRD_OFFERS: Record<string, EarlyBirdOffer> = {
  'act-cram-june-2026': {
    code: 'EARLYBIRDJUNE',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends May 10 at 11:59 PM.',
    urgencyLabel: 'Book now and enter code EARLYBIRDJUNE before the May 10 cutoff.'
  },
  'act-cram-july-2026': {
    code: 'EARLYBIRDJULY',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends June 7 at 11:59 PM.',
    urgencyLabel: 'Book now and enter code EARLYBIRDJULY before the June 7 cutoff.'
  },
  'act-cram-september-2026': {
    code: 'EARLYBIRDSEPT',
    savingsLabel: 'Save $50',
    discountedPriceLabel: '$249 early-bird price',
    deadlineLabel: 'Ends August 16 at 11:59 PM.',
    urgencyLabel: 'Book now and enter code EARLYBIRDSEPT before the August 16 cutoff.'
  }
};

export function getEarlyBirdOffer(classSlug: string) {
  return EARLY_BIRD_OFFERS[classSlug] ?? null;
}

export const earlyBirdOffers = Object.values(EARLY_BIRD_OFFERS);
