const feedbackTemplates = {
  'community-voice': {
    green:
      'The proposal demonstrates a strong commitment to community voice. There is clear evidence that the research question was shaped in partnership with the community, and that community members will play a meaningful role in design, delivery, or analysis. This is encouraging.',
    amber:
      'There are some positive signs around community involvement, but aspects remain unclear. We would recommend clarifying how the research question was developed, and what specific roles community members will hold beyond participation. Co-design should mean shared decision-making, not consultation after the fact.',
    red:
      'The proposal raises significant concerns about community voice. There is little evidence that the community was involved in shaping the research question, and the role of community members appears limited to being study subjects. Before proceeding, we would need to see genuine co-design processes built into the project from the outset.',
  },
  'power-ownership': {
    green:
      'The proposal handles power and ownership well. Data ownership, intellectual property, and the right to shape how findings are used appear to be shared equitably. Funding arrangements seem fair and transparent.',
    amber:
      'There are some concerns about power dynamics in this proposal. While some equity measures are in place, it is not fully clear who retains ownership of the data or how findings will be controlled. We would recommend a clearer data governance agreement and a transparent budget breakdown showing how resources are distributed.',
    red:
      'The proposal raises serious concerns about power and ownership. The community appears to be positioned primarily as a source of data and access, without equitable control over findings, intellectual property, or funding. This extractive dynamic must be addressed before any partnership can proceed.',
  },
  'cultural-sensitivity': {
    green:
      'The methodology demonstrates strong cultural sensitivity. The research approach appears to be grounded in an understanding of the community\'s context, and the research team includes people with meaningful connection to the community.',
    amber:
      'There are some cultural sensitivity considerations that need attention. While the proposal shows awareness of cultural context, the methodology may benefit from further adaptation to ensure it does not inadvertently centre frameworks developed for other communities. We would also recommend reviewing the diversity and community connection of the research team.',
    red:
      'The proposal raises significant concerns about cultural sensitivity. The methodology appears to transplant frameworks from other contexts without adequate adaptation, and the research team lacks meaningful connection to the community. Research on Black communities must be designed with, not just about, those communities.',
  },
  'benefit-access': {
    green:
      'The proposal demonstrates a clear commitment to making findings accessible and beneficial to the community. Plans are in place for plain-language dissemination, and the research addresses priorities the community itself has identified.',
    amber:
      'While there are some plans for sharing findings, it is unclear whether the community will have full access to results in an accessible format. We would recommend ensuring that findings are not locked behind academic paywalls, and that the research topic directly addresses a community-identified priority rather than a funder-driven agenda.',
    red:
      'The proposal does not adequately address how the community will benefit from this research. Findings appear likely to remain in academic publications inaccessible to participants, and the research topic does not appear to have been identified by the community. We would need to see concrete plans for community benefit before proceeding.',
  },
  'track-record': {
    green:
      'The researchers have a positive track record of working with Black communities, and the proposal includes clear accountability mechanisms such as regular check-ins and a defined process for addressing concerns. This provides confidence in the partnership.',
    amber:
      'The researchers\' track record with Black communities is unclear or limited. While some accountability measures are mentioned, we would recommend asking for references from previous community partners, and strengthening the feedback and exit mechanisms to ensure the community retains agency throughout.',
    red:
      'There is no evidence of a positive track record with Black communities, and the proposal lacks meaningful accountability mechanisms. Before any partnership can proceed, we would need references from previous community collaborators and a clear, agreed process for raising concerns or ending the partnership if it is not working.',
  },
};

/**
 * Generate the full feedback letter based on scored dimensions.
 * @param {{ dimensions: Array, overall: Object }} scores - Output from scoreAll()
 * @returns {string} A professional feedback letter
 */
export function generateFeedback(scores) {
  const overallLabel = {
    green: 'broadly positive',
    amber: 'mixed, with areas needing attention',
    red: 'concerning, with significant issues to address',
  };

  const lines = [];

  lines.push('Dear Researcher,');
  lines.push('');
  lines.push(
    'Thank you for reaching out to partner with us on your research. We have reviewed your proposal using the Assess & Align framework, which evaluates research partnerships across five key dimensions of equity and community benefit.'
  );
  lines.push('');
  lines.push(
    `Our overall assessment is ${overallLabel[scores.overall.rating]}. Below is our feedback on each dimension.`
  );

  for (const dim of scores.dimensions) {
    lines.push('');
    lines.push(`--- ${dim.title} ---`);
    lines.push('');
    lines.push(feedbackTemplates[dim.id][dim.result.rating]);
  }

  lines.push('');
  lines.push('---');
  lines.push('');

  if (scores.overall.rating === 'green') {
    lines.push(
      'Overall, this proposal demonstrates a strong foundation for an equitable partnership. We look forward to discussing next steps.'
    );
  } else if (scores.overall.rating === 'amber') {
    lines.push(
      'We believe there is potential for a productive partnership, but the concerns raised above would need to be addressed before we can commit. We are open to further conversation about how the proposal could be strengthened.'
    );
  } else {
    lines.push(
      'At this stage, we are unable to support this research partnership. The concerns raised above are significant and would need to be fundamentally addressed. We encourage you to revisit the proposal with genuine community partnership at its centre, and we are happy to point you towards resources on equitable research practices.'
    );
  }

  lines.push('');
  lines.push('This feedback was generated using Assess & Align, a tool developed by the Black Men\'s Health & Wellbeing Alliance to support equitable research partnerships.');
  lines.push('');
  lines.push('Kind regards');

  return lines.join('\n');
}
