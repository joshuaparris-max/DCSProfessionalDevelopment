"use client";

import { useState, useEffect } from 'react';
import { loadGamificationState } from '../../src/lib/gamification';

type Team = {
  id: string;
  name: string;
  members: number;
  points: number;
  rank: number;
};

type Challenge = {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  deadline: string;
  category: 'modules' | 'scenarios' | 'reviews';
};

const MOCK_TEAMS: Team[] = [
  { id: 'team-1', name: 'Endpoint Enforcers', members: 4, points: 4250, rank: 1 },
  { id: 'team-2', name: 'Network Ninjas', members: 3, points: 3800, rank: 2 },
  { id: 'team-3', name: 'Cloud Crusaders', members: 5, points: 3100, rank: 3 },
];

const MOCK_CHALLENGES: Challenge[] = [
  { 
    id: 'ch-1', 
    title: 'Imaging Sprint', 
    description: 'Complete 3 scenarios on device imaging this week.', 
    progress: 1, 
    target: 3, 
    deadline: '3 days left',
    category: 'scenarios'
  },
  { 
    id: 'ch-2', 
    title: 'Intune Integration', 
    description: 'Finish the Intune Fundamentals module.', 
    progress: 45, 
    target: 100, 
    deadline: '5 days left',
    category: 'modules'
  },
  { 
    id: 'ch-3', 
    title: 'Review Routine', 
    description: 'Clear all due reviews for 3 consecutive days.', 
    progress: 2, 
    target: 3, 
    deadline: '1 day left',
    category: 'reviews'
  }
];

export default function TeamChallengesPage() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const state = loadGamificationState();
    setUserPoints(state.points);
  }, []);

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Social Gamification (Demo)</div>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">Team Challenges</h1>
          </div>
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 uppercase">
            Preview Mode: Demo Data
          </span>
        </div>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Join a team and collaborate with peers to complete weekly professional development goals. 
          Your individual progress contributes to your team&apos;s overall standing.
        </p>
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500 italic">
          <strong>Implementation Note:</strong> This page currently displays simulated peer data. 
          A persistent backend (e.g., Supabase or Firebase) is required to sync real progress between staff members.
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Active Challenges</h2>
            <div className="space-y-4">
              {MOCK_CHALLENGES.map((challenge) => (
                <div key={challenge.id} className="p-5 rounded-3xl border border-slate-100 bg-slate-50">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">{challenge.title}</h3>
                      <p className="text-sm text-slate-600 mt-1">{challenge.description}</p>
                    </div>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
                      {challenge.deadline}
                    </span>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">
                      <span>Progress</span>
                      <span>{challenge.progress}{challenge.category === 'modules' ? '%' : ` / ${challenge.target}`}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-slate-900 transition-all duration-500" 
                        style={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900 mb-6">Peer Feedback (Beta)</h2>
            <div className="p-5 rounded-3xl border border-emerald-100 bg-emerald-50">
              <p className="text-sm text-emerald-900 leading-relaxed">
                <span className="font-bold">Collaboration Point:</span> Share your recent escalation note from Scenario Lab with your team to get feedback on clarity and technical accuracy.
              </p>
              <button className="mt-4 px-4 py-2 rounded-full bg-emerald-600 text-white text-sm font-semibold">
                Share Latest Note
              </button>
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-6">Team Leaderboard</h2>
            <div className="space-y-4">
              {MOCK_TEAMS.map((team) => (
                <div 
                  key={team.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    selectedTeam === team.id 
                      ? 'border-slate-900 bg-slate-900 text-white shadow-md' 
                      : 'border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-300 cursor-pointer'
                  }`}
                  onClick={() => setSelectedTeam(team.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`text-lg font-bold w-5 ${selectedTeam === team.id ? 'text-slate-400' : 'text-slate-300'}`}>
                        {team.rank}
                      </span>
                      <div>
                        <div className="font-semibold">{team.name}</div>
                        <div className={`text-xs ${selectedTeam === team.id ? 'text-slate-400' : 'text-slate-500'}`}>
                          {team.members} members
                        </div>
                      </div>
                    </div>
                    <div className="text-lg font-bold">{team.points}</div>
                  </div>
                </div>
              ))}
            </div>
            {!selectedTeam && (
              <p className="mt-6 text-xs text-slate-500 text-center italic">
                Select a team to join the competition.
              </p>
            )}
            {selectedTeam && (
              <div className="mt-6 pt-6 border-t border-slate-700/20">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Your Contribution</div>
                <div className="flex justify-between items-end">
                  <div className="text-2xl font-bold">{userPoints} pts</div>
                  <div className="text-xs text-emerald-400 font-medium">+120 this week</div>
                </div>
              </div>
            )}
          </section>
        </aside>
      </div>
    </div>
  );
}
