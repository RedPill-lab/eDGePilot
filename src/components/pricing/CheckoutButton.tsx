```tsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { usePricing } from '../../hooks/usePricing';
import { PlanType, BillingInterval } from '../../types/pricing';
import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  planId: PlanType;
  billingInterval?: BillingInterval;
  className?: string;
  children: React.ReactNode;
}

export const CheckoutButton = ({
  planId,
  billingInterval = BillingInterval.MONTHLY,
  className = '',
  children
}: CheckoutButtonProps) => {
  const { isAuthenticated } = useAuth();
  const { startTrial, subscribe, isLoading } = usePricing();
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (!isAuthenticated) {
      window.location.href = '/login?redirect=/pricing';
      return;
    }

    setError(null);
    try {
      const plan = pricingConfig.plans.find(p => p.id === planId);
      if (plan?.trialEnabled) {
        await startTrial(planId);
      } else {
        await subscribe(planId, billingInterval);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to start checkout. Please try again.');
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isLoading}
        className={`relative ${className}`}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          children
        )}
      </button>
      {error && (
        <p className="text-sm text-error mt-2">{error}</p>
      )}
    </>
  );
};
```