export type ModuleFlashcard = {
  id: string;
};

export type ModuleData = {
  id: string;
  title: string;
  sections: string[];
  flashcards: ModuleFlashcard[];
};

export const modules: ModuleData[] = [
  {
    id: 'dcs-it-support-foundations',
    title: 'DCS IT Support Foundations',
    sections: ['Support first, PD second'],
    flashcards: [
      { id: 'foundations-f1' },
      { id: 'foundations-f2' }
    ]
  },
  {
    id: 'ports-and-protocols',
    title: 'Ports and Protocols',
    sections: ['Why ports matter'],
    flashcards: [{ id: 'ports-f1' }, { id: 'ports-f2' }]
  },
  {
    id: 'dns-dhcp-gateway-ip-basics',
    title: 'DNS, DHCP, Gateway, and IP Basics',
    sections: ['IP addressing basics'],
    flashcards: [{ id: 'dns-f1' }, { id: 'dhcp-f1' }]
  },
  {
    id: 'printer-troubleshooting',
    title: 'Printer Troubleshooting',
    sections: ['Printer status checks'],
    flashcards: [{ id: 'printer-f1' }, { id: 'printer-f2' }]
  },
  {
    id: 'classroom-display-viewboard-troubleshooting',
    title: 'Classroom Display and ViewBoard Troubleshooting',
    sections: ['Display and audio checks'],
    flashcards: [{ id: 'viewboard-f1' }, { id: 'viewboard-f2' }]
  },
  {
    id: 'm365-identity-offboarding-basics',
    title: 'M365 Identity and Offboarding Basics',
    sections: ['Offboarding sequence'],
    flashcards: [{ id: 'offboarding-f1' }, { id: 'offboarding-f2' }]
  },
  {
    id: 'mdm-intune-group-policy-concepts',
    title: 'MDM, Intune, and Group Policy Concepts',
    sections: ['Management model differences'],
    flashcards: [{ id: 'mdm-f1' }, { id: 'gpo-f1' }]
  },
  {
    id: 'vlans-network-segmentation',
    title: 'VLANs and Network Segmentation',
    sections: ['Network segmentation basics'],
    flashcards: [{ id: 'vlan-f1' }, { id: 'vlan-f2' }]
  },
  {
    id: 'cloud-models-saas-paas-iaas-daas',
    title: 'Cloud Models: SaaS, PaaS, IaaS, and DaaS',
    sections: ['Cloud model comparison'],
    flashcards: [{ id: 'cloud-f1' }, { id: 'cloud-f2' }]
  },
  {
    id: 'ticket-notes-escalation-quality',
    title: 'Ticket Notes and Escalation Quality',
    sections: ['Clear escalation notes'],
    flashcards: [{ id: 'ticket-f1' }, { id: 'ticket-f2' }]
  }
];
