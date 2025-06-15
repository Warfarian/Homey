
-- Function to update 'updated_at' column
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table for saved places
CREATE TABLE public.saved_places (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    place_id TEXT NOT NULL,
    name TEXT NOT NULL,
    location TEXT,
    category TEXT NOT NULL,
    match_score INT,
    match_reason TEXT,
    user_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE(user_id, place_id)
);

-- Add comments to the columns for clarity
COMMENT ON COLUMN public.saved_places.place_id IS 'Could be a Google Place ID for consistency.';
COMMENT ON COLUMN public.saved_places.user_notes IS 'Notes added by the user for a saved place.';

-- RLS for saved_places
ALTER TABLE public.saved_places ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own saved places"
ON public.saved_places
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Table for explore recommendations
CREATE TABLE public.explore_recommendations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
    recommendations JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON COLUMN public.explore_recommendations.recommendations IS 'Stores the full JSON response from the recommendation AI.';

-- Trigger for updated_at on explore_recommendations
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.explore_recommendations
FOR EACH ROW
EXECUTE PROCEDURE public.trigger_set_timestamp();

-- RLS for explore_recommendations
ALTER TABLE public.explore_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recommendations"
ON public.explore_recommendations
FOR SELECT
USING (auth.uid() = user_id);

