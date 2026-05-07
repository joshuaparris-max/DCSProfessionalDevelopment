export default function NewUserChecklistPage() {
  const checklist = [
    {
      category: 'Account readiness verification',
      items: [
        'Confirm account has been created in Active Directory/Entra',
        'Verify account is enabled and not expired',
        'Check password has been set (temporary or permanent)',
        'Ensure account type is correct (staff/prac/student)',
        'Confirm username format follows school standards',
        'Verify email address is configured and accessible'
      ]
    },
    {
      category: 'Group membership and permissions',
      items: [
        'Check domain group memberships are applied',
        'Verify security groups for file access are assigned',
        'Confirm distribution list memberships',
        'Check application-specific group access (if applicable)',
        'Verify printer access groups are configured',
        'Ensure shared folder permissions are set'
      ]
    },
    {
      category: 'Software and application access',
      items: [
        'Verify Microsoft 365 license assignment',
        'Check Google Workspace access (if applicable)',
        'Confirm software installation permissions',
        'Ensure VPN access is configured (if needed)',
        'Check learning management system access',
        'Verify specialized software licenses are assigned'
      ]
    },
    {
      category: 'Device and infrastructure readiness',
      items: [
        'Confirm device is enrolled in MDM/Intune',
        'Check device compliance policies are met',
        'Verify network access permissions',
        'Ensure Wi-Fi access is configured',
        'Check printing permissions are set',
        'Confirm backup solutions are configured'
      ]
    },
    {
      category: 'Day-one support checklist',
      items: [
        'Verify user can log in successfully',
        'Test basic application access (email, files)',
        'Confirm device setup is complete',
        'Check user understands password requirements',
        'Ensure user knows how to get help',
        'Document any outstanding issues for follow-up'
      ]
    }
  ];

  const escalationPoints = [
    'Account creation delays beyond expected timeframe',
    'Missing critical group memberships blocking core access',
    'Bulk user onboarding requiring coordination',
    'Integration issues between systems (AD/Entra/Google/etc.)',
    'Licensing or budget constraints preventing access',
    'Complex permission scenarios requiring security review'
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">New user access checklist</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Comprehensive checklist for onboarding new staff, prac teachers, and students.
            Use this to ensure complete access setup before first day.
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
        <h3 className="text-lg font-semibold text-amber-900 mb-3">When to escalate cleanly</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          {escalationPoints.map((point, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-amber-600 flex-shrink-0"></span>
              {point}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-amber-800">
          <strong>Escalation note template:</strong> &quot;New user [name] requires [specific access/permission]. Current status: [what&apos;s done]. Next steps needed: [what&apos;s required].&quot;
        </p>
      </section>
    </div>
  );
}