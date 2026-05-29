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
  coachingTip: string;
  encouragement: string;
  nextSteps: string[];
};

function buildMessages(input: z.infer<typeof requestSchema>) {
  const { question, draft } = input;

  const system = [
    'You are a strict but kind IT-support coach.',
    'Give realtime feedback on a draft answer while the user is still typing.',
    'Be concise and specific. Do not be patronizing.',
    'Never request or include sensitive school data, credentials, or personal information.',
    'Focus on: correctness, reasoning quality, and risk/judgement for a Level 1 support context.',
    'Provide coaching tips, encouragement, and specific next steps for improvement.'
  ].join(' ');

  const user = [
    'Evaluate the user draft against the model answer and rubric.',
    'Return ONLY valid JSON with keys: overall, summary, missingPoints, suggestedNextEdit, coachingTip, encouragement, nextSteps.',
    'coachingTip: A specific learning tip related to this question type.',
    'encouragement: Brief positive reinforcement.',
    'nextSteps: Array of 2-3 actionable improvement steps.',
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
    console.error('GROQ_API_KEY is missing from environment variables.');
    return { ok: false as const, status: 500, body: { error: 'AI feedback is currently unavailable (API key missing).' } };
  }

  const preferredModel = process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile';
  const fallbackModels = ['llama-3.3-70b-versatile'];
  const modelsToTry = [preferredModel, ...fallbackModels.filter((model) => model !== preferredModel)];

  for (const model of modelsToTry) {
    try {
      console.log(`Attempting AI feedback with model: ${model}`);
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
          console.error('Groq returned an empty response body.');
          return { ok: false as const, status: 502, body: { error: 'AI returned an empty response.' } };
        }

        return { ok: true as const, status: 200, body: { content } };
      }

      const errorText = await response.text().catch(() => '');
      console.error(`Groq API Error (${response.status}):`, errorText);

      const decommissioned = /model_decommissioned|decommissioned|no longer supported/i.test(errorText);
      if (!decommissioned) {
        return {
          ok: false as const,
          status: response.status,
          body: { error: 'AI request failed', detail: `HTTP ${response.status}` }
        };
      }
    } catch (e: any) {
      console.error(`Fetch error during AI request to model ${model}:`, e);
      // Continue to next model if available
    }
  }

  return {
    ok: false as const,
    status: 503,
    body: {
      error: 'AI service is temporarily unavailable.',
      detail: 'All attempts to reach the feedback engine failed.'
    }
  };
}

export async function POST(request: Request) {
  try {
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
      
      // Ensure arrays are actually arrays
      if (feedback) {
        if (!Array.isArray(feedback.missingPoints)) {
          feedback.missingPoints = [];
        }
        if (!Array.isArray(feedback.nextSteps)) {
          feedback.nextSteps = [];
        }
      }
    } catch {
      return NextResponse.json({ error: 'AI returned invalid JSON.' }, { status: 502 });
    }

    if (!feedback || !feedback.summary || !feedback.suggestedNextEdit || !feedback.coachingTip || !feedback.encouragement) {
      return NextResponse.json({ error: 'AI response was missing required fields.' }, { status: 502 });
    }

    return NextResponse.json(feedback);
  } catch (error: any) {
    console.error('AI Feedback Route Error:', error);
    return NextResponse.json(
      { 
        error: 'An unexpected error occurred in the feedback engine.', 
        detail: error?.message || 'Unknown error' 
      }, 
      { status: 500 }
    );
  }
}

