"use client";

import { useState } from 'react';

type PlaygroundMode = 'python' | 'html';

export default function PlaygroundPage() {
  const [mode, setMode] = useState<PlaygroundMode>('python');
  const [code, setCode] = useState('# Write your Python code here\nprint("Hello, World!")');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runPython = async () => {
    setIsRunning(true);
    try {
      // Use the MCP Pylance tool to run the code
      const response = await fetch('/api/playground/python', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      setOutput(result.output || result.error);
    } catch (error) {
      setOutput('Error running code: ' + error);
    }
    setIsRunning(false);
  };

  const runHTML = () => {
    // For HTML, we'll render it in an iframe
    const iframe = document.getElementById('html-output') as HTMLIFrameElement;
    if (iframe) {
      const doc = iframe.contentDocument;
      if (doc) {
        doc.open();
        doc.write(code);
        doc.close();
      }
    }
  };

  const handleRun = () => {
    if (mode === 'python') {
      runPython();
    } else {
      runHTML();
    }
  };

  const switchMode = (newMode: PlaygroundMode) => {
    setMode(newMode);
    if (newMode === 'python') {
      setCode('# Write your Python code here\nprint("Hello, World!")');
      setOutput('');
    } else {
      setCode(`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a simple HTML page.</p>
</body>
</html>`);
      setOutput('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Code Playground</h1>
          <p className="mt-2 text-slate-600">
            Practice coding with Python or HTML. Changes are not saved.
          </p>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => switchMode('python')}
            className={`rounded-lg px-4 py-2 font-semibold ${
              mode === 'python'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            Python
          </button>
          <button
            onClick={() => switchMode('html')}
            className={`rounded-lg px-4 py-2 font-semibold ${
              mode === 'html'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
            }`}
          >
            HTML
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Code Editor</h2>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
              >
                {isRunning ? 'Running...' : 'Run'}
              </button>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-96 w-full resize-none rounded border border-slate-300 p-3 font-mono text-sm"
              placeholder="Write your code here..."
            />
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Output</h2>
            {mode === 'python' ? (
              <pre className="h-96 overflow-auto rounded border border-slate-300 bg-slate-50 p-3 font-mono text-sm text-slate-800">
                {output || 'Output will appear here...'}
              </pre>
            ) : (
              <iframe
                id="html-output"
                className="h-96 w-full rounded border border-slate-300"
                title="HTML Output"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
