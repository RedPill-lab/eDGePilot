```tsx
import { CheckCircle } from 'lucide-react';
import { Plan, BillingInterval } from '../../types/pricing';
import { CheckoutButton } from './CheckoutButton';

interface PricingCardProps {
  plan: Plan;
  isPopular?: boolean;
  billingInterval: BillingInterval;
}

export const PricingCard = ({
  plan,
  isPopular,
  billingInterval
}: PricingCardProps) => {
  const price = billingInterval === BillingInterval.ANNUAL
    ? plan.annualPrice || plan.monthlyPrice * 12
    : plan.monthlyPrice;

  return (
    <div className={`pricing-tier ${isPopular ? 'popular' : ''}`}>
      {isPopular && (
        <div className="popular-badge">✨ Most Popular</div>
      )}

      <h3>{plan.name} <span className="price">${price}/month</span></h3>
      <p className="text-sm font-medium mb-4">{plan.description}</p>

      <ul className="space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <CheckCircle className={`w-5 h-5 mr-2 ${
              feature.included ? 'text-success' : 'text-foreground/30'
            }`} />
            <span>{feature.name}</span>
          </li>
        ))}
      </ul>

      <CheckoutButton
        planId={plan.id}
        billingInterval={billingInterval}
        className="cta-button w-full"
      >
        {plan.trialEnabled
          ? `Try ${plan.trialDays} Days for $${plan.trialPrice}`
          : 'Get Started'}
      </CheckoutButton>

      {billingInterval === BillingInterval.ANNUAL && (
        <p className="mt-2 text-xs text-center text-foreground/70">
          Save {Math.round(((plan.monthlyPrice * 12) - (plan.annualPrice || 0)) / (plan.monthlyPrice * 12) * 100)}% with annual billing
        </p>
      )}
    </div>
  );
};
```