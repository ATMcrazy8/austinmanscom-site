"use client";

import Link from "next/link";
import { slugify } from "@/lib/slugify";
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

type SortKey = "lastName" | "refNumber" | "totalGames";
type SortDirection = "asc" | "desc";

export default function RefereeStats() {
  const [referees, setReferees] = useState<Referee[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>("lastName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    fetch("/api/referees")
      .then((res) => res.json())
      .then((data) => {
        setReferees(data);
        setLoading(false);
      });
  }, []);

  const sortedReferees = [...referees].sort((a, b) => {
    if (sortBy === "lastName") {
      const getLastName = (name: string) => {
        const cleaned = name.replace(/\*/g, "").trim();
        const parts = cleaned.split(",");
        return parts.length > 1 ? parts[0].trim().toLowerCase() : cleaned.split(" ").slice(-1)[0].toLowerCase();
      };
      return sortDirection === "asc"
        ? getLastName(a.name).localeCompare(getLastName(b.name))
        : getLastName(b.name).localeCompare(getLastName(a.name));
    } else if (sortBy === "refNumber") {
      return sortDirection === "asc"
        ? a.refNumber - b.refNumber
        : b.refNumber - a.refNumber;
    } else if (sortBy === "totalGames") {
      return sortDirection === "asc"
        ? a.totalGames - b.totalGames
        : b.totalGames - a.totalGames;
    }
    return 0;
  });

  if (loading) return <p className="text-center text-lg">Loading referees...</p>;

  return (
    <div className="flex flex-col items-center gap-4 p-8 w-full">
      <div className="w-[calc(100%-40px)] max-w-[1520px] text-start">
        <h1 className="text-3xl font-bold text-card-foreground mb-4">NHL Referees</h1>
        
        <div className="flex gap-4 mb-6">
          <label className="text-sm text-muted-foreground">
            Sort by:
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="ml-2 p-1 border rounded bg-background text-foreground"
            >
              <option value="lastName">Last Name</option>
              <option value="refNumber">Ref Number</option>
              <option value="totalGames">Games Worked</option>
            </select>
          </label>

          <label className="text-sm text-muted-foreground">
            Direction:
            <select
              value={sortDirection}
              onChange={(e) => setSortDirection(e.target.value as SortDirection)}
              className="ml-2 p-1 border rounded bg-background text-foreground"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
      </div>

      <ul className="space-y-4 w-[calc(100%-40px)] max-w-[1520px]">
        {sortedReferees.map((ref) => {
          const slug = slugify(ref.name);
          return (
            <li key={ref.id} className="flex flex-row items-center justify-start border rounded-lg shadow-md bg-gradient-to-br from-secondary to-70% to-monotone hover:scale-[1.02] hover:shadow-lg hover:border-primary duration-150">
              <Link href={`/referee-stats/${slug}`} className="flex flex-row w-full">
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
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="w-[calc(100%-40px)] max-w-[1520px] text-start">
        <i className="text-muted-foreground">* NHL/AHL Official</i>
      </div>
    </div>
  );
}
