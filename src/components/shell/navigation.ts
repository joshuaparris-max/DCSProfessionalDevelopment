export type NavItem = {
  href: string;
  label: string;
  icon?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const navigationGroups: NavGroup[] = [
  {
    label: 'Today',
    items: [
      { href: '/', label: 'Dashboard' },
      { href: '/due-today', label: 'Due Today' },
      { href: '/scheduler', label: 'Quiet Window' },
      { href: '/due-today?mode=tiny', label: 'Overwhelmed Mode' }
    ]
  },
  {
    label: 'Learn',
    items: [
      { href: '/modules', label: 'Modules' },
      { href: '/academic-pd', label: 'Academic PD' },
      { href: '/search', label: 'Search' }
    ]
  },
  {
    label: 'Practise',
    items: [
      { href: '/msp-transition', label: 'MSP Transition' },
      { href: '/client-communication', label: 'Client Communication' },
      { href: '/scenarios', label: 'Missions' },
      { href: '/support-tools', label: 'Support Tools' },
      { href: '/msp-kb-builder', label: 'MSP KB Builder' },
      { href: '/playground', label: 'Code Playground' }
    ]
  },
  {
    label: 'Evidence',
    items: [
      { href: '/progress', label: 'Progress' },
      { href: '/readiness', label: 'Readiness' },
      { href: '/pd-log', label: 'PD Log' },
      { href: '/error-log', label: 'Error Log' },
      { href: '/evidence-pack', label: 'Career Evidence Pack' }
    ]
  },
  {
    label: 'Settings',
    items: [
      { href: '/settings', label: 'Settings' },
      { href: '/usage-insights', label: 'Usage Insights' },
      { href: '/trainer-guide', label: 'Trainer Guide' }
    ]
  }
];

export const navigationItems: NavItem[] = navigationGroups.flatMap((group) => group.items);
