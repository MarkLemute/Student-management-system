const gradePoints = { A: 4, 'A-': 3.7, 'B+': 3.3, B: 3, 'B-': 2.7, 'C+': 2.3, C: 2, 'C-': 1.7, D: 1, F: 0 };

export function calculateGpa(resultList) {
  const totals = resultList.reduce((total, result) => {
    const credits = Number(result.credits) || 0;
    return { points: total.points + (gradePoints[result.grade] || 0) * credits, credits: total.credits + credits };
  }, { points: 0, credits: 0 });
  return totals.credits ? (totals.points / totals.credits).toFixed(2) : '0.00';
}
