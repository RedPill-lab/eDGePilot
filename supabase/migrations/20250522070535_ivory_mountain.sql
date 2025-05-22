/*
  # Database Schema Setup
  
  1. Types
    - Creates enum types for subscription and order status if they don't exist
  2. Tables
    - profiles: User profile information with plan details
    - stripe_customers: Stripe customer mapping
    - stripe_subscriptions: Subscription tracking
    - stripe_orders: Order history
  3. Views
    - stripe_user_subscriptions: Active subscription details
    - stripe_user_orders: Order history view
  4. Security
    - Enables RLS on all tables
    - Sets up appropriate access policies
  5. Automation
    - Adds trigger for new user profile creation
*/

-- Create enums if they don't exist
DO $$ BEGIN
  CREATE TYPE stripe_subscription_status AS ENUM (
    'not_started',
    'incomplete',
    'incomplete_expired',
    'trialing',
    'active',
    'past_due',
    'canceled',
    'unpaid',
    'paused'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE stripe_order_status AS ENUM (
    'pending',
    'completed',
    'canceled'
  );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  plan text NOT NULL DEFAULT 'starter',
  stripe_customer_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_plan CHECK (plan IN ('starter', 'pro', 'edge+'))
);

-- Create stripe_customers table
CREATE TABLE IF NOT EXISTS stripe_customers (
  id bigserial PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users ON DELETE RESTRICT,
  customer_id text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Create stripe_subscriptions table
CREATE TABLE IF NOT EXISTS stripe_subscriptions (
  id bigserial PRIMARY KEY,
  customer_id text NOT NULL UNIQUE,
  subscription_id text,
  price_id text,
  current_period_start bigint,
  current_period_end bigint,
  cancel_at_period_end boolean DEFAULT false,
  payment_method_brand text,
  payment_method_last4 text,
  status stripe_subscription_status NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Create stripe_orders table
CREATE TABLE IF NOT EXISTS stripe_orders (
  id bigserial PRIMARY KEY,
  checkout_session_id text NOT NULL,
  payment_intent_id text NOT NULL,
  customer_id text NOT NULL,
  amount_subtotal bigint NOT NULL,
  amount_total bigint NOT NULL,
  currency text NOT NULL,
  payment_status text NOT NULL,
  status stripe_order_status NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  deleted_at timestamptz
);

-- Create views
CREATE OR REPLACE VIEW stripe_user_subscriptions AS
SELECT 
  s.customer_id,
  s.subscription_id,
  s.status as subscription_status,
  s.price_id,
  s.current_period_start,
  s.current_period_end,
  s.cancel_at_period_end,
  s.payment_method_brand,
  s.payment_method_last4
FROM stripe_subscriptions s
WHERE s.deleted_at IS NULL;

CREATE OR REPLACE VIEW stripe_user_orders AS
SELECT 
  o.customer_id,
  o.id as order_id,
  o.checkout_session_id,
  o.payment_intent_id,
  o.amount_subtotal,
  o.amount_total,
  o.currency,
  o.payment_status,
  o.status as order_status,
  o.created_at as order_date
FROM stripe_orders o
WHERE o.deleted_at IS NULL;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE stripe_orders ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
  DROP POLICY IF EXISTS "Service role can manage all profiles" ON profiles;
  DROP POLICY IF EXISTS "Users can view their own customer data" ON stripe_customers;
  DROP POLICY IF EXISTS "Users can view their own subscription data" ON stripe_subscriptions;
  DROP POLICY IF EXISTS "Users can view their own order data" ON stripe_orders;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Service role can manage all profiles"
  ON profiles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can view their own customer data"
  ON stripe_customers FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() 
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can view their own subscription data"
  ON stripe_subscriptions FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id 
      FROM stripe_customers 
      WHERE user_id = auth.uid() 
      AND deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

CREATE POLICY "Users can view their own order data"
  ON stripe_orders FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id 
      FROM stripe_customers 
      WHERE user_id = auth.uid() 
      AND deleted_at IS NULL
    )
    AND deleted_at IS NULL
  );

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, plan)
  VALUES (new.id, 'starter');
  RETURN new;
END;
$$;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();