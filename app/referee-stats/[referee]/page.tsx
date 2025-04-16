import fs from "fs";
import path from "path";
import Image from "next/image";
import { notFound } from "next/navigation";
import { slugify } from "@/lib/slugify";
import RefereeRadar from "@/components/RefereeRadar";
import referees from "../../../data/referees.json";

const formatPercent = (val: string | number) => `${parseFloat(String(val)).toFixed(2)}%`;
const averages = calculateAverages(referees);

type PageProps = {
    params: {
        referee: string;
    };
};

function calculateAverages(data: typeof referees) {
  const totals = {
    goalsPerGame: 0,
    ppOpportunities: 0,
    minutesPerGame: 0,
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
    totals.minutesPerGame += ref.minutesPerGame;
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
    minutesPerGame: +(totals.minutesPerGame / divisor).toFixed(2),
    penaltiesPerGame: +(totals.penaltiesPerGame / divisor).toFixed(2),
    pimPerGame: +(totals.pimPerGame / divisor).toFixed(2),
    penaltyHomePercentage: +(totals.penaltyHomePercentage / divisor).toFixed(2),
    avgPenaltyDiff: +(totals.avgPenaltyDiff / divisor).toFixed(2),
    homeWinPercentage: +(totals.homeWinPercentage / divisor).toFixed(2),
    gamesToOT: +(totals.gamesToOT / divisor).toFixed(2),
  };
}

function calculateRank(data: typeof referees, stat: keyof typeof averages, refValue: number) {
  const sorted = [...data].sort((a, b) => {
    const aVal = typeof a[stat] === "string" ? parseFloat(a[stat]) : a[stat];
    const bVal = typeof b[stat] === "string" ? parseFloat(b[stat]) : b[stat];
    return bVal - aVal;
  });

  const rank = sorted.findIndex((ref) => {
    const val = typeof ref[stat] === "string" ? parseFloat(ref[stat]) : ref[stat];
    return val === refValue;
  });

  return rank + 1;
}

export async function generateStaticParams() {
    return referees.map((ref) => ({ referee: slugify(ref.name) }));
}


export default async function RefereePage({ params }: PageProps) {
    const refereeSlug = params.referee;
    const refData = referees.find(ref => slugify(ref.name) === refereeSlug);
    if (!refData) return notFound();

    const photoPath = path.join(process.cwd(), "public/ref-photos", `${refereeSlug}.jpg`);
    const hasPhoto = fs.existsSync(photoPath);
    const photoUrl = hasPhoto ? `/ref-photos/${refereeSlug}.jpg` : `/ref-photos/fallback.jpg`;

    const statsToShow: { label: string; key: keyof typeof averages; isPercent?: boolean }[] = [
        { label: "Goals per Game", key: "goalsPerGame" },
        { label: "Power Play Opportunities", key: "ppOpportunities" },
        { label: "Minutes per Game", key: "minutesPerGame" },
        { label: "Penalties per Game", key: "penaltiesPerGame" },
        { label: "PIM per Game", key: "pimPerGame" },
        { label: "Penalty Home %", key: "penaltyHomePercentage", isPercent: true },
        { label: "Avg Penalty Diff", key: "avgPenaltyDiff" },
        { label: "Home Win %", key: "homeWinPercentage", isPercent: true },
        { label: "Games to OT %", key: "gamesToOT", isPercent: true },
    ];

    return (
        <div className="w-[calc(100%-40px)] max-w-[1520px] mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
            <div className="w-24 sm:w-32 md:w-40 aspect-square relative">
                <Image
                src={photoUrl}
                alt={refData.name}
                fill
                className="rounded-full object-cover"
                />
            </div>
            <div>
                <h1 className="text-2xl font-bold">{refData.name}</h1>
                <p>Referee #{refData.refNumber}</p>
            </div>
            </div>

            <div className="w-full md:w-3/5 text-primary">
            <RefereeRadar referee={refData} />
            </div>
        </div>

        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Stat Comparison</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statsToShow.map(({ label, key, isPercent }) => {
                const refVal = typeof refData[key] === "string" ? parseFloat(refData[key]) : refData[key];
                const leagueAvg = averages[key];
                const rank = calculateRank(referees, key, refVal);

                return (
                <div
                    key={key}
                    className="p-4 border rounded-xl bg-card shadow-sm hover:shadow-md transition duration-150"
                >
                    <h3 className="font-semibold text-card-foreground mb-1">{label}</h3>
                    <p className="text-sm text-muted-foreground">
                    Ref's Stat:{" "}
                    <span className="text-foreground font-medium">
                        {isPercent ? formatPercent(refVal) : refVal}
                    </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                    League Avg:{" "}
                    <span className="font-medium">
                        {isPercent ? formatPercent(leagueAvg) : leagueAvg}
                    </span>
                    </p>
                    <p className="text-sm text-muted-foreground">
                    Rank:{" "}
                    <span className="font-medium">
                        #{rank}
                    </span>{" "}
                    out of {referees.length}
                    </p>
                </div>
                );
            })}
            </div>
        </div>
        </div>
    );
}
