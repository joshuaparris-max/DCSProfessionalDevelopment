import type { TrainingModule } from '../types/training';

const reviewSchedule = 'Again today. Hard tomorrow. Good in 3 days. Easy in 7 days.';

export const m365FilesModule: TrainingModule = {
  id: 'm365-teams-sharepoint-onedrive-basics',
  title: 'Teams, SharePoint, OneDrive, and File Access Basics',
  description: 'Troubleshooting shared file access, sync issues, and understanding the relationship between M365 storage locations.',
  domain: 'Cloud Services',
  level: 'L1',
  estimatedMinutes: 22,
  tags: ['M365', 'Teams', 'SharePoint', 'OneDrive', 'Sync'],
  learningObjectives: [
    'Distinguish between personal storage (OneDrive) and shared storage (Teams/SharePoint).',
    'Identify and resolve common OneDrive sync icons and errors.',
    'Verify permissions and access boundaries before escalating file-not-found issues.',
    'Explain the "Sync" vs "Shortcut" behavior to users to prevent data loss.'
  ],
  dcsRelevance: [
    'Staff frequently use Teams for collaborative work and OneDrive for personal files.',
    'Sync errors can lead to "missing" files or version conflicts that cause significant stress for teachers.',
    'Understanding the cloud storage map helps Josh resolve access issues without guessing permissions.'
  ],
  sections: [
    {
      id: 'm365-1',
      title: 'The Storage Map: Where do files live?',
      bodyMarkdown: `In the Microsoft 365 world, files live in different places depending on who needs them:\n\n1. **OneDrive**: Your personal school work. Only you see it unless you share it.\n2. **Teams/SharePoint**: Collaborative spaces. If you put it in a Teams channel, it actually lives in a SharePoint site behind the scenes.\n\n**Triage Rule:** If a user says "I can't find my file," ask: "Was it a personal file or a shared Team file?"`
    },
    {
      id: 'm365-2',
      title: 'OneDrive Sync: The Blue Cloud',
      bodyMarkdown: `The OneDrive sync client (the blue cloud in the taskbar) is what makes cloud files appear in File Explorer.\n\n**Common Icons:**\n- **Blue Cloud**: Online only (doesn't take up space).\n- **Green Tick**: Locally available (downloaded).\n- **Solid Green Circle**: Always keep on this device.\n- **Red X**: Sync error. Usually a filename issue or a full disk.\n- **Circular Arrows**: Syncing in progress.`
    },
    {
      id: 'm365-3',
      title: 'Access and Permissions',
      bodyMarkdown: `At DCS, access is often controlled by security groups. \n\n**Common Issues:**\n- **"Access Denied":** The user isn't in the right Team or Group. \n- **"File not found":** The file might have been moved, deleted, or the user is looking in the wrong folder.\n\n**Josh's Boundary:** You can verify if a user is in a Team, but do not change folder-level permissions unless instructed. Escalate to Paul if a specific folder is behaving oddly.`
    },
    {
      id: 'm365-4',
      title: 'Sync vs Shortcut (Important!)',
      bodyMarkdown: `Microsoft is moving toward "Add Shortcut to OneDrive" instead of the old "Sync" button in SharePoint.\n\n**Warning:** If a user has both a "Sync" and a "Shortcut" for the same folder, it can cause major sync conflicts. If they delete a shortcut, the files stay. If they delete files inside a synced folder, the files are deleted for everyone!`
    }
  ],
  interactiveLabs: [
    {
      id: 'lab-onedrive-sync-error',
      title: 'OneDrive Sync Error',
      scenario: 'A staff member says, "My OneDrive has a red X on it, and I\'m worried I\'m going to lose my work."',
      decisionPoints: [
        {
          id: 'd1',
          question: 'What is the FIRST thing you should check?',
          options: [
            { id: 'o1', label: 'Click the blue cloud icon in the taskbar to see the specific error message.', feedback: 'Correct. The error list will tell you if it\'s a full disk, a long filename, or a login issue.', isCorrect: true },
            { id: 'o2', label: 'Reinstall Windows.', feedback: 'Extremely invasive and unnecessary.', isCorrect: false },
            { id: 'o3', label: 'Delete the OneDrive folder and start again.', feedback: 'RISKY. You might delete files that haven\'t synced to the cloud yet.', isCorrect: false }
          ]
        },
        {
          id: 'd2',
          question: 'The error says "File name too long". What is the safest fix?',
          options: [
            { id: 'o1', label: 'Rename the file to something shorter or move it to a shallower folder.', feedback: 'Correct. OneDrive has a character limit for the full file path.', isCorrect: true },
            { id: 'o2', label: 'Tell the user they can\'t use that many folders.', feedback: 'Technically true, but help them fix the specific file first.', isCorrect: false }
          ]
        }
      ],
      dcsApplication: 'At DCS, ensure users are signed into their @dcs.edu.au account in the OneDrive client.',
      retrievalQuestion: 'What does a red X on the OneDrive icon mean?',
      reflectionPrompt: 'How do you reassure a teacher that their files are safe in the cloud even if the sync is paused?'
    }
  ],
  flashcards: [
    { id: 'm365-f1', front: 'Where do Teams files actually live?', back: 'In a SharePoint site.' },
    { id: 'm365-f2', front: 'What is OneDrive for?', back: 'Personal school files and individual work.' },
    { id: 'm365-f3', front: 'What does the Blue Cloud icon mean?', back: 'The file is "Online Only" and not taking up local space.' },
    { id: 'm365-f4', front: 'What does a Red X on OneDrive mean?', back: 'A sync error has occurred.' },
    { id: 'm365-f5', front: 'Why is deleting a synced folder risky?', back: 'It deletes the files from the cloud for everyone in that Team.' },
    { id: 'm365-f6', front: 'What is the first step for a "file not found" in a Team?', back: 'Check the "Files" tab in the Team and verify the user is a member.' },
    { id: 'm365-f7', front: 'What should you check if a user says "Access Denied" to a shared folder?', back: 'Check their group membership in Entra ID or the Team owners list.' },
    { id: 'm365-f8', front: 'Sync vs Shortcut: which one is newer?', back: 'Add Shortcut to OneDrive is the newer, preferred method.' }
  ],
  quiz: [
    {
      type: 'mcq',
      id: 'm365-q1',
      prompt: 'A user wants to free up space on their laptop but still see their OneDrive files. What should you do?',
      domain: 'Cloud Services',
      difficulty: 'foundation',
      explanation: 'Files On-Demand allows seeing files without downloading them.',
      modelAnswer: 'Use the "Free up space" option in OneDrive settings, which turns files into "Online Only" (blue cloud icon).',
      options: [
        { id: 'a', label: 'Delete the files they don\'t need right now.' },
        { id: 'b', label: 'Turn off OneDrive sync.' },
        { id: 'c', label: 'Right-click the OneDrive folder and select "Free up space".' },
        { id: 'd', label: 'Move the files to a USB stick.' }
      ],
      correctOptionId: 'c',
      dcsContext: 'This is a common request for staff with smaller SSDs.',
      reviewSchedule,
      recommendedModuleId: 'm365-teams-sharepoint-onedrive-basics',
      weakTopic: 'cloud-services'
    }
  ]
};
