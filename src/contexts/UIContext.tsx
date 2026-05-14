"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type UIContextType = {
  focusMode: boolean;
  setFocusMode: (active: boolean) => void;
  toggleFocusMode: () => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [focusMode, setFocusMode] = useState(false);

  const toggleFocusMode = () => setFocusMode(prev => !prev);

  return (
    <UIContext.Provider value={{ focusMode, setFocusMode, toggleFocusMode }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
