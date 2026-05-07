export default function M365TriagePage() {
  const triage = [
    {
      symptom: 'Cannot open shared file',
      checks: [
        'Verify file location: Team site, shared drive, or personal OneDrive?',
        'Check permission: Is user a member of the Team or shared folder?',
        'Test access method: Try web browser (OneDrive.com) vs sync client vs Teams app',
        'Confirm correct account: User logged in with school account, not personal?',
        'Check file status: Is file locked, deleted, or moved?'
      ]
    },
    {
      symptom: 'Sync issues (files not appearing)',
      checks: [
        'Check OneDrive status in system tray (paused, offline, syncing?)',
        'Verify sufficient storage space locally and in cloud',
        'Restart sync client (pause, wait 2min, resume)',
        'Check network connectivity (wired better than Wi-Fi)',
        'Review file path length (Windows has 260 character limit on some systems)',
        'Check for excluded file types or names'
      ]
    },
    {
      symptom: 'Cannot access Team site or channel',
      checks: [
        'Verify user is member of Team (check Team settings if manager)',
        'Confirm Team is active, not archived',
        'Try accessing via Teams app vs browser',
        'Check for private vs public channel permissions',
        'Verify user group memberships include Team access',
        'Check if Team access is restricted by policy'
      ]
    },
    {
      symptom: 'Sharing permissions issues',
      checks: [
        'Verify original owner/site admin can still access',
        'Check sharing link expiration date',
        'Confirm sharing link permissions (edit vs view only)',
        'Verify user account state (not locked, not expired)',
        'Check if file is in allowed location for sharing',
        'Review org-wide sharing policies'
      ]
    },
    {
      symptom: 'OneDrive not syncing',
      checks: [
        'Verify user has active Microsoft 365 license',
        'Check OneDrive folder location (typically C:\\Users\\[user]\\OneDrive)',
        'Restart OneDrive (Settings > Accounts > Sync)',
        'Clear cache (delete .dat files in OneDrive folder)',
        'Update OneDrive to latest version',
        'Check for network/firewall blocking'
      ]
    }
  ];

  const ownership = [
    {
      issue: 'User-level access problems',
      owner: 'L1 IT Support (You)',
      examples: ['Cannot open file', 'Password/login issues', 'Device sync setup', 'Network connectivity']
    },
    {
      issue: 'Team membership or permissions',
      owner: 'Team owner or admin',
      examples: ['Add user to Team', 'Change member permissions', 'Archive Team', 'Manage channel access']
    },
    {
      issue: 'Site admin or tenant settings',
      owner: 'SharePoint admin',
      examples: ['Modify org sharing policy', 'Enable/disable features', 'Manage site permissions', 'Retention policies']
    },
    {
      issue: 'Licensing or account issues',
      owner: 'Account admin/Manager',
      examples: ['Assign M365 license', 'Enable mailbox', 'Account activation', 'Bulk license updates']
    }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Teams/SharePoint/OneDrive triage guide</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Systematic approach to Microsoft 365 file access issues.
            Follow this to isolate problems before escalating.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {triage.map((item, index) => (
          <section key={index} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">{item.symptom}</h2>
            <ul className="space-y-3 text-sm text-slate-700">
              {item.checks.map((check, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="mr-3 mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                  {check}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">What system owns this issue?</h3>
        <div className="space-y-4">
          {ownership.map((item, idx) => (
            <div key={idx} className="rounded-lg border border-blue-100 bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-blue-900">{item.issue}</h4>
                  <p className="text-sm text-blue-600 mt-1">→ Escalate to: <strong>{item.owner}</strong></p>
                </div>
              </div>
              <p className="text-sm text-blue-700 mt-2">Examples: {item.examples.join(', ')}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-3">Escalation note template</h3>
        <div className="bg-white rounded-lg p-4 text-sm font-mono text-amber-800 border border-amber-100">
          <p className="mb-2">User: [name] | Department: [dept]</p>
          <p className="mb-2">File/Site: [exact location or URL]</p>
          <p className="mb-2">Issue: [specific symptom - cannot open, sync issues, etc.]</p>
          <p className="mb-2">Steps taken: [list what was already tried]</p>
          <p className="mb-2">User account: [does user have M365 license? is it active?]</p>
          <p>Ownership: [which system: user access, team membership, site admin, license]</p>
        </div>
        <p className="text-sm text-amber-700 mt-3">
          <strong>Key:</strong> Always include whether the issue affects one user or multiple, and which access method was tested (app, browser, sync).
        </p>
      </section>

      <section className="rounded-[2rem] border border-green-200 bg-green-50 p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-2">Privacy-safe communication</h3>
        <ul className="space-y-2 text-sm text-green-800">
          <li>✓ Use &quot;Team A&quot; instead of &quot;Year 9 Maths - Cohort 2&quot;</li>
          <li>✓ Say &quot;shared document&quot; instead of &quot;grade spreadsheet&quot;</li>
          <li>✓ Never include file contents or sensitive paths in tickets</li>
          <li>✓ Refer to users by role (&quot;class teacher&quot;) when possible</li>
          <li>✗ Do not screenshot files containing student names or grades</li>
          <li>✗ Do not share file paths containing sensitive folder names</li>
        </ul>
      </section>
    </div>
  );
}