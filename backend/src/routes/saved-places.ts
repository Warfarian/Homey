import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import supabase from '../config/database.js';
import { z } from 'zod';

const router = express.Router();

const savePlaceSchema = z.object({
  place_id: z.string(),
  name: z.string(),
  location: z.string().optional(),
  category: z.string(),
  match_score: z.number().optional(),
  match_reason: z.string().optional(),
  google_maps_link: z.string().optional(),
  user_notes: z.string().optional(),
});

// Get saved places
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    
    const { data, error } = await supabase
      .from('saved_places')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Get saved places error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.json(data || []);
  } catch (error) {
    console.error('Get saved places error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save a place
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const placeData = savePlaceSchema.parse(req.body);
    
    const { data, error } = await supabase
      .from('saved_places')
      .insert({
        user_id: userId,
        ...placeData
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return res.status(409).json({ error: 'Place already saved' });
      }
      console.error('Save place error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(201).json(data);
  } catch (error) {
    console.error('Save place error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a saved place
router.delete('/:placeId', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const { placeId } = req.params;
    
    const { data, error } = await supabase
      .from('saved_places')
      .delete()
      .eq('user_id', userId)
      .eq('place_id', placeId)
      .select();

    if (error) {
      console.error('Delete saved place error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Saved place not found' });
    }

    res.json({ message: 'Place removed from saved places' });
  } catch (error) {
    console.error('Delete saved place error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;