export default function ViewBoardFlowPage() {
  const steps = [
    {
      title: 'Initial assessment',
      checks: [
        'Confirm laptop is connected to ViewBoard',
        'Check cable type (HDMI, USB-C, DisplayPort)',
        'Verify cable is securely plugged in at both ends',
        'Ensure laptop and ViewBoard are powered on'
      ]
    },
    {
      title: 'Display detection',
      checks: [
        'On laptop: Press Windows + P to open display options',
        'Select "Duplicate" or "Extend" as appropriate',
        'If no display options appear, try different cable or port',
        'Test with another known working cable/device'
      ]
    },
    {
      title: 'Input source selection',
      checks: [
        'Locate input/source button on ViewBoard remote or side panel',
        'Cycle through available inputs (HDMI1, HDMI2, USB-C, etc.)',
        'Ensure correct input is selected for connected cable',
        'Check if ViewBoard recognizes the input signal'
      ]
    },
    {
      title: 'Audio troubleshooting',
      checks: [
        'Verify audio cable is connected (if separate from video)',
        'Check laptop sound settings - select ViewBoard as output device',
        'Adjust ViewBoard volume using remote or on-screen controls',
        'Test audio with different source (YouTube, system sounds)'
      ]
    },
    {
      title: 'Touch functionality',
      checks: [
        'Ensure USB cable for touch is connected (usually separate)',
        'Check if touch drivers are installed on laptop',
        'Calibrate touch if available in ViewBoard settings',
        'Test touch response with finger or stylus'
      ]
    },
    {
      title: 'Adapter and compatibility',
      checks: [
        'Verify adapter compatibility (HDMI to USB-C, etc.)',
        'Check adapter power requirements (active vs passive)',
        'Ensure laptop ports support the required signals',
        'Try different adapter if available'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">ViewBoard quick-fix flow</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Systematic troubleshooting steps for ViewBoard display, audio, and touch issues.
            Follow this flow before escalating room faults.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <section key={index} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                {index + 1}
              </div>
              <h2 className="ml-3 text-xl font-semibold text-slate-900">{step.title}</h2>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              {step.checks.map((check, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-3 mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                  {check}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">When to escalate room faults</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>• ViewBoard shows no signal despite correct cable and input</li>
          <li>• Physical damage to ViewBoard, cables, or ports</li>
          <li>• Touch calibration fails or touch is completely unresponsive</li>
          <li>• Multiple adapters/cables tested with same result</li>
          <li>• Issue persists across different laptops/devices</li>
          <li>• ViewBoard firmware or hardware errors displayed</li>
        </ul>
        <p className="mt-3 text-sm text-amber-800">
          <strong>Escalation note:</strong> Include room number, ViewBoard model/serial, exact symptoms, and all steps attempted.
        </p>
      </section>
    </div>
  );
}