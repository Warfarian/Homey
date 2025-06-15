
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import 'https://deno.land/x/xhr@0.1.0/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()

    if (!messages) {
      return new Response(JSON.stringify({ error: 'messages is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const apiKey = Deno.env.get('NEBIUS_API_KEY')
    if (!apiKey) {
      console.error("NEBIUS_API_KEY is not set in environment variables.");
      throw new Error("NEBIUS_API_KEY is not set in environment variables.");
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
        throw new Error(`Nebius API error: ${response.statusText} - ${errorBody}`);
    }

    const data = await response.json();
    const completion = data.choices[0].message.content;

    return new Response(JSON.stringify({ completion }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in homey-chat-completion function:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
})

