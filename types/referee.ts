export interface Referee {
  name: string;
  gamesWorked: number;
  penaltiesPerGame?: number;
  avgPenaltyDiff?: number;
  fairnessScore?: {
    score: number;
    grade: string;
  };
} 