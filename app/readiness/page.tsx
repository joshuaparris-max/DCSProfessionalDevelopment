"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getReadinessProfile, type ReadinessScore } from '../../src/lib/readinessMath';
import { getInitialProgressSnapshot, getStoredProgressSnapshot, type UserProgress } from '../../src/lib/progress';

function ProfileCard({
  title,
  description,
  scores
}: {
  title: string;
  description: string;
  scores: ReadinessScore[];
}) {
  const average = scores.length
    ? Math.round(scores.reduce((sum, score) => sum + score.score, 0) / scores.length)
    : 0;

  const confidence = scores[0]?.confidence || 'low';
  const evidenceCount = scores[0]?.evidenceCount || 0;

  const confidenceColors = {
    low: 'bg-amber-100 text-amber-700',
    medium: 'bg-blue-100 text-blue-700',
    high: 'bg-emerald-100 text-emerald-700'
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${confidenceColors[confidence]}`}>
              {confidence} confidence
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              {evidenceCount} evidence points
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
        </div>
        <div className="rounded-3xl bg-slate-900 px-5 py-4 text-center">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Readiness</div>
          <div className="text-3xl font-bold text-white">{average}%</div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Skill Domains</h3>
          {scores.map((score) => (
            <div key={score.id} className="rounded-3xl bg-slate-50 p-4 border border-slate-100">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">{score.label}</div>
                  <div className="mt-1 text-xs text-slate-500 leading-relaxed">{score.note}</div>
                </div>
                <div className="text-lg font-bold text-slate-900">{Math.round(score.score)}%</div>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div 
                  className="h-full rounded-full bg-slate-900 transition-all duration-1000" 
                  style={{ width: `${Math.min(100, score.score)}%` }} 
                />
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-slate-50 p-6 border border-slate-100">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Top 3 Actions to Improve</h3>
          <ul className="space-y-3">
            {scores.flatMap(s => s.topActions).slice(0, 3).map((action, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
                {action}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link 
              href="/modules"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 hover:text-slate-600"
            >
              <span>View relevant modules</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ReadinessPage() {
  const [progress, setProgress] = useState<UserProgress>(() => getInitialProgressSnapshot());

  useEffect(() => {
    setProgress(getStoredProgressSnapshot());
  }, []);

  const readinessProfiles = [
    {
      id: 'compTIAaPlus',
      title: 'CompTIA A+ Readiness',
      description: 'Alignment with Core 1 and Core 2 hardware and software objectives.',
      scores: getReadinessProfile('compTIAaPlus', progress)
    },
    {
      id: 'mspL1',
      title: 'MSP L1 Support',
      description: 'Foundational capability for high-volume managed service provider support.',
      scores: getReadinessProfile('mspL1', progress)
    },
    {
      id: 'mspL2',
      title: 'MSP L2 Pathway',
      description: 'Advanced troubleshooting and specialized infrastructure knowledge.',
      scores: getReadinessProfile('mspL2', progress)
    },
    {
      id: 'm365Admin',
      title: 'Microsoft 365 Admin',
      description: 'Core administration of identity, Exchange, Teams, and SharePoint.',
      scores: getReadinessProfile('m365Admin', progress)
    },
    {
      id: 'endpointIntune',
      title: 'Endpoint / Intune',
      description: 'Device enrollment, policy management, and modern endpoint support.',
      scores: getReadinessProfile('endpointIntune', progress)
    },
    {
      id: 'networkingFundamentals',
      title: 'Networking Foundations',
      description: 'Understanding of IP connectivity, DNS, and network infrastructure.',
      scores: getReadinessProfile('networkingFundamentals', progress)
    },
    {
      id: 'cybersecurityTriage',
      title: 'Cybersecurity Triage',
      description: 'Threat identification, phishing analysis, and safe incident response.',
      scores: getReadinessProfile('cybersecurityTriage', progress)
    },
    {
      id: 'ticketDocumentation',
      title: 'Ticket Documentation',
      description: 'Quality, clarity, and safety of support documentation.',
      scores: getReadinessProfile('ticketDocumentation', progress)
    },
    {
      id: 'userCommunication',
      title: 'User Communication',
      description: 'Clarity, empathy, and professional communication standards.',
      scores: getReadinessProfile('userCommunication', progress)
    },
    {
      id: 'schoolItContext',
      title: 'School IT / DCS Context',
      description: 'Strategic and technical breadth for educational IT environments.',
      scores: getReadinessProfile('schoolItContext', progress)
    }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Readiness Analysis</div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Career Readiness Profiles</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            These profiles estimate your readiness for specific IT roles based on your local learning evidence. 
            Confidence increases as you complete more modules, pass quizzes, and log practical scenario outcomes.
          </p>
        </div>
      </section>

      <div className="grid gap-8">
        {readinessProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            title={profile.title}
            description={profile.description}
            scores={profile.scores}
          />
        ))}
      </div>
    </div>
  );
}
