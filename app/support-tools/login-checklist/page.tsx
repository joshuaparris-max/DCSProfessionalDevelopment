export default function LoginChecklistPage() {
  const checklist = [
    {
      category: 'Username verification',
      items: [
        'Confirm username format (usually firstname.lastname or similar)',
        'Check for typos in username entry',
        'Verify account exists in the system',
        'Confirm correct domain (if applicable)',
        'Check if account is disabled or expired'
      ]
    },
    {
      category: 'Password troubleshooting',
      items: [
        'Verify Caps Lock is not enabled',
        'Check password complexity requirements',
        'Confirm password hasn\'t expired (common after resets)',
        'Try password reset if forgotten',
        'Check for password sync issues (cloud accounts)',
        'Verify password was changed successfully'
      ]
    },
    {
      category: 'Account status checks',
      items: [
        'Check if account is locked due to failed attempts',
        'Verify account hasn\'t expired',
        'Confirm account is active and not suspended',
        'Check for time-based access restrictions',
        'Verify account type (staff/student/guest) matches access needs'
      ]
    },
    {
      category: 'MFA and security',
      items: [
        'Check if MFA is required for this account',
        'Verify authenticator app or phone access',
        'Confirm MFA code hasn\'t expired (usually 30 seconds)',
        'Check backup codes if primary method fails',
        'Verify device is registered for MFA'
      ]
    },
    {
      category: 'Security concerns',
      items: [
        'Look for signs of account compromise (unusual login locations)',
        'Check recent password changes without user knowledge',
        'Verify user identity (avoid password resets for suspicious requests)',
        'Document any security-related observations',
        'Escalate immediately if compromise is suspected'
      ]
    }
  ];

  const boundaries = [
    'Never ask for or view user passwords',
    'Only reset passwords for verified account owners',
    'Do not bypass security measures without approval',
    'Document all password resets and access changes',
    'Escalate account lockouts that persist after resets'
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Login/password support checklist</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Safe troubleshooting steps for account access issues.
            Always verify user identity before making changes.
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

      <section className="rounded-[2rem] border border-red-200 bg-red-50 p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-3">Password reset boundaries</h3>
        <ul className="space-y-2 text-sm text-red-800">
          {boundaries.map((boundary, idx) => (
            <li key={idx} className="flex items-start">
              <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-red-600 flex-shrink-0"></span>
              {boundary}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">When to escalate</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>• Account remains locked after multiple reset attempts</li>
          <li>• Suspected account compromise or unauthorized access</li>
          <li>• MFA setup issues requiring admin intervention</li>
          <li>• Bulk account issues affecting multiple users</li>
          <li>• System-wide authentication problems</li>
          <li>• Password policy or security setting conflicts</li>
        </ul>
      </section>
    </div>
  );
}