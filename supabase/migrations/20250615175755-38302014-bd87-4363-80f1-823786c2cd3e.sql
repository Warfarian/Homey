
-- Add a column for optional notes to the onboarding responses table
ALTER TABLE public.onboarding_responses
ADD COLUMN additional_notes TEXT;
