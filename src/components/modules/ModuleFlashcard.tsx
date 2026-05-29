"use client";

import { useState } from 'react';
import { triggerXPGain } from '../../lib/xpEvents';
import { ReviewRating } from '../../lib/spacedRepetition';

type ModuleFlashcardProps = {
  id: string;
  front: string;
  back: string;
  onRate: (rating: ReviewRating) => void;
  isMastered?: boolean;
};

export function ModuleFlashcard({ id, front, back, onRate, isMastered }: ModuleFlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasRated, setHasRated] = useState(false);

  const handleRate = (rating: ReviewRating) => {
    if (!hasRated) {
      triggerXPGain(15, 'Flashcard Retrieval Practice');
      setHasRated(true);
    }
    onRate(rating);
  };

  return (
    <div className={`group relative min-h-[160px] w-full perspective-1000 ${isMastered ? 'opacity-70' : ''}`}>
      <div 
        className={`relative h-full w-full transition-all duration-500 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm backface-hidden">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Question</div>
          <div className="text-lg font-semibold text-slate-900">{front}</div>
          <button
            onClick={() => setIsFlipped(true)}
            className="mt-6 self-start rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Reveal Answer
          </button>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm backface-hidden rotate-y-180">
          <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2">Answer</div>
          <div className="text-md text-slate-800 leading-relaxed">{back}</div>
          
          <div className="mt-6 flex flex-wrap gap-2">
            {(['again', 'hard', 'good', 'easy'] as ReviewRating[]).map((rating) => (
              <button
                key={rating}
                onClick={() => handleRate(rating)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all active:scale-95 ${
                  rating === 'again' ? 'bg-rose-100 text-rose-700 hover:bg-rose-200' :
                  rating === 'hard' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                  rating === 'good' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' :
                  'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
