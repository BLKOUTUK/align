export const dimensions = [
  {
    id: 'community-voice',
    title: 'Community Voice',
    description: 'How well does this proposal centre the community it claims to serve?',
    icon: '🗣️',
    questions: [
      {
        id: 'cv-1',
        text: 'Was the research question developed with the community it affects?',
        hint: 'Look for evidence of community consultation in the proposal design stage — not just recruitment.',
      },
      {
        id: 'cv-2',
        text: 'Will community members be involved in design, delivery, or analysis?',
        hint: 'Meaningful involvement means decision-making power, not just being a "participant" or "advisor".',
      },
    ],
  },
  {
    id: 'power-ownership',
    title: 'Power & Ownership',
    description: 'Who holds the power, the purse, and the pen?',
    icon: '⚖️',
    questions: [
      {
        id: 'po-1',
        text: 'Who owns the data? Who controls how findings are used?',
        hint: 'Check whether the community retains any rights over data use, publication, or future applications.',
      },
      {
        id: 'po-2',
        text: 'Is funding shared equitably, or does the community just provide access?',
        hint: 'Look at budget breakdowns. Does the community org receive fair compensation or just a token honorarium?',
      },
    ],
  },
  {
    id: 'cultural-sensitivity',
    title: 'Cultural Sensitivity',
    description: 'Does this research understand who it\'s working with?',
    icon: '🌍',
    questions: [
      {
        id: 'cs-1',
        text: 'Does the methodology respect cultural context, rather than transplanting frameworks from other communities?',
        hint: 'Western academic frameworks often pathologise Black experiences. Look for culturally grounded approaches.',
      },
      {
        id: 'cs-2',
        text: 'Are the researchers from, or deeply connected to, the community?',
        hint: 'Lived experience isn\'t the only credential, but disconnection from the community is a red flag.',
      },
    ],
  },
  {
    id: 'benefit-access',
    title: 'Benefit & Access',
    description: 'Will the community actually benefit from this work?',
    icon: '📖',
    questions: [
      {
        id: 'ba-1',
        text: 'Will findings be accessible to participants — not just locked behind journal paywalls?',
        hint: 'Accessible means plain-language summaries, community presentations, or open-access publication.',
      },
      {
        id: 'ba-2',
        text: 'Does the research address a priority identified by the community itself?',
        hint: 'Was this topic chosen because the community asked for it, or because a funder thought it was interesting?',
      },
    ],
  },
  {
    id: 'track-record',
    title: 'Track Record & Accountability',
    description: 'What\'s their history, and what happens if things go wrong?',
    icon: '📋',
    questions: [
      {
        id: 'tr-1',
        text: 'Have the researchers worked with Black communities before? What happened?',
        hint: 'Ask for references. Previous community partners can tell you more than any proposal document.',
      },
      {
        id: 'tr-2',
        text: 'Is there a feedback mechanism if the partnership isn\'t working?',
        hint: 'A clear exit clause and regular check-ins show the researchers take accountability seriously.',
      },
    ],
  },
];

export const answerOptions = [
  { value: 'green', label: 'Yes', score: 2, color: '#22C55E' },
  { value: 'amber', label: 'Partly', score: 1, color: '#F59E0B' },
  { value: 'red', label: 'No', score: 0, color: '#EF4444' },
];

export const totalQuestions = dimensions.reduce(
  (sum, dim) => sum + dim.questions.length,
  0
);
