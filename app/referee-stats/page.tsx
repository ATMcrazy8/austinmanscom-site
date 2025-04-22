"use client";

import Link from "next/link";
import { slugify } from "@/lib/slugify";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { calculateFairnessScores } from "@/lib/calculateFairnessScores";
import { ArrowUpDown } from "lucide-react";
import { Referee as FairnessReferee } from "@/lib/calculateFairnessScores";


type Referee = FairnessReferee & {
  fairnessScore: {
    score: number;
    grade: string;
  };
};

type SortKey = "lastName" | "refNumber" | "totalGames" | "fairnessScore";
type SortDirection = "asc" | "desc";

export default function RefereeStats() {
  const [referees, setReferees] = useState<Referee[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>("lastName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [gradeFilter, setGradeFilter] = useState<string>("all");

  // Get default direction for a sort type
  const getDefaultDirection = (type: SortKey): SortDirection => {
    switch (type) {
      case "lastName":
        return "asc"; // A to Z
      case "refNumber":
        return "asc"; // Low to High
      case "totalGames":
        return "desc"; // Most to Least
      case "fairnessScore":
        return "desc"; // A to F
    }
  };

  // Handle sort type change
  const handleSortByChange = (newSortBy: SortKey) => {
    setSortBy(newSortBy);
    setSortDirection(getDefaultDirection(newSortBy));
  };

  useEffect(() => {
    fetch("/api/referees")
      .then((res) => res.json())
      .then((data) => {
        setReferees(data);
        setLoading(false);
      });
  }, []);

  // Calculate fairness scores for all referees
  const fairnessScores = calculateFairnessScores(referees);
  
  // Combine referee data with fairness scores
  const refereesWithScores = referees.map(ref => ({
    ...ref,
    fairnessScore: {
      score: fairnessScores.find(s => s.name === ref.name)?.score ?? 0,
      grade: fairnessScores.find(s => s.name === ref.name)?.grade ?? "F"
    }
  }));

  // Filter by grade if needed
  const filteredReferees = gradeFilter === "all" 
    ? refereesWithScores 
    : refereesWithScores.filter(ref => ref.fairnessScore.grade === gradeFilter);

  // Sort referees based on selected criteria
  const sortedReferees = [...filteredReferees].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "lastName":
        const aLastName = a.name.split(",")[0].trim();
        const bLastName = b.name.split(",")[0].trim();
        // Make A appear at top, Z at bottom
        comparison = aLastName.localeCompare(bLastName);
        break;
      case "refNumber":
        comparison = (a.refNumber || 0) - (b.refNumber || 0);
        break;
      case "totalGames":
        comparison = a.totalGames - b.totalGames;
        break;
      case "fairnessScore":
        comparison = (a.fairnessScore.score || 0) - (b.fairnessScore.score || 0);
        break;
    }

    // For last names, we want A at top (ascending)
    const effectiveDirection = sortBy === "lastName" 
      ? sortDirection
      : sortDirection;

    return effectiveDirection === "asc" ? comparison : -comparison;
  });

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === "asc" ? "desc" : "asc");
  };

  const getDirectionText = () => {
    switch (sortBy) {
      case "lastName":
        return sortDirection === "asc" ? "A to Z" : "Z to A";
      case "refNumber":
        return sortDirection === "asc" ? "Low to High" : "High to Low";
      case "totalGames":
        return sortDirection === "asc" ? "Least to Most" : "Most to Least";
      case "fairnessScore":
        return sortDirection === "asc" ? "F to A" : "A to F";
      default:
        return "";
    }
  };

  const getDirectionTitle = () => {
    switch (sortBy) {
      case "lastName":
        return sortDirection === "asc" ? "Sort A to Z" : "Sort Z to A";
      case "refNumber":
        return sortDirection === "asc" ? "Sort by lowest number" : "Sort by highest number";
      case "totalGames":
        return sortDirection === "asc" ? "Sort by fewest games" : "Sort by most games";
      case "fairnessScore":
        return sortDirection === "asc" ? "Sort by lowest grade" : "Sort by highest grade";
      default:
        return "";
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-[80vh] w-full">
        <div className="flex flex-col items-center gap-4 animate-pulse text-muted-foreground">
          <div className="h-12 w-12 border-4 border-t-transparent border-primary rounded-full animate-spin" />
          <p className="text-sm">Loading referees…</p>
          {/* Optional tagline */}
          <p className="text-xs text-muted-foreground italic">Corralling the zebras...</p>
        </div>
      </div>
    );

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4 py-8 w-[calc(100%-40px)] max-w-[1520px] mx-auto">
        <div className="w-full text-start">
          <h1 className="text-3xl font-bold text-card-foreground mb-4">
            NHL Referees
          </h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <label className="text-sm text-muted-foreground">
              Sort by:
              <select
                value={sortBy}
                onChange={(e) => handleSortByChange(e.target.value as SortKey)}
                className="ml-2 p-1 border rounded bg-background text-foreground"
              >
                <option value="lastName">Last Name</option>
                <option value="refNumber">Ref Number</option>
                <option value="totalGames">Games Worked</option>
                <option value="fairnessScore">Fairness Score</option>
              </select>
            </label>

            <button
              onClick={toggleSortDirection}
              className="flex items-center gap-1 p-1 border rounded bg-background text-foreground hover:bg-muted transition-colors"
              title={getDirectionTitle()}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="text-sm text-muted-foreground">
                {getDirectionText()}
              </span>
            </button>

            <label className="text-sm text-muted-foreground">
              Filter by Grade:
              <select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="ml-2 p-1 border rounded bg-background text-foreground"
              >
                <option value="all">All Grades</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
              </select>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {sortedReferees.map((referee, index) => (
            <motion.div
              key={referee.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link
                href={`/referee-stats/${slugify(referee.name)}`}
                className="block bg-gradient-to-r from-card/20 to-secondary/20 backdrop-blur-sm rounded-full border border-border/50 shadow-lg hover:shadow-xl hover:scale-[1.02] hover:border-ring/50 duration-200 h-full"
              >
                <div className="p-4 flex items-center gap-4 h-full">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary font-bold text-3xl shrink-0">
                    {referee.refNumber}
                  </div>
                  <div className="flex flex-col gap-2 flex-1 min-w-0">
                    <h3 className="text-lg font-semibold truncate">{referee.name}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <p className="whitespace-nowrap w-24">Games: {referee.totalGames}</p>
                      <p className="whitespace-nowrap w-24">Grade: {referee.fairnessScore.grade || 'N/A'}</p>
                      <p className="whitespace-nowrap w-24">Pen/gm: {typeof referee.minorsPerGame === 'number' ? referee.minorsPerGame.toFixed(2) : 'N/A'}</p>
                      <p className="whitespace-nowrap w-24">Pen Diff: {typeof referee.avgPenaltyDiff === 'number' ? referee.avgPenaltyDiff.toFixed(2) : 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col gap-2 w-full text-start">
          <i className="text-muted-foreground">* NHL/AHL Official</i>
          <i className="text-muted-foreground">Huge thanks to the people over at <a href="https://scoutingtherefs.com/" target="_blank" className="text-secondary-foreground underline hover:text-primary">Scouting the Refs</a> for tracking and compiling the data used in this project. Head there to see more data and news about the Professional Hockey Referees.</i>
        </div> 
      </div>
    </div>
  );
}
