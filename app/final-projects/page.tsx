export default function FinalProjectsPage() {
  const projects = [
    {
      id: 'network-diagram',
      title: 'School Network Infrastructure Diagram',
      description: 'Create a comprehensive diagram of your school\'s network infrastructure, including all devices, connections, and security measures.',
      skills: ['Network fundamentals', 'Documentation', 'Visualization'],
      difficulty: 'Intermediate',
      estimatedTime: '4-6 hours'
    },
    {
      id: 'security-audit',
      title: 'IT Security Audit Checklist',
      description: 'Develop a comprehensive security audit checklist for school IT systems, covering password policies, access controls, and incident response.',
      skills: ['Security awareness', 'Risk assessment', 'Policy development'],
      difficulty: 'Advanced',
      estimatedTime: '6-8 hours'
    },
    {
      id: 'troubleshooting-guide',
      title: 'Common Issues Troubleshooting Guide',
      description: 'Create a user-friendly troubleshooting guide for the 10 most common IT issues faced by teachers and students.',
      skills: ['Problem solving', 'Technical writing', 'User support'],
      difficulty: 'Beginner',
      estimatedTime: '3-4 hours'
    },
    {
      id: 'device-deployment',
      title: 'Device Deployment Strategy',
      description: 'Design a strategy for deploying 100 new devices to a school, including imaging, configuration, and rollout planning.',
      skills: ['Device management', 'Project planning', 'MDM concepts'],
      difficulty: 'Advanced',
      estimatedTime: '8-10 hours'
    },
    {
      id: 'training-program',
      title: 'Staff Training Program',
      description: 'Develop a 6-month training program for school staff on digital literacy and IT best practices.',
      skills: ['Training design', 'Curriculum development', 'Communication'],
      difficulty: 'Intermediate',
      estimatedTime: '5-7 hours'
    },
    {
      id: 'incident-response',
      title: 'Cybersecurity Incident Response Plan',
      description: 'Create an incident response plan for common cybersecurity threats in an educational environment.',
      skills: ['Security incident response', 'Planning', 'Risk management'],
      difficulty: 'Advanced',
      estimatedTime: '7-9 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Final Projects</h1>
          <p className="mt-2 text-slate-600">
            Apply your learning with these capstone projects. Each project helps you demonstrate mastery of key IT support skills.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                <div className="mt-2 flex items-center gap-4 text-sm text-slate-600">
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                    project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {project.difficulty}
                  </span>
                  <span>{project.estimatedTime}</span>
                </div>
              </div>

              <p className="mb-4 text-sm text-slate-700">{project.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-900">Skills Demonstrated:</h4>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">
                Start Project
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="text-lg font-semibold text-blue-900">Project Guidelines</h3>
          <ul className="mt-3 list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>Use the modules and scenarios in this app to research and gather information</li>
            <li>Document your process and decisions in your PD log</li>
            <li>Share your completed project with your supervisor for feedback</li>
            <li>Consider presenting your work in a team meeting or training session</li>
            <li>Projects can be adapted to your specific school environment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
