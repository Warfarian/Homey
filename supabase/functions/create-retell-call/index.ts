import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { to_number } = await req.json();
    console.log('Received request with phone number:', to_number);
    
    if (!to_number) {
      return new Response(JSON.stringify({ error: 'Phone number (to_number) is required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Format phone number to E.164 format
    let formattedNumber = to_number.replace(/\D/g, ''); // Remove all non-digits
    if (formattedNumber.length === 10) {
      formattedNumber = '+1' + formattedNumber; // Add US country code if missing
    } else if (formattedNumber.length === 11 && formattedNumber.startsWith('1')) {
      formattedNumber = '+' + formattedNumber; // Add + if missing
    } else if (!formattedNumber.startsWith('+')) {
      formattedNumber = '+' + formattedNumber; // Add + if missing
    }
    
    console.log('Formatted phone number:', formattedNumber);

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user }, } = await supabaseClient.auth.getUser()
    console.log('User authenticated:', !!user);

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    const retellApiKey = Deno.env.get('RETELL_API_KEY');
    console.log('RETELL_API_KEY exists:', !!retellApiKey);
    
    if (!retellApiKey) {
      throw new Error('RETELL_API_KEY not found in environment variables');
    }
    
    // IMPORTANT: Make sure this is your actual Retell Agent ID.
    const agentId = 'agent_b942750aee8fba37f10587192b';
    console.log('Using agent ID:', agentId);

    const retellResponse = await fetch('https://api.retellai.com/create-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${retellApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        from_number: '+15075193337', // Your Retell phone number
        to_number: formattedNumber, // Use formatted number
        metadata: {
          user_id: user.id,
        },
        retell_llm_dynamic_variables: {
          user_name: user.user_metadata.full_name || "there"
        }
      }),
    })

    console.log('Retell API response status:', retellResponse.status);

    if (!retellResponse.ok) {
      const errorBody = await retellResponse.text();
      console.error('Retell API error:', errorBody);
       try {
        const parsedError = JSON.parse(errorBody);
        throw new Error(parsedError.error || 'Failed to create call with Retell AI');
      } catch {
        throw new Error('Failed to create call with Retell AI. Check your Retell API key and Agent ID.');
      }
    }

    const callData = await retellResponse.json();

    return new Response(JSON.stringify(callData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error creating Retell call:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
