// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const apiKey = Deno.env.get('AUTO_PASS_API_TOKEN');
const autoPassUrl = 'https://api.autopass.pro/vehicule';

serve(async (req) => {
  const { license_number } = await req.json();

  const response = await fetch(
    `${autoPassUrl}?reg_or_vin=${license_number}&reg_country=fr&access_token=${apiKey}`
  );
  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
      status: response.status,
      statusText: response.statusText,
    });
  }

  if (data.code === 'ERROR' && data.error.message_text === 'API.UNKNOWN_VEHICLE') {
    return new Response(JSON.stringify(data.error), {
      headers: { 'Content-Type': 'application/json' },
      status: 404,
      statusText: 'Vehicle not found.',
    });
  }

  if (data.code === 'ERROR') {
    return new Response(JSON.stringify(data.error), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
      statusText: data.error.message_text,
    });
  }

  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
