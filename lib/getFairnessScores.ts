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

export type Referee = Record<RefereeStatKey, number | string> & {
    name: string;
};

export type FairnessScore = {
  name: string;
  score: number; // 0–100, higher = more fair
  zScores: Record<RefereeStatKey, number>;
  grade: string;
};

function parsePercent(val: string | number): number {
  return typeof val === "string" ? parseFloat(val.replace("%", "")) : val;
}

function calculateMean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function calculateStdDev(values: number[], mean: number): number {
  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

export function getFairnessScores(referees: Referee[]): FairnessScore[] {
  const keys: RefereeStatKey[] = [
    "goalsPerGame",
    "ppOpportunities",
    "minorsPerGame",
    "penaltiesPerGame",
    "pimPerGame",
    "penaltyHomePercentage",
    "avgPenaltyDiff",
    "homeWinPercentage",
    "gamesToOT"
  ];

  // Add weights for each stat - higher weight means more important
  const statWeights: Record<RefereeStatKey, number> = {
    goalsPerGame: 1.0,        // Basic game flow stat
    ppOpportunities: 1.2,     // Direct impact on game outcomes
    penaltiesPerGame: 1.5,    // Direct measure of officiating style
    avgPenaltyDiff: 2.0,      // Key fairness indicator
    homeWinPercentage: 1.8,   // Potential bias indicator
    gamesToOT: 0.8,           // Less directly related to fairness
    minorsPerGame: 1.3,       // Common penalty type
    pimPerGame: 1.4,          // Overall penalty severity
    penaltyHomePercentage: 1.7, // Home/away bias indicator
  };

  const statArrays: Record<RefereeStatKey, number[]> = {
    goalsPerGame: [],
    ppOpportunities: [],
    minorsPerGame: [],
    penaltiesPerGame: [],
    pimPerGame: [],
    penaltyHomePercentage: [],
    avgPenaltyDiff: [],
    homeWinPercentage: [],
    gamesToOT: [],
  };

  referees.forEach((ref) => {
    keys.forEach((key) => {
      statArrays[key].push(parsePercent(ref[key]));
    });
  });

  const statMeans: Partial<Record<RefereeStatKey, number>> = {};
  const statStdDevs: Partial<Record<RefereeStatKey, number>> = {};

  keys.forEach((key) => {
    const mean = calculateMean(statArrays[key]);
    const std = calculateStdDev(statArrays[key], mean);
    statMeans[key] = mean;
    statStdDevs[key] = std;
  });

  const scores: FairnessScore[] = referees.map((ref) => {
    const zScores: Record<RefereeStatKey, number> = {
      goalsPerGame: 0,
      ppOpportunities: 0,
      minorsPerGame: 0,
      penaltiesPerGame: 0,
      pimPerGame: 0,
      penaltyHomePercentage: 0,
      avgPenaltyDiff: 0,
      homeWinPercentage: 0,
      gamesToOT: 0,
    };
    let totalZ = 0;
    let totalWeight = 0;

    keys.forEach((key) => {
      const val = parsePercent(ref[key]);
      const z = statStdDevs[key]! === 0 ? 0 : (val - statMeans[key]!) / statStdDevs[key]!;
      const absZ = Math.abs(z);
      zScores[key] = absZ;
      totalZ += absZ * statWeights[key];
      totalWeight += statWeights[key];
    });

    const weightedAvgZ = totalZ / totalWeight;
    const fairnessScore = Math.max(0, Math.min(100, 100 - weightedAvgZ * 20));

    return {
      name: ref.name,
      score: parseFloat(fairnessScore.toFixed(2)),
      zScores,
      grade: "", // will assign below
    };
  });

  // Score-based grading instead of percentile-based
  scores.forEach((s) => {
    if (s.score >= 90) s.grade = "A";
    else if (s.score >= 80) s.grade = "B";
    else if (s.score >= 70) s.grade = "C";
    else if (s.score >= 60) s.grade = "D";
    else s.grade = "F";
  });

  return scores;
}
