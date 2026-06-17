'use client';

import { useEffect, useState } from 'react';
import { mspKbTemplates } from '../../src/data/mspTransition';

const KB_DRAFTS_KEY = 'supportOpsMspKbDrafts';

function loadDrafts() {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(KB_DRAFTS_KEY) ?? '{}') as Record<string, string>;
  } catch {
    return {};
  }
}

export default function MspKbBuilderPage() {
  const [selectedId, setSelectedId] = useState(mspKbTemplates[0]?.id ?? '');
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const template = mspKbTemplates.find((item) => item.id === selectedId) ?? mspKbTemplates[0];
  const draft = drafts[template.id] ?? '';

  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  function updateDraft(value: string) {
    setDrafts((current) => {
      const next = { ...current, [template.id]: value };
      window.localStorage.setItem(KB_DRAFTS_KEY, JSON.stringify(next));
      return next;
    });
  }

  const starter = `# ${template.title}\n\nUse case: ${template.useCase}\n\n${template.sections
    .map((section) => `## ${section}\n- `)
    .join('\n\n')}\n\nPrivacy note: keep this generic. Do not include real client names, passwords, IP addresses, device names, screenshots, internal URLs, or confidential procedures.`;

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Knowledge base builder</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">MSP KB article templates</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Convert repeated support patterns into reusable, client-safe documentation. Drafts are saved locally in
            this browser and should remain generic.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-3">
          {mspKbTemplates.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`w-full rounded-3xl border p-5 text-left ${
                item.id === template.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="mt-2 text-sm leading-6 opacity-80">{item.useCase}</p>
            </button>
          ))}
        </aside>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Selected template</div>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{template.title}</h2>
            </div>
            <button
              type="button"
              onClick={() => updateDraft(starter)}
              className="rounded-3xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Insert starter
            </button>
          </div>

          <textarea
            value={draft}
            onChange={(event) => updateDraft(event.target.value)}
            rows={18}
            className="mt-5 w-full rounded-3xl border border-slate-200 p-4 font-mono text-sm leading-6 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder={starter}
          />

          <div className="mt-5 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
            Keep KB drafts generic. Do not include real client names, passwords, IP addresses, device names,
            screenshots, internal URLs, confidential procedures, or private incident details.
          </div>
        </section>
      </div>
    </div>
  );
}
