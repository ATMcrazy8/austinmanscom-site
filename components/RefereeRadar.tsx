"use client";

import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "@/app/context/ThemeProvider";
import { getLeagueAverage } from "@/lib/getLeagueAverage";

type RadarStat = {
  stat: string;
  refValue: number;
  leagueAvg: number;
};

type Referee = {
  goalsPerGame: number;
  ppOpportunities: number;
  penaltiesPerGame: number;
  avgPenaltyDiff: number;
  homeWinPercentage: string;
  gamesToOT: string;
};

type StatLabel =
  | "Goals/Game"
  | "PP Opp/Game"
  | "Penalties/Game"
  | "Penalty Diff"
  | "Home Win %"
  | "OT %";

type StatKey = keyof Referee;

const statKeyMap: Record<StatLabel, StatKey> = {
  "Goals/Game": "goalsPerGame",
  "PP Opp/Game": "ppOpportunities",
  "Penalties/Game": "penaltiesPerGame",
  "Penalty Diff": "avgPenaltyDiff",
  "Home Win %": "homeWinPercentage",
  "OT %": "gamesToOT",
};

const maxRange: Record<keyof Referee, number> = {
  goalsPerGame: 10,
  ppOpportunities: 5,
  penaltiesPerGame: 6,
  avgPenaltyDiff: 2.5,
  homeWinPercentage: 100,
  gamesToOT: 50,
};

const parsePercent = (val: string) => parseFloat(val.replace("%", ""));

export default function RefereeRadar({ referee }: { referee: Referee }) {
  const { theme } = useTheme();
  const [colors, setColors] = useState({ primary: "", monotoneForeground: "", mutedForeground: "" });

  useEffect(() => {
    const updateColors = () => {
      const styles = getComputedStyle(document.documentElement);
      setColors({
        primary: styles.getPropertyValue("--primary").trim(),
        monotoneForeground: styles.getPropertyValue("--monotone-foreground").trim(),
        mutedForeground: styles.getPropertyValue("--muted-foreground").trim(),
      });
    };

    requestAnimationFrame(updateColors);

    const observer = new MutationObserver(() => {
      requestAnimationFrame(updateColors);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, [theme]);

  const leagueAverage = getLeagueAverage();
  const data: RadarStat[] = [
    {
      stat: "Goals/Game",
      refValue: (referee.goalsPerGame / 8) * 100,
      leagueAvg: (leagueAverage.goalsPerGame / 8) * 100,
    },
    {
      stat: "PP Opp/Game",
      refValue: (referee.ppOpportunities / 4) * 100,
      leagueAvg: (leagueAverage.ppOpportunities / 4) * 100,
    },
    {
      stat: "Penalties/Game",
      refValue: (referee.penaltiesPerGame / 4.8) * 100,
      leagueAvg: (leagueAverage.penaltiesPerGame / 4.8) * 100,
    },
    {
      stat: "Penalty Diff",
      refValue: (referee.avgPenaltyDiff / 2) * 100,
      leagueAvg: (leagueAverage.avgPenaltyDiff / 2) * 100,
    },
    {
      stat: "Home Win %",
      refValue: parsePercent(referee.homeWinPercentage) / 80 * 100,
      leagueAvg: parsePercent(leagueAverage.homeWinPercentage) / 80 * 100,
    },
    {
      stat: "OT %",
      refValue: parsePercent(referee.gamesToOT) / 40 * 100,
      leagueAvg: parsePercent(leagueAverage.gamesToOT) / 40 * 100,
    },
  ];

  return (
    <div className="w-full max-w-[700px] max-h-[420px] aspect-[5/3] text-[10px]">
      <ResponsiveContainer>
        <RadarChart outerRadius="80%" data={data}>
          <Tooltip
            content={({ payload }) => {
              if (!payload || !payload.length) return null;

              const statName = payload[0].payload.stat as StatLabel;
              const statKey = statKeyMap[statName];
              const rawValue = referee[statKey];
              const leagueValue =
                statKey === "homeWinPercentage" || statKey === "gamesToOT"
                  ? parsePercent(leagueAverage[statKey])
                  : leagueAverage[statKey];
              const max = maxRange[statKey];

              return (
                <div className="bg-card border border-accent rounded-md p-2 text-xs">
                  <p className="font-semibold text-card-foreground">{statName}</p>
                  <p className="text-secondary-foreground">Individual: {rawValue}</p>
                  <p className="text-secondary-foreground">
                    League: {leagueValue}
                  </p>
                  <p className="text-secondary-foreground">
                    Graph Display: 0 - {max}
                  </p>
                </div>
              );
            }}
          />
          <PolarGrid stroke={`hsl(${colors.mutedForeground})`} strokeOpacity={0.3}/>
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis
            angle={30}
            tick={false}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          <Radar
            name="League Avg"
            dataKey="leagueAvg"
            stroke={`hsl(${colors.monotoneForeground})`}
            fill={`hsl(${colors.monotoneForeground})`}
            strokeOpacity={0.6}
            fillOpacity={0.1}
          />
          <Radar
            name="Ref"
            dataKey="refValue"
            stroke={`hsl(${colors.primary})`}
            fill={`hsl(${colors.primary})`}
            fillOpacity={0.15}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
