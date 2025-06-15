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
    const body = await req.json();
    console.log("Retell Webhook Payload:", JSON.stringify(body, null, 2));

    // Retell sends a test payload on webhook setup
    if (body.ping) {
        console.log("Received ping from Retell.");
        return new Response(JSON.stringify({ message: "Ping received" }), { status: 200, headers: corsHeaders });
    }

    if (body.event === 'call_ended' && body.call?.transcript) {
        const userId = body.call.metadata?.user_id;

        if (!userId) {
            throw new Error("User ID not found in webhook metadata");
        }

        console.log(`Processing transcript for user ${userId}`);

        // Extract JSON from the transcript
        const transcript = body.call.transcript;
        const jsonMatch = transcript.match(/```json\s*(\{[\s\S]*?\})\s*```/);
        
        if (!jsonMatch) {
            console.log("No JSON found in transcript, skipping onboarding data extraction");
            return new Response(JSON.stringify({ success: true, message: "No structured data found" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        let onboardingData;
        try {
            onboardingData = JSON.parse(jsonMatch[1]);
            console.log("Extracted onboarding data:", onboardingData);
        } catch (parseError) {
            console.error("Failed to parse JSON from transcript:", parseError);
            throw new Error("Invalid JSON in transcript");
        }

        const supabaseAdmin = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
            { auth: { persistSession: false } }
        );

        // Save onboarding responses
        const { error: responseError } = await supabaseAdmin
            .from('onboarding_responses')
            .upsert({
                user_id: userId,
                transport: onboardingData.transport_methods || [],
                categories: onboardingData.categories || [],
                values: onboardingData.values || [],
                tags: onboardingData.tags || [],
                additional_notes: onboardingData.additional_notes || ''
            }, { onConflict: 'user_id' });

        if (responseError) throw responseError;
        console.log(`Successfully saved onboarding responses for user ${userId}`);

        // Mark onboarding as complete
        const { error: profileError } = await supabaseAdmin
            .from('profiles')
            .update({ onboarding_completed: true })
            .eq('id', userId);

        if (profileError) throw profileError;
        console.log(`Successfully marked onboarding as complete for user ${userId}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error in Retell webhook:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
