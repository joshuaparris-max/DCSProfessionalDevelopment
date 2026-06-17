'use client';

import { useState } from 'react';
import { clientCommunicationDrills } from '../../src/data/mspTransition';

function countSignals(value: string) {
  const checks = [
    /\b(thanks|thank you|understand|sorry|appreciate)\b/i.test(value),
    /\b(check|confirm|test|review|investigat|verify)\b/i.test(value),
    /\b(next|update|escalat|follow|reply|confirm)\b/i.test(value),
    /\b(affected|impact|user|device|service|mailbox|outlook|printer)\b/i.test(value),
    !/\b(broken|no idea|not my problem|just wait|obviously)\b/i.test(value)
  ];
  return checks.filter(Boolean).length;
}

export default function ClientCommunicationPage() {
  const [selectedId, setSelectedId] = useState(clientCommunicationDrills[0]?.id ?? '');
  const [draft, setDraft] = useState('');
  const drill = clientCommunicationDrills.find((item) => item.id === selectedId) ?? clientCommunicationDrills[0];
  const signalCount = countSignals(draft);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Client communication</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">MSP update trainer</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Practise first responses, investigation updates, escalation messages, and closure notes using fictional
            client situations. Keep the message calm, specific, and careful about what is known.
          </p>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-3">
          {clientCommunicationDrills.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedId(item.id);
                setDraft('');
              }}
              className={`w-full rounded-3xl border p-5 text-left ${
                item.id === drill.id ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-800'
              }`}
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">Drill</div>
              <div className="mt-2 text-lg font-semibold">{item.title}</div>
            </button>
          ))}
        </aside>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="rounded-3xl bg-slate-50 p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Situation</div>
            <p className="mt-3 text-lg font-semibold text-slate-900">{drill.situation}</p>
            <p className="mt-3 text-sm leading-6 text-rose-700">Weak draft: {drill.weakDraft}</p>
          </div>

          <label htmlFor="communication-draft" className="mt-6 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Rewrite as a client-ready update
          </label>
          <textarea
            id="communication-draft"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={6}
            className="mt-3 w-full rounded-3xl border border-slate-200 p-4 text-sm leading-6 shadow-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            placeholder="Write the message you would send to the client..."
          />

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Readiness signals: {signalCount}/5
              </div>
              <ul className="mt-4 space-y-2">
                {drill.targetPattern.map((item) => (
                  <li key={item} className="text-sm leading-6 text-slate-700">- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">Model response</div>
              <p className="mt-4 text-sm leading-7 text-blue-950">{drill.modelResponse}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
