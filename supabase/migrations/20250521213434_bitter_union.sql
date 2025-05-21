/*
  # Plan Downgrades System

  1. New Tables
    - `plan_downgrades`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `scheduled_for` (timestamptz)
      - `reason` (text)
      - `executed` (boolean)
      - `created_at` (timestamptz)

  2. Functions
    - `process_plan_downgrades()`: Processes due downgrades
    - `schedule_plan_downgrade()`: Schedules a new downgrade

  3. Security
    - Enable RLS on plan_downgrades
    - Service role policy for management
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
RETURNS TABLE (
  processed_count int,
  processed_users uuid[]
) AS $$
DECLARE
  v_processed_count int;
  v_processed_users uuid[];
BEGIN
  -- Create temp table for users to process
  CREATE TEMP TABLE users_to_downgrade AS
  SELECT DISTINCT user_id
  FROM plan_downgrades
  WHERE scheduled_for <= now()
    AND NOT executed;

  -- Update profiles for scheduled downgrades
  UPDATE profiles p
  SET plan = 'starter'
  FROM users_to_downgrade d
  WHERE p.id = d.user_id;

  -- Mark downgrades as executed
  WITH processed AS (
    UPDATE plan_downgrades
    SET executed = true
    WHERE scheduled_for <= now()
      AND NOT executed
    RETURNING user_id
  )
  SELECT 
    COUNT(*)::int,
    ARRAY_AGG(user_id)
  INTO v_processed_count, v_processed_users
  FROM processed;

  -- Drop temp table
  DROP TABLE users_to_downgrade;

  -- Return results
  RETURN QUERY SELECT v_processed_count, v_processed_users;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to schedule a downgrade
CREATE OR REPLACE FUNCTION schedule_plan_downgrade(
  p_user_id uuid,
  p_days_until_downgrade int,
  p_reason text
)
RETURNS uuid AS $$
DECLARE
  v_downgrade_id uuid;
BEGIN
  INSERT INTO plan_downgrades (
    user_id,
    scheduled_for,
    reason
  ) VALUES (
    p_user_id,
    now() + (p_days_until_downgrade || ' days')::interval,
    p_reason
  )
  RETURNING id INTO v_downgrade_id;

  RETURN v_downgrade_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;