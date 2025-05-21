import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createCheckoutSession } from '../../lib/stripe';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface CheckoutButtonProps {
  priceId: string;
  mode?: 'subscription' | 'payment';
  className?: string;
  children: React.ReactNode;
}

export function CheckoutButton({
  priceId,
  mode = 'subscription',
  className = '',
  children
}: CheckoutButtonProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (!user) {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    setIsLoading(true);
    try {
      await createCheckoutSession(priceId, mode);
    } catch (err) {
      console.error('Checkout error:', err);
      toast.error('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
  );
}