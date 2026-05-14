"use client";

import { useEffect, useState } from 'react';
import { loadGamificationState } from '../lib/gamification';

type LeaderboardEntry = {
  name: string;
  points: number;
  streak: number;
  isCurrentUser?: boolean;
};

const MOCK_PEERS: LeaderboardEntry[] = [
  { name: 'Sarah J.', points: 1250, streak: 12 },
  { name: 'Michael K.', points: 1100, streak: 5 },
  { name: 'David L.', points: 950, streak: 8 },
  { name: 'Emily R.', points: 800, streak: 3 },
  { name: 'James W.', points: 750, streak: 15 }
];

export function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const state = loadGamificationState();
    const currentUserEntry: LeaderboardEntry = {
      name: 'You',
      points: state.points,
      streak: state.studyStreakDays,
      isCurrentUser: true
    };

    const allEntries = [...MOCK_PEERS, currentUserEntry].sort((a, b) => b.points - a.points);
    setEntries(allEntries);
  }, []);

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Leaderboard</div>
      <h2 className="mt-3 text-2xl font-semibold text-slate-900">Top Performers</h2>
      
      <div className="mt-6 space-y-4">
        {entries.map((entry, index) => (
          <div 
            key={entry.name}
            className={`flex items-center justify-between p-4 rounded-2xl ${
              entry.isCurrentUser ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-4">
              <span className={`text-lg font-bold w-6 ${entry.isCurrentUser ? 'text-slate-400' : 'text-slate-300'}`}>
                {index + 1}
              </span>
              <div>
                <div className="font-semibold">{entry.name}</div>
                <div className={`text-xs ${entry.isCurrentUser ? 'text-slate-400' : 'text-slate-500'}`}>
                  {entry.streak} day streak
                </div>
              </div>
            </div>
            <div className="text-xl font-bold">{entry.points} pts</div>
          </div>
        ))}
      </div>
      
      <p className="mt-6 text-xs text-slate-500 text-center italic">
        Leaderboard currently shows mock peers for local-first demonstration.
      </p>
    </div>
  );
}
