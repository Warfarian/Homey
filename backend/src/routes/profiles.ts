import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import supabase from '../config/database.js';
import { z } from 'zod';

const router = express.Router();

const updateProfileSchema = z.object({
  full_name: z.string().optional(),
  age: z.number().optional(),
  gender: z.string().optional(),
  destination_city: z.string().optional(),
});

// Get profile
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update profile
router.put('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const updates = updateProfileSchema.parse(req.body);
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Update profile error:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    res.json(data);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;