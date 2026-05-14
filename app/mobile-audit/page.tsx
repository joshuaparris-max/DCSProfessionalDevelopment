"use client";

import { useState } from 'react';

interface AuditItem {
  id: string;
  question: string;
  category: string;
}

const auditItems: AuditItem[] = [
  { id: 'power', question: 'Device powers on?', category: 'Hardware' },
  { id: 'screen', question: 'Screen displays correctly?', category: 'Hardware' },
  { id: 'keyboard', question: 'Keyboard works?', category: 'Hardware' },
  { id: 'mouse', question: 'Mouse/trackpad works?', category: 'Hardware' },
  { id: 'wifi', question: 'Wi-Fi connects?', category: 'Network' },
  { id: 'internet', question: 'Internet access works?', category: 'Network' },
  { id: 'login', question: 'Can log in to account?', category: 'Software' },
  { id: 'apps', question: 'Required apps open?', category: 'Software' },
  { id: 'printer', question: 'Printer works?', category: 'Peripherals' },
  { id: 'audio', question: 'Sound works?', category: 'Hardware' },
  { id: 'battery', question: 'Battery charges/holds?', category: 'Hardware' },
  { id: 'updates', question: 'System up to date?', category: 'Software' }
];

export default function MobileAuditPage() {
  const [responses, setResponses] = useState<Record<string, 'yes' | 'no' | 'na'>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = auditItems[currentIndex];
  const progress = ((currentIndex + 1) / auditItems.length) * 100;

  const handleResponse = (response: 'yes' | 'no' | 'na') => {
    setResponses(prev => ({ ...prev, [currentItem.id]: response }));
    if (currentIndex < auditItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const reset = () => {
    setResponses({});
    setCurrentIndex(0);
  };

  const completedItems = Object.keys(responses).length;
  const yesCount = Object.values(responses).filter(r => r === 'yes').length;
  const noCount = Object.values(responses).filter(r => r === 'no').length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Progress bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-3">
        <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
          <span>Question {currentIndex + 1} of {auditItems.length}</span>
          <span>{completedItems} completed</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        {/* Current question */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
          <div className="text-center">
            <div className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 mb-4">
              {currentItem.category}
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-8">
              {currentItem.question}
            </h1>

            {/* Big buttons for thumb navigation */}
            <div className="space-y-4">
              <button
                onClick={() => handleResponse('yes')}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-6 px-8 rounded-2xl text-xl transition-colors"
              >
                ✓ Yes
              </button>
              <button
                onClick={() => handleResponse('no')}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 rounded-2xl text-xl transition-colors"
              >
                ✗ No
              </button>
              <button
                onClick={() => handleResponse('na')}
                className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-colors"
              >
                N/A
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={goBack}
            disabled={currentIndex === 0}
            className="flex-1 bg-slate-200 hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-semibold py-4 px-6 rounded-xl transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={reset}
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-4 px-6 rounded-xl transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Summary */}
        {completedItems > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Summary</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">{yesCount}</div>
                <div className="text-sm text-green-700">Working</div>
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-red-600">{noCount}</div>
                <div className="text-sm text-red-700">Issues</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-slate-600">{completedItems - yesCount - noCount}</div>
                <div className="text-sm text-slate-700">N/A</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
