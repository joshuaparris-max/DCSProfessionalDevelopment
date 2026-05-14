'use client';

import { useEffect, useMemo, useState } from 'react';
import { getStoredProgressSnapshot, saveProgress, type UserProgress } from '../../src/lib/progress';
import { buildEvidencePackMarkdown } from '../../src/lib/evidencePack';
import EvidencePackPreview from '../../src/components/evidence/EvidencePackPreview';
import PrivacyReminder from '../../src/components/evidence/PrivacyReminder';
import { getMonthKey } from '../../src/lib/pdSummary';
import { trackUsageInteraction } from '../../src/hooks/useUsageTracking';

export default function EvidencePackPage() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
  }, []);

  const monthKey = getMonthKey(new Date());
  const markdown = useMemo(() => {
    if (!progress) return '';
    return buildEvidencePackMarkdown(progress, monthKey);
  }, [progress, monthKey]);

  function updateEvidencePackSetting(setting: Partial<UserProgress['evidencePackSettings']>) {
    if (!progress) {
      return;
    }

    const nextProgress = {
      ...progress,
      evidencePackSettings: {
        ...progress.evidencePackSettings,
        ...setting
      }
    };

    setProgress(nextProgress);
    saveProgress(nextProgress);
  }

  async function handleCopy() {
    if (!markdown || !progress?.evidencePackSettings.privacyReminderAccepted) {
      return;
    }

    await navigator.clipboard.writeText(markdown);
    trackUsageInteraction({
      eventType: 'evidence_export_created',
      route: '/evidence-pack',
      label: 'Evidence Pack Markdown',
      contentType: 'evidence',
      activityCategory: 'evidence',
      completed: true,
      metadata: { source: 'built-in' }
    });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Evidence pack export</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Generate a manager-safe PD summary</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Export a privacy-safe Markdown summary of your local professional development activity for review,
            reflection, or portfolio sharing.
          </p>
        </div>
      </section>

      <PrivacyReminder />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <EvidencePackPreview markdown={markdown} />

        <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Export actions</div>
          <div className="mt-5 space-y-4 text-sm text-slate-700">
            <p>Copy the full Markdown export and paste it into a personal report, evidence file, or learning record.</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={progress?.evidencePackSettings.includeLinks ?? true}
                  onChange={(event) => updateEvidencePackSetting({ includeLinks: event.target.checked })}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Include optional evidence links in the export</span>
              </label>
              <label className="flex items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={progress?.evidencePackSettings.includeCertificates ?? true}
                  onChange={(event) => updateEvidencePackSetting({ includeCertificates: event.target.checked })}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <span>Include certificate and course references where available</span>
              </label>
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={progress?.evidencePackSettings.privacyReminderAccepted ?? false}
                  onChange={(event) => updateEvidencePackSetting({ privacyReminderAccepted: event.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-slate-300"
                />
                <span>
                  I confirm this export contains no sensitive student, staff, network, or incident details and is manager-safe.
                </span>
              </label>
            </div>
            <button
              onClick={handleCopy}
              disabled={!markdown || !progress?.evidencePackSettings.privacyReminderAccepted}
              className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
            >
              {copied ? 'Copied!' : progress?.evidencePackSettings.privacyReminderAccepted ? 'Copy Markdown' : 'Accept privacy reminder first'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
