type DecisionNode = {
  title: string;
  description?: string;
  branches?: Array<{ label: string; goto: string }>;
  questions?: Array<{
    question: string;
    yes?: { check?: string; result: string };
    no?: { check?: string; result: string };
  }>;
};

export default function SystemOwnershipTreePage() {
  const decisionTree: DecisionNode[] = [
    {
      title: 'Start: What is the issue?',
      branches: [
        { label: 'User cannot log in', goto: 'Login System' },
        { label: 'System/app not accessible', goto: 'Access Control' },
        { label: 'Hardware malfunction', goto: 'Hardware' },
        { label: 'Network not working', goto: 'Network' },
        { label: 'Email/file access issue', goto: 'Cloud Services' },
        { label: 'Permissions/access denied', goto: 'Access Control' }
      ]
    },
    {
      title: 'Login System',
      description: 'User cannot authenticate or get session error',
      questions: [
        {
          question: 'Is the password correct?',
          yes: {
            check: 'Try password reset. Account locked?',
            result: 'Password reset / Account unlock → Account Admin'
          },
          no: {
            check: 'Confirm username format',
            result: 'User education or password reset → Self-service'
          }
        },
        {
          question: 'Is MFA failing?',
          yes: {
            result: 'Check authenticator app or phone. Reset MFA → Account Admin'
          },
          no: {
            result: 'Check if account is disabled or expired → Account Admin'
          }
        }
      ]
    },
    {
      title: 'Access Control',
      description: 'User has valid login but cannot access application/file/site',
      questions: [
        {
          question: 'Is this a file/Teams/SharePoint issue?',
          yes: {
            result: 'Check group memberships and site permissions → Team owner / SharePoint admin'
          },
          no: {
            result: 'Check: Is user in the correct security group?'
          }
        },
        {
          question: 'Is user in the correct group?',
          yes: {
            check: 'Policy or license issue',
            result: 'Check assignment of app/license → Account Admin'
          },
          no: {
            result: 'Add user to group → Admin / Team owner'
          }
        }
      ]
    },
    {
      title: 'Hardware',
      description: 'Physical device not working (printer, ViewBoard, etc.)',
      questions: [
        {
          question: 'Is device powered on and showing status lights?',
          yes: {
            check: 'Try basic troubleshooting',
            result: 'If issue persists → Hardware vendor / Service contract'
          },
          no: {
            result: 'Power cycle device. Check power cable → You'
          }
        },
        {
          question: 'Is it connected to network/correct input?',
          yes: {
            result: 'Driver or software issue → L2 IT / Vendor'
          },
          no: {
            result: 'Check cable connections and input selection → You'
          }
        }
      ]
    },
    {
      title: 'Network',
      description: 'Device cannot connect to Wi-Fi or wired network, or no internet',
      questions: [
        {
          question: 'Is device showing network connection?',
          yes: {
            check: 'Run network troubleshooter',
            result: 'DNS/DHCP issue → Network Admin / ISP'
          },
          no: {
            result: 'Check Wi-Fi password. Restart device. Check adapter → You'
          }
        },
        {
          question: 'Can other devices connect?',
          yes: {
            result: 'Device-specific issue → Driver update / Reset network → You'
          },
          no: {
            result: 'Network-wide outage → Network Admin'
          }
        }
      ]
    },
    {
      title: 'Cloud Services',
      description: 'Email, OneDrive, Teams, or file access problem',
      questions: [
        {
          question: 'Does user have M365 license?',
          yes: {
            check: 'Check group membership and permissions',
            result: 'Sync issue or permission → You (triage) or Team owner'
          },
          no: {
            result: 'Assign license → Account Admin'
          }
        },
        {
          question: 'Is the issue one user or multiple?',
          yes: {
            result: 'User-specific: Check permissions / Try different device → You'
          },
          no: {
            result: 'Service-wide: Likely Azure/Office 365 issue → L2 IT'
          }
        }
      ]
    }
  ];

  const ownership = [
    { name: 'You (L1 IT Support)', responsibilities: ['Basic troubleshooting', 'Device connectivity', 'Password resets (after verification)', 'Driver updates', 'Triage and diagnosis'], color: 'blue' },
    { name: 'Account Admin', responsibilities: ['Create/enable accounts', 'Assign licenses', 'Reset MFA', 'Account lockouts', 'License management'], color: 'purple' },
    { name: 'Team Owner / Manager', responsibilities: ['Add/remove team members', 'Manage channel access', 'Change team permissions', 'Archive teams'], color: 'green' },
    { name: 'SharePoint Admin', responsibilities: ['Site permissions', 'Org sharing policy', 'Site collection management', 'Data retention'], color: 'indigo' },
    { name: 'Network Admin', responsibilities: ['Wi-Fi configuration', 'Network connectivity', 'Firewall rules', 'VLAN management', 'DNS/DHCP'], color: 'yellow' },
    { name: 'Hardware Vendor', responsibilities: ['Device repair', 'Component replacement', 'Firmware updates', 'Service calls'], color: 'orange' }
  ];

  const colorMap: Record<string, string> = {
    blue: 'border-blue-200 bg-blue-50',
    purple: 'border-purple-200 bg-purple-50',
    green: 'border-green-200 bg-green-50',
    indigo: 'border-indigo-200 bg-indigo-50',
    yellow: 'border-yellow-200 bg-yellow-50',
    orange: 'border-orange-200 bg-orange-50'
  };

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">&quot;What system owns this issue?&quot; decision tree</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Use this to route issues to the correct support team.
            Start at the top and answer questions to find the owner.
          </p>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Issue routing flowchart</h2>
        
        <div className="space-y-6">
          {decisionTree.slice(0, 1).map((node, idx) => (
            <div key={idx} className="space-y-3">
              <div className="bg-slate-100 rounded-lg p-4 border-2 border-slate-400">
                <h3 className="font-semibold text-slate-900">{node.title}</h3>
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                {node.branches?.map((branch, bidx) => (
                  <div key={bidx} className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                    <p className="text-blue-900">→ {branch.label}</p>
                    <p className="text-blue-600 mt-1">{branch.goto}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {decisionTree.slice(1).map((node, idx) => (
            <div key={idx + 1} className="space-y-3">
              <div className="bg-slate-100 rounded-lg p-4 border-2 border-slate-400">
                <h3 className="font-semibold text-slate-900">{node.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{node.description}</p>
              </div>
              <div className="space-y-3">
                {node.questions?.map((q, qidx) => (
                  <div key={qidx} className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="font-semibold text-slate-900 mb-3">{q.question}</p>
                    <div className="grid gap-3 md:grid-cols-2">
                      {q.yes && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
                          <p className="font-medium text-green-900">✓ Yes</p>
                          {q.yes.check && <p className="text-green-700 mt-1">Check: {q.yes.check}</p>}
                          {q.yes.result && <p className="text-green-700 mt-1">→ {q.yes.result}</p>}
                        </div>
                      )}
                      {q.no && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm">
                          <p className="font-medium text-orange-900">✗ No</p>
                          {q.no.check && <p className="text-orange-700 mt-1">Check: {q.no.check}</p>}
                          {q.no.result && <p className="text-orange-700 mt-1">→ {q.no.result}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Who owns what?</h2>
        <div className="space-y-4">
          {ownership.map((owner, idx) => (
            <div key={idx} className={`rounded-lg border-2 p-4 ${colorMap[owner.color]}`}>
              <h3 className="font-semibold text-slate-900 mb-2">{owner.name}</h3>
              <ul className="space-y-1 text-sm text-slate-700">
                {owner.responsibilities.map((resp, ridx) => (
                  <li key={ridx} className="flex items-start">
                    <span className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                    {resp}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-3">Escalation tips</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>• Always confirm you&apos;ve done basic troubleshooting before escalating</li>
          <li>• Include what you&apos;ve already tried (saves L2 time)</li>
          <li>• Provide exact error messages, device models, and asset tags</li>
          <li>• If unsure who owns it, escalate to your L2 IT manager</li>
          <li>• Document the escalation and decision for future reference</li>
        </ul>
      </section>
    </div>
  );
}