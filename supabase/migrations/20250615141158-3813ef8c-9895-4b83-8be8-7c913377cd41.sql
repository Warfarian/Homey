
-- Add an 'onboarding_completed' flag to the profiles table
ALTER TABLE public.profiles
ADD COLUMN onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE;

-- Create a table to store the onboarding responses
CREATE TABLE public.onboarding_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  transport TEXT[],
  categories TEXT[],
  "values" TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on the profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for the profiles table
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Enable Row Level Security on the new onboarding_responses table
ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;

-- Add RLS policies for the new onboarding_responses table
CREATE POLICY "Users can manage their own onboarding responses"
  ON public.onboarding_responses
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
