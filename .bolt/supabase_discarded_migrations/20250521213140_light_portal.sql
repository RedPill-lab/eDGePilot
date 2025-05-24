/*
  # Add plan downgrades table

  1. New Tables
    - `plan_downgrades`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `scheduled_for` (timestamptz)
      - `reason` (text)
      - `executed` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `plan_downgrades` table
    - Add policy for service role access
*/

-- Create plan downgrades table
CREATE TABLE IF NOT EXISTS plan_downgrades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  scheduled_for timestamptz NOT NULL,
  reason text NOT NULL,
  executed boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE plan_downgrades ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Service role can manage plan downgrades"
  ON plan_downgrades
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Create function to process downgrades
CREATE OR REPLACE FUNCTION process_plan_downgrades()
RETURNS void AS $$
BEGIN
  -- Update profiles for scheduled downgrades
  UPDATE profiles p
  SET plan = 'starter'
  FROM plan_downgrades d
  WHERE p.id = d.user_id
    AND d.scheduled_for <= now()
    AND NOT d.executed;

  -- Mark downgrades as executed
  UPDATE plan_downgrades
  SET executed = true
  WHERE scheduled_for <= now()
    AND NOT executed;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create cron job to process downgrades
SELECT cron.schedule(
  'process-plan-downgrades',
  '0 * * * *', -- Run hourly
  'SELECT process_plan_downgrades()'
);