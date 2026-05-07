export default function EscalationTemplatesPage() {
  const templates = [
    {
      title: 'Hardware failure (printer)',
      template: `**To:** Printer Service Vendor\n**Priority:** Medium\n**Device:** Printer [Model] [Serial], Room [Location]\n\n**Issue:** Printer producing blank output on all test prints.\n\n**Diagnosis:**\n- Toner levels verified adequate\n- Fuser unit temperature appears normal\n- User attempted 3 different paper types\n- Blank output consistent across all users\n\n**Impact:** All users in [Location] unable to print color documents.\n\n**Next steps:** Require service call for hardware diagnostic.`,
      scenario: 'Printer producing blank pages despite adequate toner'
    },
    {
      title: 'Network issue (routing)',
      template: `**To:** Network Support Team\n**Priority:** High\n**Location:** Building [Name], Rooms [List]\n\n**Issue:** One classroom subnet has internet connectivity but no internal network access.\n\n**Diagnosis:**\n- Tested devices: 3 different machines, all affected\n- Symptoms: Cannot access file servers, printers, or Teams\n- Can reach external websites (Google, etc.)\n- Ethernet and Wi-Fi both affected\n- Router shows normal status lights\n\n**Evidence:** IPCONFIG output shows [IP range], can ping external gateway but not internal gateway.\n\n**Next steps:** Require network troubleshooting - suspect routing or VLAN configuration.`,
      scenario: 'Classroom has internet but no internal network access'
    },
    {
      title: 'Account/licensing issue',
      template: `**To:** Account Admin\n**Priority:** Medium\n**User:** [Name] | [Department]\n\n**Issue:** User reports cannot send emails or access Teams.\n\n**Diagnosis:**\n- User credential verification: Password resets, MFA confirmed working\n- Device troubleshooting: Cleared cache, updated Outlook, tested on different device\n- Issue persists across apps\n\n**Likely cause:** M365 license not assigned or mailbox not activated.\n\n**Requested action:** Verify license assignment and activate mailbox if needed.\n\n**User impact:** Cannot participate in team communications or email.`,
      scenario: 'User cannot access email or Teams despite valid login'
    },
    {
      title: 'Software/driver issue',
      template: `**To:** IT Support Level 2\n**Priority:** Medium\n**Device:** [Device Model], Asset [Tag]\n\n**Issue:** ViewBoard touch functionality not responding.\n\n**Diagnosis:**\n- Display output working correctly (HDMI signal detected)\n- Touch drivers verified installed in Device Manager\n- USB cable (touch controller) seated and recognized\n- Touch calibration incomplete - unable to proceed\n\n**Steps attempted:**\n1. Restart device\n2. Reinstall touch drivers from manufacturer\n3. Test with different USB port\n4. Check device manager for errors\n\n**Next steps:** Require driver update or hardware diagnostic.\n\n**Impact:** Classroom cannot use ViewBoard interactive features.`,
      scenario: 'ViewBoard touch not working despite correct cables and drivers'
    },
    {
      title: 'Vendor handoff (photocopier)',
      template: `**To:** Photocopier Maintenance\n**Contact:** [Device Vendor Support]\n**Device:** [Model], Serial [Number], Location [Room]\n\n**Issue:** Fuser roller appears damaged - visible residue on output.\n\n**Observations:**\n- Issue started: [Date]\n- Frequency: Affects approximately 1 in 5 pages\n- All toner and consumables at acceptable levels\n- Device temperature normal\n\n**Troubleshooting completed:**\n- Cleared paper path\n- Cleaned rollers with supplied cleaning kit\n- Restarted device\n\n**Diagnosis:** Physical component failure likely (fuser or pickup roller)\n\n**Requested action:** Service call required - unable to resolve with standard troubleshooting.`,
      scenario: 'Photocopier producing smudged or fused output'
    },
    {
      title: 'Access request (SharePoint)',
      template: `**To:** SharePoint Site Admin\n**User:** [Name] | Department: [Dept]\n**Site:** [Site Name/URL]\n\n**Issue:** New staff member requires access to shared documents.\n\n**Context:**\n- User type: New staff member, [Department]\n- Start date: [Date]\n- Access needed: Files and collaborative editing on [Project/Team name]\n- Supervision: Appropriate for role\n\n**Current status:** User has M365 license and email access.\n\n**Requested action:** Add user to [Site/Team/Group] with [Editor/Contributor] permissions.\n\n**Timeline:** Needed before [Date] to support [purpose].`,
      scenario: 'New staff needs access to team documents'
    }
  ];

  const commonMistakes = [
    'Writing "can\'t access system" without specifics (which system? what error?)',
    'Including sensitive file contents or student data in ticket',
    'Not listing steps already attempted (causes repeated troubleshooting)',
    'Setting ambiguous priority without justifying impact',
    'Escalating without boundary - unclear what L2 should do vs what you\'ve done',
    'Forgetting to include device serial/asset tag or room number',
    'Using emotional language ("urgent!", "broken!") instead of impact'
  ];

  const bestPractices = [
    'Lead with the symptom, not the suspected cause',
    'Include "steps already attempted" so L2 doesn\'t repeat work',
    'Specify one device vs. multiple devices vs. all devices',
    'Use exact error messages (copy/paste from screen)',
    'Include serial numbers, asset tags, room numbers',
    'State impact in business terms (users affected, service down)',
    'End with clear requested action or next steps'
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Escalation note examples</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Templates for clean handoffs to Level 2, vendors, or admins.
            These show how to communicate issues clearly and professionally.
          </p>
        </div>
      </section>

      <div className="space-y-6">
        {templates.map((item, index) => (
          <section key={index} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
              <p className="text-sm text-slate-600 mt-1">Scenario: {item.scenario}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-700 font-mono whitespace-pre-wrap border border-slate-200 overflow-x-auto">
              {item.template}
            </div>
          </section>
        ))}
      </div>

      <section className="rounded-[2rem] border border-red-200 bg-red-50 p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-3">Common mistakes to avoid</h3>
        <ul className="space-y-2 text-sm text-red-800">
          {commonMistakes.map((mistake, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-red-600 flex-shrink-0"></span>
              {mistake}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[2rem] border border-green-200 bg-green-50 p-6">
        <h3 className="text-lg font-semibold text-green-900 mb-3">Best practices</h3>
        <ul className="space-y-2 text-sm text-green-800">
          {bestPractices.map((practice, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-green-600 flex-shrink-0"></span>
              {practice}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}