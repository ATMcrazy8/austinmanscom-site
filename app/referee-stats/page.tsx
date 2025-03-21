"use client";

import { useEffect, useState } from "react";

type Referee = {
  id: number;
  refNumber: number;
  name: string;
  totalGames: number;
  penaltiesPerGame: number;
  pimPerGame: number;
  avgPenaltyDiff: number;
};

export default function RefereeStats() {
  const [referees, setReferees] = useState<Referee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/referees")
      .then((res) => res.json())
      .then((data) => {
        setReferees(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-lg">Loading referees...</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-8 w-full">
      <div className="w-[calc(100%-40px)] max-w-[1520px] text-start">
        <h1 className="text-3xl font-bold text-card-foreground">NHL Referees</h1>
      </div>
      <ul className="space-y-4 w-[calc(100%-40px)] max-w-[1520px]">
        {referees.map((ref) => (
          <li key={ref.id} className="flex flex-row items-center justify-start border rounded-lg shadow-md bg-gradient-to-br from-secondary to-70% to-monotone">
            <div className="flex items-center justify-center w-16 m-4">
              <p className="flex items-top gap-1 text-2xl font-bold text-monotone-foreground">
                <span className="text-xs">#</span>
                {ref.refNumber}
              </p>
            </div>
            <div className="flex flex-col p-4 border-l-[1px] border-border gap-2">
              <h2 className="text-xl text-monotone-foreground font-semibold">{ref.name}</h2>
              <div className="flex flex-row flex-wrap w-full gap-y-2">
                <p className="text-sm text-card-foreground/80 w-40 px-2">Games Worked:&#8199;
                  <span className="text-card-foreground font-medium">{ref.totalGames}</span>
                </p>
                <p className="text-sm text-card-foreground/80 w-40 px-2">Avg Pen/gm:&#8199;
                  <span className="text-card-foreground font-medium">{ref.penaltiesPerGame}</span>
                </p>
                <p className="text-sm text-card-foreground/80 w-40 px-2">Avg PIM/gm:&#8199;
                  <span className="text-card-foreground font-medium">{ref.pimPerGame}</span>
                </p>
                <p className="text-sm text-card-foreground/80 w-40 px-2">Avg Pen Diff:&#8199;
                  <span className="text-card-foreground font-medium">{ref.avgPenaltyDiff}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="w-[calc(100%-40px)] max-w-[1520px] text-start">
        <i className="text-muted-foreground">* NHL/AHL Official</i>
      </div>
    </div>
  );
}
