export default function PrinterMatrixPage() {
  const matrix = [
    {
      symptom: 'Print job stuck in queue',
      causes: [
        'Printer offline or out of paper/toner',
        'Paper jam preventing printing',
        'Wrong printer selected by user',
        'PaperCut/Follow-Me print not released',
        'Printer driver issues'
      ],
      quickChecks: [
        'Check printer status lights',
        'Verify paper and toner levels',
        'Clear any paper jams',
        'Confirm correct printer selection',
        'Release held jobs in PaperCut'
      ]
    },
    {
      symptom: 'Prints come out blank or faded',
      causes: [
        'Low toner cartridge',
        'Drum unit needs replacement',
        'Fuser unit malfunction',
        'Incorrect paper type loaded'
      ],
      quickChecks: [
        'Check toner levels',
        'Inspect drum unit for damage',
        'Test fuser temperature (if accessible)',
        'Verify paper type matches printer settings'
      ]
    },
    {
      symptom: 'Paper jams frequently',
      causes: [
        'Worn rollers or pickup mechanism',
        'Incorrect paper size/type',
        'Torn or crumpled paper in tray',
        'Dirty or damaged paper path'
      ],
      quickChecks: [
        'Clear paper path of debris',
        'Check paper size settings',
        'Inspect rollers for wear',
        'Use recommended paper type'
      ]
    },
    {
      symptom: 'Printer not responding to print commands',
      causes: [
        'Network connectivity issues',
        'Printer offline',
        'Driver compatibility problems',
        'Print spooler service stopped'
      ],
      quickChecks: [
        'Check network cable/connection',
        'Power cycle printer',
        'Restart print spooler service',
        'Update/reinstall printer drivers'
      ]
    },
    {
      symptom: 'Strange noises during printing',
      causes: [
        'Worn gears or bearings',
        'Foreign objects in printer',
        'Fuser roller issues',
        'Drum unit misalignment'
      ],
      quickChecks: [
        'Listen for specific noise patterns',
        'Check for loose components',
        'Inspect fuser and drum units',
        'Clear any obstructions'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Printer symptom-to-cause matrix</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Map common printer symptoms to likely causes and quick troubleshooting steps.
            Use this to diagnose issues before escalating to service calls.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {matrix.map((item, index) => (
          <section key={index} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">{item.symptom}</h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">Likely causes</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  {item.causes.map((cause, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 mb-3">Quick checks</h3>
                <ol className="space-y-2 text-sm text-slate-700">
                  {item.quickChecks.map((check, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 mt-1 h-4 w-4 rounded-full bg-slate-200 text-xs font-medium text-slate-600 flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </span>
                      {check}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">Service call handoff notes</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>• Include exact model number and serial number</li>
          <li>• Note error codes or messages displayed</li>
          <li>• Describe when the issue started and frequency</li>
          <li>• List all troubleshooting steps already attempted</li>
          <li>• Specify if issue affects all users or specific ones</li>
          <li>• Include room location and asset tag if available</li>
        </ul>
      </section>
    </div>
  );
}