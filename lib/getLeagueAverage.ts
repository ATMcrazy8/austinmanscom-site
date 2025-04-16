import referees from "@/data/referees.json";

function round(value: number, decimals = 2): number {
  return parseFloat(value.toFixed(decimals));
}

export function getLeagueAverage() {
  const validRefs = referees.filter(
    (ref) => ref.name !== "Unknown" && ref.name !== "NHL Average"
  );
  const totalRefs = validRefs.length;

  const sum = validRefs.reduce(
    (acc, ref) => {
      acc.goalsPerGame += ref.goalsPerGame;
      acc.ppOpportunities += ref.ppOpportunities;
      acc.penaltiesPerGame += ref.penaltiesPerGame;
      acc.avgPenaltyDiff += ref.avgPenaltyDiff;
      acc.homeWinPercentage += parseFloat(
        ref.homeWinPercentage.replace("%", "")
      );
      acc.gamesToOT += parseFloat(ref.gamesToOT.replace("%", ""));
      return acc;
    },
    {
      goalsPerGame: 0,
      ppOpportunities: 0,
      penaltiesPerGame: 0,
      avgPenaltyDiff: 0,
      homeWinPercentage: 0,
      gamesToOT: 0,
    }
  );

  return {
    goalsPerGame: round(sum.goalsPerGame / totalRefs),
    ppOpportunities: round(sum.ppOpportunities / totalRefs),
    penaltiesPerGame: round(sum.penaltiesPerGame / totalRefs),
    avgPenaltyDiff: round(sum.avgPenaltyDiff / totalRefs),
    homeWinPercentage: `${round(sum.homeWinPercentage / totalRefs)}%`,
    gamesToOT: `${round(sum.gamesToOT / totalRefs)}%`,
  };
}
