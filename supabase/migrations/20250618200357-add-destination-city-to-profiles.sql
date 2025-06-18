-- Add destination city to profiles table
ALTER TABLE public.profiles
ADD COLUMN destination_city TEXT;
