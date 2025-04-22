export type RefereeStatKey =
  | "goalsPerGame"
  | "ppOpportunities"
  | "minorsPerGame"
  | "penaltiesPerGame"
  | "pimPerGame"
  | "penaltyHomePercentage"
  | "avgPenaltyDiff"
  | "homeWinPercentage"
  | "gamesToOT";

export type Referee = {
  name: string;
  refNumber: number;
  totalGames: number;
  goalsPerGame: number;
  ppOpportunities: number;
  minorsPerGame: number;
  penaltiesPerGame: number;
  pimPerGame: number;
  penaltyHomePercentage: string;
  avgPenaltyDiff: number;
  homeWinPercentage: string;
  gamesToOT: string;
};

type FairnessScore = {
  name: string;
  score: number;
  grade: string;
};

function parsePercent(value: string | number): number {
  if (typeof value === 'string') {
    // Remove any non-numeric characters except decimal point
    const cleanVal = value.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleanVal);
    return isNaN(parsed) ? 0 : parsed;
  }
  return value;
}


function calculateFairnessScores(referees: Referee[]): FairnessScore[] {
  // First calculate league averages
  const leagueAverages = {
    goalsPerGame: referees.reduce((sum, ref) => sum + ref.goalsPerGame, 0) / referees.length,
    ppOpportunities: referees.reduce((sum, ref) => sum + ref.ppOpportunities, 0) / referees.length,
    minorsPerGame: referees.reduce((sum, ref) => sum + ref.minorsPerGame, 0) / referees.length,
    penaltiesPerGame: referees.reduce((sum, ref) => sum + ref.penaltiesPerGame, 0) / referees.length,
    pimPerGame: referees.reduce((sum, ref) => sum + ref.pimPerGame, 0) / referees.length,
    penaltyHomePercentage: referees.reduce((sum, ref) => sum + parsePercent(ref.penaltyHomePercentage), 0) / referees.length,
    avgPenaltyDiff: referees.reduce((sum, ref) => sum + ref.avgPenaltyDiff, 0) / referees.length,
    homeWinPercentage: referees.reduce((sum, ref) => sum + parsePercent(ref.homeWinPercentage), 0) / referees.length,
    gamesToOT: referees.reduce((sum, ref) => sum + parsePercent(ref.gamesToOT), 0) / referees.length,
  };

  // Calculate standard deviations for each stat
  const standardDeviations = {
    goalsPerGame: Math.sqrt(referees.reduce((sum, ref) => sum + Math.pow(ref.goalsPerGame - leagueAverages.goalsPerGame, 2), 0) / referees.length),
    ppOpportunities: Math.sqrt(referees.reduce((sum, ref) => sum + Math.pow(ref.ppOpportunities - leagueAverages.ppOpportunities, 2), 0) / referees.length),
    minorsPerGame: Math.sqrt(referees.reduce((sum, ref) => sum + Math.pow(ref.minorsPerGame - leagueAverages.minorsPerGame, 2), 0) / referees.length),
    penaltiesPerGame: Math.sqrt(referees.reduce((sum, ref) => sum + Math.pow(ref.penaltiesPerGame - leagueAverages.penaltiesPerGame, 2), 0) / referees.length),
    pimPerGame: Math.sqrt(referees.reduce((sum, ref) => sum + Math.pow(ref.pimPerGame - leagueAverages.pimPerGame, 2), 0) / referees.length),
    penaltyHomePercentage: Math.sqrt(referees.reduce((sum, ref) => sum + Math.pow(parsePercent(ref.penaltyHomePercentage) - leagueAverages.penaltyHomePercentage, 2), 0) / referees.length),
    avgPenaltyDiff: Math.sqrt(referees.reduce((sum, ref) => sum + Math.pow(ref.avgPenaltyDiff - leagueAverages.avgPenaltyDiff, 2), 0) / referees.length),
    homeWinPercentage: Math.sqrt(referees.reduce((sum, ref) => sum + Math.pow(parsePercent(ref.homeWinPercentage) - leagueAverages.homeWinPercentage, 2), 0) / referees.length),
    gamesToOT: Math.sqrt(referees.reduce((sum, ref) => sum + Math.pow(parsePercent(ref.gamesToOT) - leagueAverages.gamesToOT, 2), 0) / referees.length),
  };

  // Weights for each stat
  const weights = {
    goalsPerGame: 0.1,
    ppOpportunities: 0.1,
    minorsPerGame: 0.1,
    penaltiesPerGame: 0.1,
    pimPerGame: 0.1,
    penaltyHomePercentage: 0.15,
    avgPenaltyDiff: 0.15,
    homeWinPercentage: 0.1,
    gamesToOT: 0.1,
  };

  return referees.map(referee => {
    let totalScore = 0;
    let totalWeight = 0;

    // Calculate score for each stat
    for (const [stat, weight] of Object.entries(weights)) {
      const refValue = stat.includes('Percentage') || stat === 'gamesToOT' 
        ? parsePercent(referee[stat as keyof Referee])
        : referee[stat as keyof Referee] as number;
      
      const avg = leagueAverages[stat as keyof typeof leagueAverages];
      const stdDev = standardDeviations[stat as keyof typeof standardDeviations];
      
      // Calculate z-score (how many standard deviations from the mean)
      const zScore = Math.abs((refValue - avg) / stdDev);
      
      // Convert z-score to a score (0-100)
      // 0 standard deviations = 100
      // 0.25 standard deviations = 90
      // 0.5 standard deviations = 80
      // 0.75 standard deviations = 70
      // 1.0 standard deviations = 60
      // 1.25 standard deviations = 50
      // 1.5+ standard deviations = 40
      let statScore = 100;
      if (zScore >= 1.5) statScore = 40;
      else if (zScore >= 1.25) statScore = 50;
      else if (zScore >= 1.0) statScore = 60;
      else if (zScore >= 0.75) statScore = 70;
      else if (zScore >= 0.5) statScore = 80;
      else if (zScore >= 0.25) statScore = 90;
      
      totalScore += statScore * weight;
      totalWeight += weight;
    }

    const finalScore = Math.round(totalScore / totalWeight);

    // Calculate grade based on numerical score
    const grade = finalScore >= 90 ? 'A' :
                 finalScore >= 80 ? 'B' :
                 finalScore >= 70 ? 'C' :
                 finalScore >= 60 ? 'D' : 'F';

    return {
      name: referee.name,
      score: finalScore,
      grade,
    };
  });
}

export { calculateFairnessScores };
export type { FairnessScore }; 