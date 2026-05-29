"use client";

import React from 'react';
import type { GamificationSummary, RPGAttributes } from '../lib/gamification';

type RPGDashboardProps = {
  summary: GamificationSummary;
};

export function RPGDashboard({ summary }: RPGDashboardProps) {
  const { level, xpInCurrentLevel, xpNeededForNextLevel, specialization, attributes, bossBattlesWon, focusTreesPlanted, studyStreakDays } = summary;
  
  const xpPercentage = Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100);

  const attributeIcons: Record<keyof RPGAttributes, string> = {
    strength: '⚔️',
    intelligence: '🧠',
    agility: '⚡',
    spirit: '✨'
  };

  const attributeLabels: Record<keyof RPGAttributes, string> = {
    strength: 'Strength (Hardware/Ops)',
    intelligence: 'Intelligence (Cloud/AI)',
    agility: 'Agility (Networking/Speed)',
    spirit: 'Spirit (Soft Skills/Reflection)'
  };

  return (
    <div className="space-y-6">
      {/* Hero Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[2rem] bg-gradient-to-br from-indigo-600 to-blue-700 p-6 text-white shadow-lg">
          <div className="text-xs font-bold uppercase tracking-widest opacity-80">Level {level}</div>
          <div className="mt-1 text-3xl font-bold">{summary.nextLevelTitle.split(' ')[1]}</div>
          <div className="mt-4 h-2 w-full rounded-full bg-white/20 overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-1000" 
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
          <div className="mt-2 text-[10px] font-medium opacity-80 flex justify-between">
            <span>{xpInCurrentLevel} / {xpNeededForNextLevel} XP</span>
            <span>{xpPercentage}%</span>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Class</div>
          <div className="mt-1 text-2xl font-bold text-slate-900 capitalize">
            {specialization.replace('-', ' ')}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Current specialization based on your study habits.
          </div>
        </div>

        <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Bosses Defeated</div>
          <div className="mt-1 text-3xl font-bold text-slate-900 flex items-center gap-2">
            <span>{bossBattlesWon}</span>
            <span className="text-xl">👹</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Full assessments passed with 70%+ score.
          </div>
        </div>

        <div className="rounded-[2rem] bg-white border border-slate-200 p-6 shadow-sm">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Study Streak</div>
          <div className="mt-1 text-3xl font-bold text-slate-900 flex items-center gap-2">
            <span>{studyStreakDays} Days</span>
            <span className="text-xl">🔥</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Keep the fire burning with daily activity!
          </div>
        </div>
      </div>

      {/* Attributes & Unlocks */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">RPG Attributes</h3>
          <div className="space-y-4">
            {(Object.keys(attributes) as Array<keyof RPGAttributes>).map((attr) => (
              <div key={attr} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2">
                    <span>{attributeIcons[attr]}</span>
                    <span>{attributeLabels[attr]}</span>
                  </div>
                  <span>{attributes[attr]} pts</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className="h-full bg-slate-900 transition-all duration-700" 
                    style={{ width: `${Math.min(100, (attributes[attr] / 200) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm relative overflow-hidden">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Loot & Unlocks</h3>
          <div className="space-y-4">
            <div className={`flex items-center gap-3 p-3 rounded-2xl border ${level >= 5 ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
              <div className="text-2xl">{level >= 5 ? '🔓' : '🔒'}</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Custom Profile Themes</div>
                <div className="text-[10px] text-slate-500">Unlocks at Level 5</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-2xl border ${bossBattlesWon >= 3 ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
              <div className="text-2xl">{bossBattlesWon >= 3 ? '🔓' : '🔒'}</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Advanced Scenario Editor</div>
                <div className="text-[10px] text-slate-500">Defeat 3 Bosses to unlock</div>
              </div>
            </div>
            <div className={`flex items-center gap-3 p-3 rounded-2xl border ${focusTreesPlanted >= 10 ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
              <div className="text-2xl">{focusTreesPlanted >= 10 ? '🔓' : '🔒'}</div>
              <div>
                <div className="text-xs font-bold text-slate-900">Zen Study Mode</div>
                <div className="text-[10px] text-slate-500">Plant 10 trees to unlock</div>
              </div>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] text-[120px] opacity-5 select-none pointer-events-none">
            🎁
          </div>
        </div>
      </div>
    </div>
  );
}
