import { dimensions, answerOptions } from './questions';

/**
 * Calculate the score for a single dimension.
 * @param {Object} answers - Map of questionId → 'green' | 'amber' | 'red'
 * @param {Object} dimension - A dimension object from questions.js
 * @returns {{ score: number, rating: string, color: string }}
 */
export function scoreDimension(answers, dimension) {
  const questionScores = dimension.questions.map((q) => {
    const answer = answers[q.id];
    const option = answerOptions.find((o) => o.value === answer);
    return option ? option.score : 0;
  });

  const average =
    questionScores.reduce((sum, s) => sum + s, 0) / questionScores.length;

  return {
    score: average,
    rating: getRating(average),
    color: getRatingColor(average),
  };
}

/**
 * Calculate scores for all dimensions and an overall score.
 * @param {Object} answers - Map of questionId → 'green' | 'amber' | 'red'
 * @returns {{ dimensions: Array, overall: Object }}
 */
export function scoreAll(answers) {
  const dimensionScores = dimensions.map((dim) => ({
    ...dim,
    result: scoreDimension(answers, dim),
  }));

  const overallAverage =
    dimensionScores.reduce((sum, d) => sum + d.result.score, 0) /
    dimensionScores.length;

  return {
    dimensions: dimensionScores,
    overall: {
      score: overallAverage,
      rating: getRating(overallAverage),
      color: getRatingColor(overallAverage),
    },
  };
}

function getRating(score) {
  if (score >= 1.5) return 'green';
  if (score >= 0.5) return 'amber';
  return 'red';
}

function getRatingColor(score) {
  if (score >= 1.5) return '#3F6B4A';
  if (score >= 0.5) return '#D89A2D';
  return '#C8341F';
}

// Accessible foreground on the rating colour — white fails AA on ochre.
export function getRatingText(rating) {
  return rating === 'amber' ? '#2B211C' : '#FFFFFF';
}
