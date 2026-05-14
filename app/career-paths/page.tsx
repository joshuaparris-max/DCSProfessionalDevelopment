export default function CareerPathsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Career Paths</h1>
          <p className="mt-2 text-slate-600">
            Explore different career progression paths in school IT support. See the skills and milestones for each level.
          </p>
        </div>

        <div className="space-y-8">
          {/* Level 1: Support Technician */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-700">
                1
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Level 1: Support Technician</h2>
                <p className="text-sm text-slate-600">Entry-level IT support role</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-slate-900">Key Skills</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
                  <li>Basic hardware troubleshooting</li>
                  <li>Password resets and account management</li>
                  <li>Printer setup and maintenance</li>
                  <li>Basic network connectivity issues</li>
                  <li>Software installation and updates</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Milestones</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
                  <li>Complete basic training modules</li>
                  <li>Resolve 50+ support tickets</li>
                  <li>Pass Level 1 certification</li>
                  <li>6 months experience</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Level 2: Senior Support Technician */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-700">
                2
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Level 2: Senior Support Technician</h2>
                <p className="text-sm text-slate-600">Advanced troubleshooting and system administration</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-slate-900">Key Skills</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
                  <li>Advanced network troubleshooting</li>
                  <li>Server and infrastructure management</li>
                  <li>Security incident response</li>
                  <li>Scripting and automation</li>
                  <li>MDM and device management</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Milestones</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
                  <li>Complete advanced training modules</li>
                  <li>Mentor junior technicians</li>
                  <li>Pass Level 2 certification</li>
                  <li>2 years experience</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Level 3: IT Systems Administrator */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-lg font-bold text-purple-700">
                3
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Level 3: IT Systems Administrator</h2>
                <p className="text-sm text-slate-600">System design and strategic planning</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-slate-900">Key Skills</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
                  <li>System architecture design</li>
                  <li>Cloud infrastructure management</li>
                  <li>Security policy development</li>
                  <li>Project management</li>
                  <li>Advanced scripting and development</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Milestones</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
                  <li>Lead major IT projects</li>
                  <li>Develop department procedures</li>
                  <li>Pass Level 3 certification</li>
                  <li>5+ years experience</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Level 4: IT Director */}
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-lg font-bold text-red-700">
                4
              </div>
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Level 4: IT Director</h2>
                <p className="text-sm text-slate-600">Leadership and strategic oversight</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-slate-900">Key Skills</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
                  <li>Strategic IT planning</li>
                  <li>Budget management</li>
                  <li>Team leadership and development</li>
                  <li>Stakeholder communication</li>
                  <li>Risk management</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Milestones</h3>
                <ul className="mt-2 list-disc list-inside text-sm text-slate-700 space-y-1">
                  <li>Manage IT department budget</li>
                  <li>Lead strategic initiatives</li>
                  <li>Executive leadership experience</li>
                  <li>10+ years experience</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h3 className="text-lg font-semibold text-amber-900">Your Progress</h3>
          <p className="mt-2 text-sm text-amber-800">
            Track your current level and skills development through the modules and assessments in this app.
            Focus on completing relevant modules and scenarios to build towards the next level.
          </p>
        </div>
      </div>
    </div>
  );
}
