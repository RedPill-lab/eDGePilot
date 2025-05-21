import { PlanType } from '../types/pricing';

export const stripePrices = {
  [PlanType.STARTER]: {
    id: 'price_1RRKbdIrwaPe3BUiS7QJF8di',
    mode: 'subscription' as const
  },
  [PlanType.FUNDED]: {
    id: 'price_1RRKc5IrwaPe3BUiambSRJji',
    mode: 'subscription' as const
  },
  [PlanType.INSTITUTIONAL]: {
    id: 'price_1RRKdzIrwaPe3BUiG6cZxc2E',
    mode: 'subscription' as const
  },
  'prop-tools': {
    id: 'price_1RRKgZIrwaPe3BUiExV6o2gc',
    mode: 'subscription' as const
  }
};

export const getStripePriceId = (planId: PlanType | string): string => {
  const price = stripePrices[planId as keyof typeof stripePrices];
  if (!price) throw new Error(`Invalid plan ID: ${planId}`);
  return price.id;
};

export const getStripeMode = (planId: PlanType | string): 'subscription' | 'payment' => {
  const price = stripePrices[planId as keyof typeof stripePrices];
  if (!price) throw new Error(`Invalid plan ID: ${planId}`);
  return price.mode;
};