import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import supabase from '../config/database.js';

const router = express.Router();

const ALL_CATEGORIES = [
    'Food & Drink', 'Entertainment', 'Shopping', 'Wellness & Fitness', 
    'Outdoors & Recreation', 'Arts & Culture', 'Nightlife', 'Family Friendly'
];

// Get recommendations
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    
    const { data, error } = await supabase
      .from('explore_recommendations')
      .select('recommendations, updated_at')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Get recommendations error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!data) {
      return res.json({ recommendations: null });
    }

    const oneDay = 24 * 60 * 60 * 1000;
    
    // Check if recommendations are stale
    if (!data.recommendations || (new Date().getTime() - new Date(data.updated_at).getTime()) > oneDay) {
      return res.json({ recommendations: null, stale: true });
    }

    res.json({ recommendations: data.recommendations });
  } catch (error) {
    console.error('Get recommendations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate new recommendations
router.post('/generate', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    
    // Get user profile for destination city
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('destination_city')
      .eq('id', userId)
      .single();

    if (profileError || !profile?.destination_city) {
      return res.status(400).json({ error: 'Destination city not found in profile' });
    }

    // Get onboarding data
    const { data: onboardingData, error: onboardingError } = await supabase
      .from('onboarding_responses')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (onboardingError || !onboardingData) {
      return res.status(400).json({ error: 'Onboarding data not found' });
    }

    const city = profile.destination_city;
    
    const RECOMMENDATIONS_PER_CATEGORY = 6; // Reduced from 8
    const totalRecommendations = RECOMMENDATIONS_PER_CATEGORY * ALL_CATEGORIES.length;
    
    const prompt = `Generate exactly ${RECOMMENDATIONS_PER_CATEGORY} place recommendations in ${city} for EACH category: ${ALL_CATEGORIES.join(', ')}.

User preferences:
- City: ${city}
- Values: ${onboardingData.values?.join(', ') || 'Not specified'}
- Categories: ${onboardingData.categories?.join(', ') || 'Not specified'}
- Transport: ${onboardingData.transport?.join(', ') || 'Not specified'}

Return only a JSON array with ${totalRecommendations} objects. Each object must have: place_id, name, location, category, match_reason, match_score (50-100), google_maps_link.

Example:
[{"place_id":"${city.toLowerCase().replace(/[^a-z0-9]/g, '_')}_001","name":"Local Cafe","location":"123 Main St, ${city}","category":"Food & Drink","match_reason":"Great for your preferences","match_score":85,"google_maps_link":"https://www.google.com/maps/search/?api=1&query=Local+Cafe+${encodeURIComponent(city)}"}]`;

    const apiKey = process.env.NEBIUS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'NEBIUS_API_KEY not configured' });
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
        max_tokens: 4096, // Reduced from 8192
        temperature: 0.3, // Reduced for faster, more consistent responses
        top_p: 0.9, // Reduced from 0.95
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error from Nebius API: ${response.status} ${response.statusText}`, errorBody);
      return res.status(500).json({ error: `Nebius API error: ${response.statusText}` });
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

    // Save recommendations
    const { error: upsertError } = await supabase
      .from('explore_recommendations')
      .upsert({
        user_id: userId,
        recommendations
      });

    if (upsertError) {
      console.error('Save recommendations error:', upsertError);
      return res.status(500).json({ error: 'Failed to save recommendations' });
    }
    
    res.json({ recommendations });
  } catch (error) {
    console.error('Generate recommendations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;