import express from 'express';
import { z } from 'zod';

const router = express.Router();

const chatSchema = z.object({
  messages: z.array(z.object({
    role: z.string(),
    content: z.string(),
  })),
});

router.post('/completion', async (req, res) => {
  try {
    const { messages } = chatSchema.parse(req.body);

    const apiKey = process.env.NEBIUS_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'NEBIUS_API_KEY not configured' });
    }

    console.log("Calling Nebius API...");
    const response = await fetch('https://api.studio.nebius.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-V3',
        messages: messages,
        max_tokens: 512,
        temperature: 0.3,
        top_p: 0.95,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Error from Nebius API: ${response.status} ${response.statusText}`, errorBody);
      return res.status(500).json({ error: `Nebius API error: ${response.statusText}` });
    }

    const data = await response.json();
    const completion = data.choices[0].message.content;

    res.json({ completion });
  } catch (error) {
    console.error('Chat completion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;