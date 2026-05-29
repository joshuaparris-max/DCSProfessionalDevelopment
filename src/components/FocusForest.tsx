"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { plantFocusTree, type GamificationState } from '../lib/gamification';

type FocusForestProps = {
  state: GamificationState;
  onStateChange: (state: GamificationState) => void;
};

export function FocusForest({ state, onStateChange }: FocusForestProps) {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes default
  const [isCompleted, setIsCompleted] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleComplete = useCallback(() => {
    setIsActive(false);
    setIsCompleted(true);
    const newState = plantFocusTree(state);
    onStateChange(newState);
    setTimeLeft(25 * 60);
  }, [state, onStateChange]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleComplete();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, handleComplete]);

  const handleStart = () => {
    setIsActive(true);
    setIsCompleted(false);
  };

  const handleCancel = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-[2rem] border border-emerald-200 bg-emerald-50 p-6 shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-emerald-700">Focus Forest</h3>
          <span className="text-xs font-bold bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full">
            +50 XP ON SUCCESS
          </span>
        </div>

        {!isActive && !isCompleted ? (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">🌱</div>
            <p className="text-sm text-emerald-800 mb-6">
              Plant a tree by focusing for 25 minutes. 
              Don&apos;t leave this page or your tree will wither!
            </p>
            <button
              onClick={handleStart}
              className="w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-all active:scale-95"
            >
              Start Focus Session
            </button>
          </div>
        ) : isActive ? (
          <div className="text-center py-4">
            <div className="text-5xl font-mono font-bold text-emerald-900 mb-4">
              {formatTime(timeLeft)}
            </div>
            <div className="text-4xl mb-4 animate-pulse">🌳</div>
            <p className="text-xs text-emerald-700 mb-6">
              Focusing... your tree is growing.
            </p>
            <button
              onClick={handleCancel}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-800 underline"
            >
              Give up (Tree will wither)
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="text-4xl mb-4">✨ 🌲 ✨</div>
            <h4 className="text-xl font-bold text-emerald-900 mb-2">Tree Planted!</h4>
            <p className="text-sm text-emerald-800 mb-6">
              You successfully stayed focused. 50 XP added to your hoard.
            </p>
            <button
              onClick={() => setIsCompleted(false)}
              className="w-full rounded-full bg-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-emerald-700 transition-all"
            >
              Plant Another
            </button>
          </div>
        )}
      </div>
      
      {/* Background decoration */}
      <div className="absolute right-[-10px] bottom-[-10px] text-8xl opacity-10 select-none pointer-events-none">
        🌲
      </div>
    </div>
  );
}
