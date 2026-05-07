export default function UnblockChecklistPage() {
  const checklist = [
    {
      category: 'Site and URL details',
      items: [
        'Exact URL or domain name (not just "the website")',
        'Specific page or path that needs access (if not entire site)',
        'Screenshot of blocked page or category message (if available)',
        'Whether issue affects one user or multiple',
        'When the site was last accessible (if previously unblocked)'
      ]
    },
    {
      category: 'Learning purpose and justification',
      items: [
        'Year level(s) requiring access',
        'Subject area and curriculum link',
        'How the resource supports learning outcomes',
        'How it will be used (instruction, research, assessment)',
        'Duration of access needed (term, year, ongoing)',
        'How teacher will supervise or limit usage'
      ]
    },
    {
      category: 'Class and supervision context',
      items: [
        'Class name and year level',
        'Class size and composition',
        'How long the site will be used per lesson',
        'Whether access will be supervised in class',
        'Who will supervise (classroom teacher, IT, etc.)',
        'Age-appropriateness considerations'
      ]
    },
    {
      category: 'Safety and compliance checks',
      items: [
        'Site does not contain inappropriate content',
        'Site complies with child online safety standards',
        'Site does not bypass security controls',
        'Site does not host peer-to-peer or file-sharing tools',
        'No personal or sensitive student data is shared',
        'Request aligns with acceptable use policy'
      ]
    },
    {
      category: 'Common blocking categories to clarify',
      items: [
        'Streaming/media (may need approval for bandwidth)',
        'Social media (verify legitimate educational use)',
        'Cloud storage/file sharing (understand access controls)',
        'Communication tools (chat, forums - supervision required)',
        'Coding/development (legitimate if tech subject)',
        'Anonymous proxies or VPNs (will be declined)'
      ]
    }
  ];

  const examples = [
    {
      title: 'Math graphing resource',
      content: 'Desmos.com for Year 8-10 algebra. Used 1-2x per week for 20 minutes in supervised class. Students graph equations and explore real-world function models. Year 8, 9, 10 maths classes.'
    },
    {
      title: 'Science simulation',
      content: 'PhET interactive simulations for physics concepts. Used in supervised labs. Year 10-12 physics investigating motion, forces, energy. 30-40 minutes per experiment, 2-3 times per term.'
    },
    {
      title: 'History research',
      content: 'BBC Bitesize history resources for Year 9 WW2 unit. Supervised classroom use. Research task - students extract facts from primary source guides. 2-3 lessons per term, 30 minutes each.'
    }
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-w-3xl">
          <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support tools</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">Website unblock request checklist</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Information needed to submit a complete and effective filtering request.
            The more detail you provide, the faster the request can be reviewed.
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

      <section className="rounded-[2rem] border border-blue-200 bg-blue-50 p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Example requests</h3>
        <div className="space-y-4">
          {examples.map((example, idx) => (
            <div key={idx} className="rounded-lg border border-blue-100 bg-white p-4">
              <h4 className="font-semibold text-blue-900 mb-2">{example.title}</h4>
              <p className="text-sm text-blue-800">{example.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-red-200 bg-red-50 p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-3">What will be declined</h3>
        <ul className="space-y-2 text-sm text-red-800">
          <li>• Requests without clear learning purpose</li>
          <li>• Sites containing inappropriate or adult content</li>
          <li>• Proxy, VPN, or anonymizer services</li>
          <li>• Peer-to-peer or torrent sites</li>
          <li>• Sites used for bypassing security controls</li>
          <li>• Streaming services without supervision plan</li>
          <li>• Social media not aligned to curriculum</li>
        </ul>
      </section>

      <section className="rounded-[2rem] border border-amber-200 bg-amber-50 p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">What not to include</h3>
        <ul className="space-y-2 text-sm text-amber-800">
          <li>• Screenshots containing student names or faces</li>
          <li>• Personal email addresses (use school email)</li>
          <li>• Sensitive internal notes or ticket numbers</li>
          <li>• Pressure or urgency language (&quot;needed today&quot;)</li>
          <li>• Vague descriptions (&quot;science website&quot;, &quot;study tool&quot;)</li>
        </ul>
      </section>
    </div>
  );
}