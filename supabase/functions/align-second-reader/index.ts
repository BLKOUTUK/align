// Assess & Align — AI second reader.
// Takes a pasted research request and answers the same ten questions a human
// answers in the tool, so the two readings can sit side by side.
//
// Ephemeral by design: no database client, no storage, no logging of the
// pasted text. The text is sent to the model below via OpenRouter and the
// scored answers are returned to the browser.

const MODEL = 'anthropic/claude-sonnet-4';

const QUESTIONS = [
  { id: 'cv-1', text: 'Was the research question developed with the community it affects?' },
  { id: 'cv-2', text: 'Will community members be involved in design, delivery, or analysis?' },
  { id: 'po-1', text: 'Who owns the data? Who controls how findings are used?' },
  { id: 'po-2', text: 'Is funding shared equitably, or does the community just provide access?' },
  { id: 'cs-1', text: 'Does the methodology respect cultural context, rather than transplanting frameworks from other communities?' },
  { id: 'cs-2', text: 'Are the researchers from, or deeply connected to, the community?' },
  { id: 'ba-1', text: 'Will findings be accessible to participants — not just locked behind journal paywalls?' },
  { id: 'ba-2', text: 'Does the research address a priority identified by the community itself?' },
  { id: 'tr-1', text: 'Have the researchers worked with Black communities before? What happened?' },
  { id: 'tr-2', text: 'Is there a feedback mechanism if the partnership isn’t working?' },
];

const VALUES = ['green', 'amber', 'red', 'notstated'];

const ALLOWED_ORIGINS = [
  'https://blkoutuk.github.io',
  'http://localhost:3000',
  'http://localhost:4173',
];

function corsHeaders(origin: string): Record<string, string> {
  const allowed = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };
}

const SYSTEM_PROMPT = `You are a second reader for Assess & Align, a tool that helps Black voluntary sector leaders in the UK evaluate research partnership requests for equity. You will be given the text of a research request or proposal. Answer each of the ten questions below about it.

For each question give:
- "value": one of "green" (yes, clearly evidenced in the text), "amber" (partly, or with significant caveats), "red" (no, or the text indicates the opposite), "notstated" (the text is silent on this).
- "rationale": one or two sentences grounded in the pasted text — point to what the text says or fails to say. Do not invent details that are not in the text.

Be rigorous: warm words without mechanisms score "amber" at best. If the text does not address a question at all, use "notstated", not "red".

Questions:
${QUESTIONS.map((q) => `- ${q.id}: ${q.text}`).join('\n')}

Respond with ONLY a JSON array of ten objects, one per question in the order given, each shaped {"id": "...", "value": "...", "rationale": "..."}. No other text.`;

Deno.serve(async (req) => {
  const headers = {
    ...corsHeaders(req.headers.get('origin') ?? ''),
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(req.headers.get('origin') ?? '') });
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), { status: 405, headers });
  }

  let text: unknown;
  try {
    ({ text } = await req.json());
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400, headers });
  }
  if (typeof text !== 'string' || text.trim().length < 200) {
    return new Response(
      JSON.stringify({ error: 'Paste the text of the research request (at least a few paragraphs).' }),
      { status: 400, headers },
    );
  }
  if (text.length > 60000) {
    return new Response(
      JSON.stringify({ error: 'That text is too long — paste the core of the request (up to ~60,000 characters).' }),
      { status: 400, headers },
    );
  }

  const apiKey = Deno.env.get('OPENROUTER_API_KEY');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Second reader is not configured.' }), { status: 500, headers });
  }

  const orRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 2000,
      temperature: 0.2,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: text },
      ],
    }),
  });

  if (!orRes.ok) {
    return new Response(JSON.stringify({ error: 'The model could not be reached. Try again shortly.' }), {
      status: 502,
      headers,
    });
  }

  const completion = await orRes.json();
  const content: string = completion?.choices?.[0]?.message?.content ?? '';
  const match = content.match(/\[[\s\S]*\]/);
  let answers: Array<{ id: string; value: string; rationale: string }>;
  try {
    answers = JSON.parse(match ? match[0] : content);
  } catch {
    return new Response(JSON.stringify({ error: 'The model returned an unreadable answer. Try again.' }), {
      status: 502,
      headers,
    });
  }

  const byId = new Map(answers.map((a) => [a.id, a]));
  const valid =
    QUESTIONS.every((q) => {
      const a = byId.get(q.id);
      return a && VALUES.includes(a.value) && typeof a.rationale === 'string';
    });
  if (!valid) {
    return new Response(JSON.stringify({ error: 'The model returned an incomplete answer. Try again.' }), {
      status: 502,
      headers,
    });
  }

  return new Response(
    JSON.stringify({ model: MODEL, answers: QUESTIONS.map((q) => byId.get(q.id)) }),
    { headers },
  );
});
