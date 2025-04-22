import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/slugify";
import RefereeRadar from "@/components/RefereeRadar";
import referees from "../../../data/referees.json";


const formatPercent = (val: string | number) =>
  `${parseFloat(String(val)).toFixed(2)}%`;
const averages = calculateAverages(referees);


type PageProps = {
  params: Promise<{
    referee: string;
  }>;
};

function calculateAverages(data: typeof referees) {
  const totals = {
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

  data.forEach((ref) => {
    totals.goalsPerGame += ref.goalsPerGame;
    totals.ppOpportunities += ref.ppOpportunities;
    totals.minorsPerGame += ref.minorsPerGame;
    totals.penaltiesPerGame += ref.penaltiesPerGame;
    totals.pimPerGame += ref.pimPerGame;
    totals.penaltyHomePercentage += parseFloat(ref.penaltyHomePercentage);
    totals.avgPenaltyDiff += ref.avgPenaltyDiff;
    totals.homeWinPercentage += parseFloat(ref.homeWinPercentage);
    totals.gamesToOT += parseFloat(ref.gamesToOT);
  });

  const divisor = data.length;
  return {
    goalsPerGame: +(totals.goalsPerGame / divisor).toFixed(2),
    ppOpportunities: +(totals.ppOpportunities / divisor).toFixed(2),
    minorsPerGame: +(totals.minorsPerGame / divisor).toFixed(2),
    penaltiesPerGame: +(totals.penaltiesPerGame / divisor).toFixed(2),
    pimPerGame: +(totals.pimPerGame / divisor).toFixed(2),
    penaltyHomePercentage: +(totals.penaltyHomePercentage / divisor).toFixed(2),
    avgPenaltyDiff: +(totals.avgPenaltyDiff / divisor).toFixed(2),
    homeWinPercentage: +(totals.homeWinPercentage / divisor).toFixed(2),
    gamesToOT: +(totals.gamesToOT / divisor).toFixed(2),
  };
}

function calculateRank(
  data: typeof referees,
  stat: keyof typeof averages,
  refValue: number
) {
  const sorted = [...data].sort((a, b) => {
    const aVal = typeof a[stat] === "string" ? parseFloat(a[stat]) : a[stat];
    const bVal = typeof b[stat] === "string" ? parseFloat(b[stat]) : b[stat];
    return bVal - aVal;
  });

  const rank = sorted.findIndex((ref) => {
    const val =
      typeof ref[stat] === "string" ? parseFloat(ref[stat]) : ref[stat];
    return val === refValue;
  });

  return rank + 1;
}

export async function generateStaticParams() {
  return referees.map((ref) => ({ referee: slugify(ref.name) }));
}


export default async function RefereePage({ params }: PageProps) {
  const { referee } = await params;
  const refereeSlug = referee;
  const refData = referees.find((ref) => slugify(ref.name) === refereeSlug);
  if (!refData) return notFound();
  const [lastName, firstName] = refData.name.split(",").map((s) => s.trim());

  const photoPath = path.join(
    process.cwd(),
    "public/ref-photos",
    `${refereeSlug}.jpg`
  );
  const hasPhoto = fs.existsSync(photoPath);
  const photoUrl = hasPhoto
    ? `/ref-photos/${refereeSlug}.jpg`
    : `/ref-photos/fallback.jpg`;

  const statsToShow: {
    label: string;
    key: keyof typeof averages;
    context: string;
    isPercent?: boolean;
  }[] = [
    { 
      label: "Goals per Game",
      key: "goalsPerGame",
      context: "The average number of total goals scored in games officiated by this referee. Rank #1 means this ref's games are the highest scoring in the NHL."
    },
    { 
      label: "Power Play Opportunities",
      key: "ppOpportunities",
      context: "The average number of power plays awarded per game by this referee. Rank #1 indicates this official calls the most power play chances in the league."
    },
    { 
      label: "Minors per Game",
      key: "minorsPerGame",
      context: "The average number of minor penalties assessed per game. Rank #1 means this ref calls more minors per game than any other NHL official."
    },
    { 
      label: "Penalties per Game",
      key: "penaltiesPerGame",
      context: "The total number of penalties assessed per game, including minors, majors, and misconducts. Rank #1 means this ref calls the most penalties overall."
    },
    { 
      label: "PIM per Game",
      key: "pimPerGame",
      context: "Penalty minutes assessed per game. Since penalties vary in length (2, 5, or 10 minutes), this stat gives a weighted view of how strict the ref is. Rank #1 means the highest total PIM per game."
    },
    { 
      label: "Penalty Home %",
      key: "penaltyHomePercentage",
      context: "The percentage of total penalties assessed against the home team. Rank #1 means home teams receive the most penalties under this official. This stat may suggest bias but isn't definitive.",
      isPercent: true
    },
    { 
      label: "Avg Penalty Diff",
      key: "avgPenaltyDiff",
      context: "The average absolute difference in penalties between the two teams in a game. Rank #1 indicates the largest discrepancy in calls between teams — the higher the number, the less even the officiating."
    },
    { 
      label: "Home Win %",
      key: "homeWinPercentage",
      context: "The percentage of games in which the home team wins when officiated by this referee. Rank #1 means home teams win most often under this official.",
      isPercent: true
    },
    { 
      label: "Games to OT %",
      key: "gamesToOT",
      context: "The percentage of games that go to overtime with this referee. Rank #1 indicates this ref has the highest rate of games going beyond regulation.",
      isPercent: true
    },
  ];

  return (
    <div className="w-[calc(100%-40px)] max-w-[1520px] mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-12">
        <div className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <div className="relative w-24 sm:w-32 md:w-40 aspect-square">
              {/* Animated Gradient Border */}
              <div className="absolute inset-0 p-2 bg-gradient-to-r from-primary from-70% via-primary-foreground via-78% to-primary to-86% rounded-full animate-border-flash z-0">
                {/* Inner circle to hold the image */}
                <div className="w-full h-full rounded-full bg-transparent overflow-hidden z-10">
                  <Image
                    src={photoUrl}
                    alt={refData.name}
                    fill
                    className="rounded-full object-cover p-[2px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <div className="flex items-top text-xl font-medium text-card-foreground/80">
                  <span className="text-xs">#</span>
                  {refData.refNumber}
                </div>
              </div>
              <h1>
                <span className="text-lg leading-none font-light text-secondary-foreground">
                  {firstName}
                </span>
                <br />
                <span className="text-3xl leading-6 font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent-foreground via-ring to-accent-foreground">
                  {lastName}
                </span>
              </h1>
              <p className="text-md leading-4 text-muted-foreground">{refData.totalGames} Games</p>
            </div>
          </div>

          {refData.fairnessGrade && (
            <div className="text-primary mx-auto">
              <div className="relative inline-flex flex-col group">
                <div className="flex items-center gap-4 px-2">
                  <h3 className="text-secondary-foreground text-2xl font-semibold">Fairness Grade:</h3>
                  <p 
                    className="text-[48px] font-bold"
                    style={{
                      color: `hsl(${Math.max(0, Math.min(120, refData.fairnessScore * 1.2))}, 70%, 50%)`
                    }}
                  >
                    {refData.fairnessGrade}
                  </p>
                </div>
                <div 
                  className="h-0.5 bg-muted rounded-full overflow-hidden"
                  style={{ width: '100%' }}
                >
                  <div 
                    className="h-full rounded-full"
                    style={{
                      width: `${refData.fairnessScore}%`,
                      backgroundColor: `hsl(${Math.max(0, Math.min(120, refData.fairnessScore * 1.2))}, 70%, 50%)`
                    }}
                  />
                </div>
                <div className="absolute -bottom-8 right-0 sm:-bottom-3 sm:-right-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="bg-card border rounded px-2 py-1 shadow-sm">
                    <p className="text-xs text-card-foreground">
                      {refData.fairnessScore} / 100
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2">
                *Based on deviation from league averages*
              </p>
            </div>
          )}
        </div>

        <div className="w-full md:w-3/5 text-primary">
          <RefereeRadar referee={refData} />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Stat Breakdown</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statsToShow.map(({ label, key, context, isPercent }) => {
            const refVal =
              typeof refData[key] === "string"
                ? parseFloat(refData[key])
                : refData[key];
            const leagueAvg = averages[key];
            const rank = calculateRank(referees, key, refVal);

            return (
              <div
                key={key}
                className="p-4 border rounded-xl bg-card shadow-sm hover:shadow-md hover:scale-[1.02] transition duration-150"
              >
                <h3 className="font-semibold text-card-foreground mb-1">
                  {label}
                </h3>
                <p className="flex justify-between w-full text-sm text-muted-foreground font-normal">
                  Individual:{" "}
                  <span className="text-foreground font-semibold">
                    {isPercent ? formatPercent(refVal) : refVal}
                  </span>
                </p>
                <p className="flex justify-between w-full text-sm text-muted-foreground font-normal">
                  League Avg:{" "}
                  <span className="font-semibold text-foreground">
                    {isPercent ? formatPercent(leagueAvg) : leagueAvg}
                  </span>
                </p>
                <p className="flex justify-between w-full text-sm text-muted-foreground">
                  Rank:
                  <span><span className="font-semibold text-foreground"> #{rank}</span> /{referees.length}</span>
                </p>
                <p className="flex flex-col py-2 w-full text-sm text-muted-foreground font-normal">
                  Context:
                  <span className="text-foreground text-xs">{context}</span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

