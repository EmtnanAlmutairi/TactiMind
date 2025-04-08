import { Activity, BarChart3, Clock, Flag, Gauge, Target, Users } from "lucide-react";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { StatsCard } from "@/components/dashboard/stats-card";
import { PitchVisualization } from "@/components/dashboard/pitch-visualization";
import { MatchTimeline } from "@/components/dashboard/match-timeline";
import { TeamFormation } from "@/components/dashboard/team-formation";
import { TacticalHeatmap } from "@/components/dashboard/tactical-heatmap";
import { PlayerStats } from "@/components/dashboard/player-stats";

// Sample data
const players = [
  { id: 1, name: "J. Smith", position: "GK", x: 0.1, y: 0.5, team: "home" as const, number: 1 },
  { id: 2, name: "T. Arnold", position: "RB", x: 0.25, y: 0.2, team: "home" as const, number: 2 },
  { id: 3, name: "V. Dijk", position: "CB", x: 0.25, y: 0.4, team: "home" as const, number: 4 },
  { id: 4, name: "J. Gomez", position: "CB", x: 0.25, y: 0.6, team: "home" as const, number: 5 },
  { id: 5, name: "A. Robertson", position: "LB", x: 0.25, y: 0.8, team: "home" as const, number: 3 },
  { id: 6, name: "F. Keita", position: "CM", x: 0.4, y: 0.3, team: "home" as const, number: 8 },
  { id: 7, name: "J. Henderson", position: "CDM", x: 0.4, y: 0.5, team: "home" as const, number: 6 },
  { id: 8, name: "T. Alcantara", position: "CM", x: 0.4, y: 0.7, team: "home" as const, number: 7 },
  { id: 9, name: "M. Salah", position: "RW", x: 0.6, y: 0.3, team: "home" as const, number: 11 },
  { id: 10, name: "R. Firmino", position: "CF", x: 0.6, y: 0.5, team: "home" as const, number: 9 },
  { id: 11, name: "S. Mane", position: "LW", x: 0.6, y: 0.7, team: "home" as const, number: 10 },
  
  { id: 12, name: "De Gea", position: "GK", x: 0.9, y: 0.5, team: "away" as const, number: 1 },
  { id: 13, name: "Wan-Bissaka", position: "RB", x: 0.75, y: 0.2, team: "away" as const, number: 29 },
  { id: 14, name: "Maguire", position: "CB", x: 0.75, y: 0.4, team: "away" as const, number: 5 },
  { id: 15, name: "Varane", position: "CB", x: 0.75, y: 0.6, team: "away" as const, number: 19 },
  { id: 16, name: "Shaw", position: "LB", x: 0.75, y: 0.8, team: "away" as const, number: 23 },
  { id: 17, name: "McTominay", position: "CM", x: 0.6, y: 0.3, team: "away" as const, number: 39 },
  { id: 18, name: "Fred", position: "CDM", x: 0.6, y: 0.5, team: "away" as const, number: 17 },
  { id: 19, name: "Fernandes", position: "CAM", x: 0.6, y: 0.7, team: "away" as const, number: 18 },
  { id: 20, name: "Sancho", position: "RW", x: 0.4, y: 0.3, team: "away" as const, number: 25 },
  { id: 21, name: "Ronaldo", position: "ST", x: 0.4, y: 0.5, team: "away" as const, number: 7 },
  { id: 22, name: "Rashford", position: "LW", x: 0.4, y: 0.7, team: "away" as const, number: 10 },
];

const timelineEvents = [
  { id: 1, time: 12, type: "goal" as const, team: "home" as const, player: "M. Salah", description: "Goal from inside the box" },
  { id: 2, time: 24, type: "card" as const, team: "away" as const, player: "Fred", description: "Yellow card for a late tackle" },
  { id: 3, time: 37, type: "shot" as const, team: "home" as const, player: "R. Firmino", description: "Shot on target" },
  { id: 4, time: 45, type: "save" as const, team: "away" as const, player: "De Gea", description: "Great save from close range" },
  { id: 5, time: 52, type: "goal" as const, team: "away" as const, player: "C. Ronaldo", description: "Header from a corner" },
  { id: 6, time: 67, type: "substitution" as const, team: "home" as const, player: "D. Jota", description: "Replaces R. Firmino" },
  { id: 7, time: 78, type: "foul" as const, team: "away" as const, player: "Maguire", description: "Foul near the penalty area" },
  { id: 8, time: 85, type: "goal" as const, team: "home" as const, player: "S. Mane", description: "Counter-attack goal" },
];

const homeFormation = {
  name: "Liverpool",
  formation: "4-3-3",
  players: [
    { number: 1, name: "Alisson", position: "GK", x: 0.08, y: 0.5 },
    { number: 2, name: "Arnold", position: "RB", x: 0.2, y: 0.2 },
    { number: 4, name: "Van Dijk", position: "CB", x: 0.2, y: 0.4 },
    { number: 5, name: "Gomez", position: "CB", x: 0.2, y: 0.6 },
    { number: 3, name: "Robertson", position: "LB", x: 0.2, y: 0.8 },
    { number: 8, name: "Keita", position: "CM", x: 0.4, y: 0.3 },
    { number: 6, name: "Henderson", position: "CDM", x: 0.4, y: 0.5 },
    { number: 7, name: "Alcantara", position: "CM", x: 0.4, y: 0.7 },
    { number: 11, name: "Salah", position: "RW", x: 0.7, y: 0.3 },
    { number: 9, name: "Firmino", position: "CF", x: 0.7, y: 0.5 },
    { number: 10, name: "Mane", position: "LW", x: 0.7, y: 0.7 },
  ]
};

const awayFormation = {
  name: "Man United",
  formation: "4-2-3-1",
  players: [
    { number: 1, name: "De Gea", position: "GK", x: 0.92, y: 0.5 },
    { number: 29, name: "Wan-Bissaka", position: "RB", x: 0.8, y: 0.2 },
    { number: 5, name: "Maguire", position: "CB", x: 0.8, y: 0.4 },
    { number: 19, name: "Varane", position: "CB", x: 0.8, y: 0.6 },
    { number: 23, name: "Shaw", position: "LB", x: 0.8, y: 0.8 },
    { number: 39, name: "McTominay", position: "CM", x: 0.65, y: 0.4 },
    { number: 17, name: "Fred", position: "CM", x: 0.65, y: 0.6 },
    { number: 18, name: "Fernandes", position: "CAM", x: 0.5, y: 0.5 },
    { number: 25, name: "Sancho", position: "RW", x: 0.5, y: 0.3 },
    { number: 7, name: "Ronaldo", position: "ST", x: 0.35, y: 0.5 },
    { number: 10, name: "Rashford", position: "LW", x: 0.5, y: 0.7 },
  ]
};

const heatmapData = [
  { x: 0.7, y: 0.3, value: 0.9 },
  { x: 0.65, y: 0.4, value: 0.7 },
  { x: 0.6, y: 0.5, value: 0.8 },
  { x: 0.65, y: 0.6, value: 0.6 },
  { x: 0.7, y: 0.7, value: 0.9 },
  { x: 0.5, y: 0.5, value: 0.5 },
  { x: 0.4, y: 0.3, value: 0.4 },
  { x: 0.4, y: 0.7, value: 0.4 },
  { x: 0.3, y: 0.5, value: 0.3 },
];

const playerStats = {
  player: {
    id: 10,
    name: "Mohamed Salah",
    position: "Right Wing",
    number: 11,
    team: "Liverpool",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p118748.png"
  },
  stats: [
    { name: "Goals", value: 2, max: 5 },
    { name: "Assists", value: 1, max: 5 },
    { name: "Shots", value: 4, max: 10 },
    { name: "Passes", value: 32, max: 50 },
    { name: "Tackles", value: 2, max: 10 },
    { name: "Distance Covered (km)", value: 8.7, max: 12 },
  ]
};

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Liverpool vs Manchester United - Live Match Analysis
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Possession"
              value="58%"
              icon={<Clock className="h-4 w-4" />}
              description="Ball possession"
              trend="up"
              trendValue="4%"
            />
            <StatsCard
              title="Shots"
              value="12"
              icon={<Target className="h-4 w-4" />}
              description="5 on target"
              trend="up"
              trendValue="3"
            />
            <StatsCard
              title="Expected Goals (xG)"
              value="2.4"
              icon={<Gauge className="h-4 w-4" />}
              description="Quality of chances"
              trend="up"
              trendValue="0.8"
            />
            <StatsCard
              title="Corners"
              value="7"
              icon={<Flag className="h-4 w-4" />}
              description="Corner kicks"
              trend="neutral"
              trendValue="0"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <PitchVisualization 
              players={players} 
              title="Live Player Positions"
            />
            <MatchTimeline events={timelineEvents} className="lg:col-span-1" />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <TeamFormation 
              homeTeam={homeFormation} 
              awayTeam={awayFormation} 
            />
            <TacticalHeatmap 
              data={heatmapData} 
              title="Liverpool Attack Heatmap"
            />
            <PlayerStats 
              player={playerStats.player}
              stats={playerStats.stats}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;