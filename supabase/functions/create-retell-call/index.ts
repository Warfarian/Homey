
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
    if (!to_number) {
      return new Response(JSON.stringify({ error: 'Phone number (to_number) is required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user }, } = await supabaseClient.auth.getUser()

    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    // IMPORTANT: Make sure this is your actual Retell Agent ID.
    const agentId = 'agent_b942750aee8fba37f10587192b';

    const retellResponse = await fetch('https://api.retellai.com/create-call', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RETELL_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        from_number: '+15075193337', // Your Retell phone number
        to_number: to_number, // User's phone number from the frontend
        metadata: {
          user_id: user.id,
        },
        retell_llm_dynamic_variables: {
          user_name: user.user_metadata.full_name || "there"
        }
      }),
    })

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
