import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import supabase from '../config/database.js';
import { z } from 'zod';

const router = express.Router();

const onboardingSchema = z.object({
  transport: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  values: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  additional_notes: z.string().optional(),
  destination_city: z.string().optional(),
});

// Get onboarding responses
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    
    const { data, error } = await supabase
      .from('onboarding_responses')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Get onboarding error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(data);
  } catch (error) {
    console.error('Get onboarding error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save/update onboarding responses
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const data = onboardingSchema.parse(req.body);
    
    const { data: result, error } = await supabase
      .from('onboarding_responses')
      .upsert({
        user_id: userId,
        transport: data.transport || [],
        categories: data.categories || [],
        values: data.values || [],
        tags: data.tags || [],
        additional_notes: data.additional_notes || '',
        destination_city: data.destination_city || ''
      })
      .select()
      .single();

    if (error) {
      console.error('Save onboarding error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Mark onboarding as complete
    await supabase
      .from('profiles')
      .update({ onboarding_completed: true })
      .eq('id', userId);

    res.json(result);
  } catch (error) {
    console.error('Save onboarding error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;