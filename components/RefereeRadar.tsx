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
  name: string;
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

  type StatKey =
  | "goalsPerGame"
  | "ppOpportunities"
  | "penaltiesPerGame"
  | "avgPenaltyDiff"
  | "homeWinPercentage"
  | "gamesToOT";

const statKeyMap: Record<StatLabel, StatKey> = {
  "Goals/Game": "goalsPerGame",
  "PP Opp/Game": "ppOpportunities",
  "Penalties/Game": "penaltiesPerGame",
  "Penalty Diff": "avgPenaltyDiff",
  "Home Win %": "homeWinPercentage",
  "OT %": "gamesToOT",
};

const maxRange: Record<StatKey, number> = {
  goalsPerGame: 8,
  ppOpportunities: 4,
  penaltiesPerGame: 4.8,
  avgPenaltyDiff: 2,
  homeWinPercentage: 80,
  gamesToOT: 35,
};



const parsePercent = (val: string) => parseFloat(val.replace("%", ""));

export default function RefereeRadar({ referee }: { referee: Referee }) {
  const { theme } = useTheme();
  const [colors, setColors] = useState({ primary: "", monotoneForeground: "", mutedForeground: "" });
  const [renderKey, setRenderKey] = useState(0);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Small delay triggers remount
    const timer = setTimeout(() => setShouldRender(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setRenderKey(prev => prev + 1);
  }, []);

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
      refValue: parsePercent(referee.gamesToOT) / 35 * 100,
      leagueAvg: parsePercent(leagueAverage.gamesToOT) / 35 * 100,
    },
  ];

  return (
    <div className="w-full max-w-[700px] max-h-[420px] aspect-[5/3] text-[10px]">
      {shouldRender && (
        <ResponsiveContainer>
          <RadarChart key={renderKey} outerRadius="80%" data={data}>
            <Tooltip
              content={({ payload }) => {
                if (!payload || !payload.length) return null;

                const statName = payload[0].payload.stat as StatLabel;
                const statKey = statKeyMap[statName];
                const rawValue = referee[statKey];
                const leagueValue = leagueAverage[statKey];

                return (
                  <div className="bg-card border border-accent rounded-lg overflow-hidden min-w-36">
                    <div className="px-2 py-1 w-full border-b-[1px] border-accent">
                      <p className="font-semibold text-card-foreground text-sm">
                        {statName}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 p-2 w-full bg-monotone text-xs font-thin">
                      <p className="flex items-center justify-between w-full gap-2 text-card-foreground">
                        <span className="text-primary font-medium text-sm">{rawValue}</span>
                        Referee
                      </p>
                      <p className="flex items-center justify-between w-full gap-2 text-card-foreground">
                        <span className="text-monotone-foreground font-medium text-sm">{typeof leagueValue === "string"
                          ? `${Math.round(parseFloat(leagueValue))}%`
                          : leagueValue}
                        </span>
                        League
                      </p>
                    </div>
                  </div>
                );
              }}
            />
            <PolarGrid 
              stroke={`hsl(${colors.mutedForeground})`}
              strokeOpacity={0.3}
            />
            <PolarAngleAxis
              dataKey="stat"
              tick={{ fill: `hsl(${colors.mutedForeground})`, fontSize: 10 }}
              axisLine={{ stroke: `hsl(${colors.mutedForeground})`, strokeOpacity: 0 }}
              tickLine={false}
            />
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
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-out"
            />

            <Radar
              name="Ref"
              dataKey="refValue"
              stroke={`hsl(${colors.primary})`}
              fill={`hsl(${colors.primary})`}
              fillOpacity={0.15}
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={1000}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
