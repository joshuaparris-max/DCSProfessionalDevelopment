export default function WifiChecklistPage() {
  const checklist = [
    {
      category: 'Device-specific checks',
      items: [
        'Check Wi-Fi adapter is enabled and not disabled',
        'Verify correct SSID (network name) is selected',
        'Confirm Wi-Fi password is entered correctly',
        'Forget and rejoin the network (Settings > Network > Forget)',
        'Check for IP address assignment (avoid 169.254.x.x APIPA)',
        'Test connectivity with another device on same network'
      ]
    },
    {
      category: 'Network troubleshooting',
      items: [
        'Compare with working device: same network, same symptoms?',
        'Check if issue affects one device or multiple devices',
        'Verify DHCP server is functioning (automatic IP assignment)',
        'Test DNS resolution (can you browse by IP but not domain?)',
        'Check gateway connectivity (can you ping router IP?)',
        'Look for signal strength issues or interference'
      ]
    },
    {
      category: 'Environmental factors',
      items: [
        'Check physical proximity to access point',
        'Look for sources of interference (microwaves, cordless phones)',
        'Verify access point is powered and operational',
        'Check for recent network changes or maintenance',
        'Test in different locations within the building',
        'Check if issue occurs during specific times'
      ]
    },
    {
      category: 'Advanced diagnostics',
      items: [
        'Run network troubleshooter (Windows Settings > Network > Troubleshoot)',
        'Check device manager for Wi-Fi adapter issues',
        'Update Wi-Fi drivers if available',
        'Test with Ethernet cable (if available) to isolate Wi-Fi',
        'Check firewall/antivirus settings blocking connection',
        'Review event logs for connection errors'
      ]
    }
  ];

  const escalationNotes = [
    'Device model and OS version',
    'Exact error messages or symptoms',
    'IP address information (if assigned)',
    'Network name (SSID) and security type',
    'Time and duration of issue',
    'Number of affected devices/users',
    'Steps already attempted',
    'Whether issue is intermittent or constant'
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Wi-Fi triage checklist</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Systematic approach to diagnosing Wi-Fi connectivity issues.
            Work through these checks in order before escalating.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {checklist.map((section, index) => (
          <section key={index} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{section.category}</h2>
            <ul className="space-y-3 text-sm text-slate-700">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-3 mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-3">What to include when escalating</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          {escalationNotes.map((note, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-600 flex-shrink-0"></span>
              {note}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick reference: IP addressing</h3>
        <div className="grid gap-4 md:grid-cols-3 text-sm text-blue-800">
          <div>
            <strong>DHCP:</strong> Automatic IP assignment from router
          </div>
          <div>
            <strong>DNS:</strong> Translates domain names to IP addresses
          </div>
          <div>
            <strong>Gateway:</strong> Router IP address for internet access
          </div>
        </div>
        <p className="mt-3 text-sm text-blue-800">
          <strong>APIPA (169.254.x.x):</strong> Indicates DHCP failure - device assigned self IP but has no internet.
        </p>
      </section>
    </div>
  );
}