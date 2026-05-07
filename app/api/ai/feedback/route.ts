import { NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  question: z.object({
    id: z.string(),
    type: z.enum(['mcq', 'short-answer', 'order-steps', 'scenario-response', 'explain-it-simply']),
    prompt: z.string(),
    modelAnswer: z.string(),
    explanation: z.string().optional().default(''),
    rubric: z.array(z.string()).optional().default([]),
    commonMistakes: z.array(z.string()).optional().default([]),
    dcsContext: z.string().optional().default('')
  }),
  draft: z.object({
    answerText: z.string().optional().default(''),
    selectedOptionText: z.string().optional().default(''),
    orderedStepsText: z.string().optional().default(''),
    reasoning: z.string().optional().default(''),
    judgement: z.string().optional().default('')
  })
});

type FeedbackResponse = {
  overall: 'strong' | 'partial' | 'off-track';
  summary: string;
  missingPoints: string[];
  suggestedNextEdit: string;
};

function buildMessages(input: z.infer<typeof requestSchema>) {
  const { question, draft } = input;

  const system = [
    'You are a strict but kind IT-support coach.',
    'Give realtime feedback on a draft answer while the user is still typing.',
    'Be concise and specific. Do not be patronizing.',
    'Never request or include sensitive school data, credentials, or personal information.',
    'Focus on: correctness, reasoning quality, and risk/judgement for a Level 1 support context.'
  ].join(' ');

  const user = [
    'Evaluate the user draft against the model answer and rubric.',
    'Return ONLY valid JSON with keys: overall, summary, missingPoints, suggestedNextEdit.',
    '',
    `Question (${question.type}): ${question.prompt}`,
    '',
    `Model answer: ${question.modelAnswer}`,
    question.rubric.length ? `Rubric: ${question.rubric.join(' | ')}` : '',
    question.commonMistakes.length ? `Common mistakes: ${question.commonMistakes.join(' | ')}` : '',
    question.dcsContext ? `DCS context: ${question.dcsContext}` : '',
    '',
    `User draft answer: ${draft.answerText || ''}`,
    `User draft selected option: ${draft.selectedOptionText || ''}`,
    `User draft ordered steps: ${draft.orderedStepsText || ''}`,
    `User draft reasoning: ${draft.reasoning || ''}`,
    `User draft judgement: ${draft.judgement || ''}`
  ]
    .filter(Boolean)
    .join('\n');

  return {
    system,
    user
  };
}

async function callGroq(messages: { system: string; user: string }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { ok: false as const, status: 500, body: { error: 'GROQ_API_KEY is not configured on the server.' } };
  }

  const preferredModel = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile';
  const fallbackModels = ['llama-3.3-70b-versatile'];
  const modelsToTry = [preferredModel, ...fallbackModels.filter((model) => model !== preferredModel)];

  for (const model of modelsToTry) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        max_tokens: 220,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: messages.system },
          { role: 'user', content: messages.user }
        ]
      })
    });

    if (response.ok) {
      const data = (await response.json()) as any;
      const content: string | undefined = data?.choices?.[0]?.message?.content;
      if (!content) {
        return { ok: false as const, status: 502, body: { error: 'Groq returned an empty response.' } };
      }

      return { ok: true as const, status: 200, body: { content } };
    }

    const errorText = await response.text().catch(() => '');
    const decommissioned = /model_decommissioned|decommissioned|no longer supported/i.test(errorText);
    if (!decommissioned) {
      return {
        ok: false as const,
        status: response.status,
        body: { error: 'Groq request failed', detail: errorText || `HTTP ${response.status}` }
      };
    }
  }

  return {
    ok: false as const,
    status: 400,
    body: {
      error: 'Groq model is decommissioned.',
      detail: 'Update GROQ_MODEL in .env.local to a currently supported model, e.g. llama-3.3-70b-versatile.'
    }
  };
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', issues: parsed.error.issues }, { status: 400 });
  }

  const messages = buildMessages(parsed.data);
  const groq = await callGroq(messages);

  if (!groq.ok) {
    return NextResponse.json(groq.body, { status: groq.status });
  }

  let feedback: FeedbackResponse | null = null;
  try {
    feedback = JSON.parse(groq.body.content) as FeedbackResponse;
  } catch {
    return NextResponse.json({ error: 'AI returned invalid JSON.' }, { status: 502 });
  }

  if (!feedback || !feedback.summary || !feedback.suggestedNextEdit) {
    return NextResponse.json({ error: 'AI response was missing required fields.' }, { status: 502 });
  }

  return NextResponse.json(feedback);
}

