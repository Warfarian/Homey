-- Add destination city to onboarding responses
ALTER TABLE public.onboarding_responses
ADD COLUMN destination_city TEXT;
