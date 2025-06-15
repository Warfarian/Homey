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
    console.log('=== Function started ===');
    
    // Parse request body
    let requestBody;
    try {
      requestBody = await req.json();
      console.log('Request body parsed successfully');
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      throw new Error('Invalid JSON in request body');
    }

    const { to_number } = requestBody;
    console.log('Received request with phone number:', to_number);
    
    if (!to_number) {
      console.log('ERROR: No phone number provided');
      return new Response(JSON.stringify({ error: 'Phone number (to_number) is required.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Format phone number to E.164 format
    console.log('Formatting phone number...');
    let formattedNumber = to_number.replace(/\D/g, ''); // Remove all non-digits
    if (formattedNumber.length === 10) {
      formattedNumber = '+1' + formattedNumber; // Add US country code if missing
    } else if (formattedNumber.length === 11 && formattedNumber.startsWith('1')) {
      formattedNumber = '+' + formattedNumber; // Add + if missing
    } else if (!formattedNumber.startsWith('+')) {
      formattedNumber = '+' + formattedNumber; // Add + if missing
    }
    
    console.log('Formatted phone number:', formattedNumber);

    // Create Supabase client
    console.log('Creating Supabase client...');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
    
    console.log('SUPABASE_URL exists:', !!supabaseUrl);
    console.log('SUPABASE_ANON_KEY exists:', !!supabaseAnonKey);
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    const authHeader = req.headers.get('Authorization');
    console.log('Authorization header exists:', !!authHeader);
    
    if (!authHeader) {
      console.log('ERROR: No authorization header');
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      supabaseUrl,
      supabaseAnonKey,
      { global: { headers: { Authorization: authHeader } } }
    )

    // Get user
    console.log('Getting user authentication...');
    let user;
    try {
      const { data: { user: authUser }, error: authError } = await supabaseClient.auth.getUser();
      
      if (authError) {
        console.error('Auth error:', authError);
        throw new Error(`Authentication failed: ${authError.message}`);
      }
      
      user = authUser;
      console.log('User authenticated:', !!user);
      console.log('User ID:', user?.id);
    } catch (authError) {
      console.error('Failed to get user:', authError);
      throw new Error(`User authentication failed: ${authError.message}`);
    }

    if (!user) {
      console.log('ERROR: No authenticated user');
      return new Response(JSON.stringify({ error: 'Unauthorized - no user found' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    // Check Retell API key
    console.log('Checking Retell API key...');
    const retellApiKey = Deno.env.get('RETELL_API_KEY');
    console.log('RETELL_API_KEY exists:', !!retellApiKey);
    console.log('RETELL_API_KEY length:', retellApiKey?.length || 0);
    
    if (!retellApiKey) {
      console.log('ERROR: RETELL_API_KEY not found in environment variables');
      throw new Error('RETELL_API_KEY not found in environment variables');
    }
    
    // Agent ID
    const agentId = 'agent_f0a6e5b0a64071d4dbc18fb403';
    console.log('Using agent ID:', agentId);

    // Prepare Retell API call
    const retellPayload = {
      agent_id: agentId,
      from_number: '+1337358-5199',
      to_number: formattedNumber,
      metadata: {
        user_id: user.id,
      },
      retell_llm_dynamic_variables: {
        user_name: user.user_metadata?.full_name || "there"
      }
    };
    
    console.log('Retell payload:', JSON.stringify(retellPayload, null, 2));

    // Call Retell API
    console.log('Calling Retell API...');
    let retellResponse;
    try {
      retellResponse = await fetch('https://api.retellai.com/v2/create-phone-call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${retellApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(retellPayload),
      });
      
      console.log('Retell API response status:', retellResponse.status);
      console.log('Retell API response headers:', Object.fromEntries(retellResponse.headers.entries()));
    } catch (fetchError) {
      console.error('Failed to call Retell API:', fetchError);
      throw new Error(`Failed to call Retell API: ${fetchError.message}`);
    }

    if (!retellResponse.ok) {
      const errorBody = await retellResponse.text();
      console.error('Retell API error response:', errorBody);
      console.error('Retell API status:', retellResponse.status);
      console.error('Retell API status text:', retellResponse.statusText);
      
      try {
        const parsedError = JSON.parse(errorBody);
        throw new Error(`Retell API error: ${parsedError.error || parsedError.message || 'Unknown error'}`);
      } catch {
        throw new Error(`Retell API error (${retellResponse.status}): ${errorBody || retellResponse.statusText}`);
      }
    }

    let callData;
    try {
      callData = await retellResponse.json();
      console.log('Retell API success response:', JSON.stringify(callData, null, 2));
    } catch (parseError) {
      console.error('Failed to parse Retell response:', parseError);
      throw new Error('Failed to parse Retell API response');
    }

    console.log('=== Function completed successfully ===');
    return new Response(JSON.stringify(callData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('=== Function error ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return new Response(JSON.stringify({ 
      error: error.message,
      type: error.constructor.name 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
