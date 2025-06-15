
-- Enable Row Level Security on the onboarding_responses table
ALTER TABLE public.onboarding_responses ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to view their own onboarding responses
CREATE POLICY "Users can view their own onboarding responses"
ON public.onboarding_responses FOR SELECT
USING (auth.uid() = user_id);

-- Policy to allow users to create their own onboarding responses
CREATE POLICY "Users can create their own onboarding responses"
ON public.onboarding_responses FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own onboarding responses
CREATE POLICY "Users can update their own onboarding responses"
ON public.onboarding_responses FOR UPDATE
USING (auth.uid() = user_id);

-- Policy to allow users to delete their own onboarding responses
CREATE POLICY "Users can delete their own onboarding responses"
ON public.onboarding_responses FOR DELETE
USING (auth.uid() = user_id);
