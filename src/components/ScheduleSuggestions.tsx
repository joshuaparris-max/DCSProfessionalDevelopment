"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Suggestion = {
  title: string;
  detail: string;
  cta: string;
  href: string;
  icon: string;
};

export function ScheduleSuggestions() {
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    
    let current: Suggestion;
    if (hour >= 6 && hour < 9) {
      current = {
        title: 'Morning Momentum',
        detail: 'Start the day with 5 quick flashcards to refresh your memory.',
        cta: 'Review Now',
        href: '/due-today',
        icon: '🌅'
      };
    } else if (hour >= 9 && hour < 12) {
      current = {
        title: 'Quiet Window Drill',
        detail: 'Between tickets? Try a quick 5-minute troubleshooting scenario.',
        cta: 'Open Scenarios',
        href: '/scenarios',
        icon: '⏱️'
      };
    } else if (hour >= 12 && hour < 14) {
      current = {
        title: 'Lunchtime Learning',
        detail: 'Take 10 minutes to progress in your current module.',
        cta: 'Continue Module',
        href: '/modules',
        icon: '🍱'
      };
    } else if (hour >= 14 && hour < 16) {
      current = {
        title: 'Afternoon Deep-Dive',
        detail: 'Focus on one complex topic or practical output.',
        cta: 'Go to Modules',
        href: '/modules',
        icon: '🔍'
      };
    } else {
      current = {
        title: 'Daily Wrap-up',
        detail: 'Reflect on today\'s learning and log your professional development.',
        cta: 'Log PD',
        href: '/pd-log',
        icon: '📝'
      };
    }
    setSuggestion(current);
  }, []);

  if (!suggestion) return null;

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{suggestion.icon}</span>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{suggestion.title}</h3>
          <p className="text-sm text-slate-600 mt-1">{suggestion.detail}</p>
        </div>
      </div>
      <Link 
        href={suggestion.href}
        className="mt-4 block w-full text-center py-2 rounded-2xl bg-slate-100 text-sm font-semibold text-slate-900 hover:bg-slate-200 transition"
      >
        {suggestion.cta}
      </Link>
    </div>
  );
}
