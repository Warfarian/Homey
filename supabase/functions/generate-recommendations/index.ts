
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import 'https://deno.land/x/xhr@0.1.0/mod.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const ALL_CATEGORIES = [
    'Food & Drink', 'Entertainment', 'Shopping', 'Wellness & Fitness', 
    'Outdoors & Recreation', 'Arts & Culture', 'Nightlife', 'Family Friendly'
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders })
  }

  try {
    const { userId } = await req.json()
    if (!userId) {
      throw new Error("User ID is required.");
    }
    
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: onboardingData, error: onboardingError } = await supabaseAdmin
      .from('onboarding_responses')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (onboardingError || !onboardingData) {
      throw new Error(`Could not fetch onboarding data for user ${userId}: ${onboardingError?.message}`);
    }

    const totalRecommendations = 15 * ALL_CATEGORIES.length;
    const prompt = `
      Based on the following user preferences, generate a list of 15 tailored place recommendations in San Francisco, CA for EACH of the following categories: ${ALL_CATEGORIES.join(', ')}.
      This should result in a total of ${totalRecommendations} recommendations in the final JSON array.
      The user's preferences are:
      - Interests/Values: ${onboardingData.values?.join(', ') || 'Not specified'}
      - Preferred Categories: ${onboardingData.categories?.join(', ') || 'Not specified'}
      - Preferred Tags: ${onboardingData.tags?.join(', ') || 'Not specified'}
      - Transportation Methods: ${onboardingData.transport?.join(', ') || 'Not specified'}
      - Additional Notes: ${onboardingData.additional_notes || 'None'}

      For each recommendation, provide the following details in a single valid JSON array of objects. Do NOT include any text outside of the JSON array.
      Each object in the array must have these exact keys: "place_id", "name", "location", "category", "match_reason", "match_score", "google_maps_link".
      - "place_id": A unique string identifier for the place (e.g., "place_sfo_123").
      - "name": The name of the place.
      - "location": A realistic-looking street address in San Francisco, CA.
      - "category": The category from the list above.
      - "match_reason": A short, compelling reason why this place matches the user's preferences.
      - "match_score": A number between 70 and 100 indicating how good the match is. Base this score on how well it aligns with the user's specific interests. The user's selected categories should have higher scores.
      - "google_maps_link": A valid Google Maps search URL for the place name and location. For example: "https://www.google.com/maps/search/?api=1&query=Tartine+Bakery+San+Francisco+CA".

      Example of a single recommendation object:
      {
        "place_id": "sfo_bakery_001",
        "name": "Tartine Bakery",
        "location": "600 Guerrero St, San Francisco, CA 94110",
        "category": "Food & Drink",
        "match_reason": "Your interest in 'Artisanal' and 'Cafes' makes this famous bakery a perfect spot for you.",
        "match_score": 95,
        "google_maps_link": "https://www.google.com/maps/search/?api=1&query=Tartine+Bakery+San+Francisco+CA"
      }
    `;
    
    const apiKey = Deno.env.get('NEBIUS_API_KEY')
    if (!apiKey) {
      throw new Error("NEBIUS_API_KEY is not set in environment variables.");
    }
    
    console.log("Calling Nebius API to generate recommendations...");
    const response = await fetch('https://api.studio.nebius.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 16384,
        temperature: 0.5,
        top_p: 0.95,
      }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        console.error(`Error from Nebius API: ${response.status} ${response.statusText}`, errorBody);
        throw new Error(`Nebius API error: ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();
    let completion = data.choices[0].message.content;

    if (completion.startsWith('```json')) {
      completion = completion.substring(7, completion.length - 3).trim();
    }
    
    let recommendations = JSON.parse(completion);
    if (recommendations.recommendations) {
        recommendations = recommendations.recommendations;
    }

    const { error: upsertError } = await supabaseAdmin
      .from('explore_recommendations')
      .upsert({ user_id: userId, recommendations, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });

    if (upsertError) {
      throw new Error(`Could not save recommendations: ${upsertError.message}`);
    }
    
    return new Response(JSON.stringify({ recommendations }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-recommendations function:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})
