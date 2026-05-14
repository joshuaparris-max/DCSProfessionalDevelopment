"use client";

import { GamificationSticker } from '../lib/gamification';

type StickersDisplayProps = {
  stickers: GamificationSticker[];
};

export function StickersDisplay({ stickers }: StickersDisplayProps) {
  if (stickers.length === 0) return null;

  return (
    <div className="mt-6">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">Micro-rewards & Stickers</div>
      <div className="flex flex-wrap gap-3">
        {stickers.map((sticker) => (
          <div 
            key={sticker.id}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-slate-200 shadow-sm"
            title={`Awarded on ${new Date(sticker.awardedAtIso).toLocaleDateString()}`}
          >
            <span className="text-xl">{sticker.emoji}</span>
            <span className="text-xs font-semibold text-slate-700">{sticker.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
