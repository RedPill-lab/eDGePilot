```tsx
import { useState } from 'react';
import { pricingConfig } from '../../config/pricing';
import { BillingInterval } from '../../types/pricing';
import { PricingCard } from './PricingCard';

export const PricingSection = () => {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>(
    BillingInterval.MONTHLY
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-center text-lg text-foreground/70 mb-12">
          Choose the plan that fits your trading style
        </p>

        <div className="flex justify-center mb-8">
          <div className="bg-card-foreground/5 p-1 rounded-full">
            <button
              onClick={() => setBillingInterval(BillingInterval.MONTHLY)}
              className={`px-4 py-2 rounded-full text-sm ${
                billingInterval === BillingInterval.MONTHLY
                  ? 'bg-primary text-white'
                  : 'hover:bg-secondary/10'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingInterval(BillingInterval.ANNUAL)}
              className={`px-4 py-2 rounded-full text-sm ${
                billingInterval === BillingInterval.ANNUAL
                  ? 'bg-primary text-white'
                  : 'hover:bg-secondary/10'
              }`}
            >
              Annual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingConfig.plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isPopular={index === 1}
              billingInterval={billingInterval}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
```