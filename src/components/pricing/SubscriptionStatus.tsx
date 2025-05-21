import { useSubscription } from '../../hooks/useSubscription';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export function SubscriptionStatus() {
  const { 
    subscription,
    isLoading,
    error,
    isActive,
    isTrialing,
    isCanceled,
    willCancel,
    currentPeriodEnd
  } = useSubscription();

  if (isLoading) {
    return (
      <div className="animate-pulse bg-card-foreground/5 p-4 rounded-lg">
        <div className="h-4 bg-foreground/10 rounded w-3/4"></div>
        <div className="h-4 bg-foreground/10 rounded w-1/2 mt-2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-error/10 text-error p-4 rounded-lg flex items-center">
        <AlertTriangle className="w-5 h-5 mr-2" />
        <p>{error}</p>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="bg-card-foreground/5 p-4 rounded-lg">
        <p>No active subscription</p>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg ${
      isActive ? 'bg-success/10' :
      isTrialing ? 'bg-primary/10' :
      'bg-warning/10'
    }`}>
      <div className="flex items-center">
        {isActive && <CheckCircle className="w-5 h-5 text-success mr-2" />}
        {isTrialing && <Clock className="w-5 h-5 text-primary mr-2" />}
        
        <div>
          <p className="font-medium">
            {isActive && 'Active Subscription'}
            {isTrialing && 'Trial Period'}
            {isCanceled && 'Subscription Canceled'}
          </p>
          
          {currentPeriodEnd && (
            <p className="text-sm text-foreground/70">
              {willCancel 
                ? `Expires on ${currentPeriodEnd.toLocaleDateString()}`
                : `Next billing date: ${currentPeriodEnd.toLocaleDateString()}`
              }
            </p>
          )}
        </div>
      </div>

      {subscription.payment_method_brand && (
        <div className="mt-2 text-sm text-foreground/70">
          Payment method: {subscription.payment_method_brand.toUpperCase()} 
          ending in {subscription.payment_method_last4}
        </div>
      )}
    </div>
  );
}