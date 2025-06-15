
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

    if (body.event === 'conversation_ended' && body.transcript_object) {
        const lastTurn = body.transcript_object[body.transcript_object.length - 1];

        if (lastTurn.role === 'agent' && lastTurn.function_call?.name === 'save_onboarding_preferences') {
            const args = JSON.parse(lastTurn.function_call.arguments);
            const userId = body.metadata?.user_id;

            if (!userId) {
                throw new Error("User ID not found in webhook metadata");
            }

            const supabaseAdmin = createClient(
                Deno.env.get('SUPABASE_URL') ?? '',
                Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
                { auth: { persistSession: false } }
            );

            console.log(`Saving preferences for user ${userId}:`, args);

            const { error: responseError } = await supabaseAdmin
                .from('onboarding_responses')
                .upsert({
                    user_id: userId,
                    transport: args.transport_methods,
                    categories: args.categories,
                    values: args.values,
                    tags: args.tags,
                    additional_notes: args.additional_notes
                }, { onConflict: 'user_id' });

            if (responseError) throw responseError;
            console.log(`Successfully saved onboarding responses for user ${userId}`);

            const { error: profileError } = await supabaseAdmin
                .from('profiles')
                .update({ onboarding_completed: true })
                .eq('id', userId);

            if (profileError) throw profileError;
            console.log(`Successfully marked onboarding as complete for user ${userId}`);
        }
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
