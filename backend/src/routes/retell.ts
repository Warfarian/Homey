import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth.js';
import supabase from '../config/database.js';

const router = express.Router();

// Create Retell call
router.post('/create-call', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { to_number } = req.body;
    const userId = req.userId!;
    
    console.log('Creating Retell call for user:', userId, 'to number:', to_number);
    
    if (!to_number) {
      return res.status(400).json({ error: 'Phone number (to_number) is required.' });
    }

    // Format phone number to E.164 format
    let formattedNumber = to_number.replace(/\D/g, '');
    if (formattedNumber.length === 10) {
      formattedNumber = '+1' + formattedNumber;
    } else if (formattedNumber.length === 11 && formattedNumber.startsWith('1')) {
      formattedNumber = '+' + formattedNumber;
    } else if (!formattedNumber.startsWith('+')) {
      formattedNumber = '+' + formattedNumber;
    }

    console.log('Formatted number:', formattedNumber);

    // Get user profile for name
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId)
      .single();

    const retellApiKey = process.env.RETELL_API_KEY;
    if (!retellApiKey) {
      console.error('RETELL_API_KEY not found in environment variables');
      return res.status(500).json({ error: 'RETELL_API_KEY not configured' });
    }
    
    const agentId = process.env.RETELL_AGENT_ID || 'agent_f0a6e5b0a64071d4dbc18fb403';
    console.log('Using agent ID:', agentId);

    const retellPayload = {
      agent_id: agentId,
      from_number: '+13373585199',
      to_number: formattedNumber,
      metadata: {
        user_id: userId,
      },
      retell_llm_dynamic_variables: {
        user_name: profile?.full_name || "there"
      }
    };

    console.log('Calling Retell API with payload:', JSON.stringify(retellPayload, null, 2));

    const retellResponse = await fetch('https://api.retellai.com/v2/create-phone-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(retellPayload),
    });

    console.log('Retell API response status:', retellResponse.status);

    if (!retellResponse.ok) {
      const errorBody = await retellResponse.text();
      console.error('Retell API error:', errorBody);
      return res.status(500).json({ error: `Retell API error: ${errorBody}` });
    }

    const callData = await retellResponse.json();
    console.log('Retell call created successfully:', callData);
    res.json(callData);
  } catch (error) {
    console.error('Create call error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retell webhook
router.post('/webhook', async (req, res) => {
  try {
    const body = req.body;
    console.log("Retell Webhook Payload:", JSON.stringify(body, null, 2));

    // Handle ping
    if (body.ping) {
      console.log("Received ping from Retell.");
      return res.json({ message: "Ping received" });
    }

    if (body.event === 'call_ended' && body.call?.transcript) {
      const userId = body.call.metadata?.user_id;

      if (!userId) {
        return res.status(400).json({ error: "User ID not found in webhook metadata" });
      }

      console.log(`Processing transcript for user ${userId}`);

      // Extract JSON from the transcript
      const transcript = body.call.transcript;
      const jsonMatch = transcript.match(/```json\s*(\{[\s\S]*?\})\s*```/);
      
      if (!jsonMatch) {
        console.log("No JSON found in transcript, skipping onboarding data extraction");
        return res.json({ success: true, message: "No structured data found" });
      }

      let onboardingData;
      try {
        onboardingData = JSON.parse(jsonMatch[1]);
        console.log("Extracted onboarding data:", onboardingData);
      } catch (parseError) {
        console.error("Failed to parse JSON from transcript:", parseError);
        return res.status(400).json({ error: "Invalid JSON in transcript" });
      }

      // Save onboarding responses
      const { error: responseError } = await supabase
        .from('onboarding_responses')
        .upsert({
          user_id: userId,
          transport: onboardingData.transport_methods || [],
          categories: onboardingData.categories || [],
          values: onboardingData.values || [],
          tags: onboardingData.tags || [],
          additional_notes: onboardingData.additional_notes || ''
        });

      if (responseError) {
        console.error('Save onboarding error:', responseError);
        return res.status(500).json({ error: 'Failed to save onboarding data' });
      }

      // Mark onboarding as complete
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ onboarding_completed: true })
        .eq('id', userId);

      if (profileError) {
        console.error('Update profile error:', profileError);
      }

      console.log(`Successfully processed onboarding for user ${userId}`);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Retell webhook error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;