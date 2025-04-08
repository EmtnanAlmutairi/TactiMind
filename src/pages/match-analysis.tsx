import { BarChart, BarChart3, Clock, Flag, Gauge, Target, Users } from "lucide-react";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { StatsCard } from "@/components/dashboard/stats-card";
import { PitchVisualization } from "@/components/dashboard/pitch-visualization";
import { MatchTimeline } from "@/components/dashboard/match-timeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

// Sample match stats
const matchStats = [
  { stat: "Possession", home: 58, away: 42 },
  { stat: "Shots", home: 12, away: 9 },
  { stat: "Shots on Target", home: 5, away: 3 },
  { stat: "Corners", home: 7, away: 5 },
  { stat: "Fouls", home: 8, away: 12 },
  { stat: "Yellow Cards", home: 1, away: 2 },
  { stat: "Red Cards", home: 0, away: 0 },
  { stat: "Offsides", home: 2, away: 3 },
  { stat: "Passes", home: 523, away: 398 },
  { stat: "Pass Accuracy", home: 87, away: 79 },
];

const MatchAnalysis = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Match Analysis</h1>
            <p className="text-muted-foreground">
              Liverpool vs Manchester United - Detailed Analysis
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Score"
              value="2 - 1"
              icon={<BarChart3 className="h-4 w-4" />}
              description="Liverpool leads"
            />
            <StatsCard
              title="Possession"
              value="58% - 42%"
              icon={<Clock className="h-4 w-4" />}
              description="Ball possession"
            />
            <StatsCard
              title="Expected Goals"
              value="2.4 - 1.2"
              icon={<Gauge className="h-4 w-4" />}
              description="xG comparison"
            />
            <StatsCard
              title="Shots"
              value="12 - 9"
              icon={<Target className="h-4 w-4" />}
              description="Total shots"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <PitchVisualization 
              players={players} 
              title="Average Positions (2nd Half)"
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Match Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {matchStats.map((stat, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{stat.home}</span>
                        <span className="text-muted-foreground">{stat.stat}</span>
                        <span className="font-medium">{stat.away}</span>
                      </div>
                      <div className="flex h-2 items-center">
                        <div 
                          className="h-2 bg-blue-500 rounded-l-full" 
                          style={{ width: `${stat.home / (stat.home + stat.away) * 100}%` }}
                        />
                        <div 
                          className="h-2 bg-red-500 rounded-r-full" 
                          style={{ width: `${stat.away / (stat.home + stat.away) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Tactical Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="defense">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="defense">Defensive Shape</TabsTrigger>
                    <TabsTrigger value="attack">Attacking Patterns</TabsTrigger>
                    <TabsTrigger value="transitions">Transitions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="defense" className="mt-4 space-y-4">
                    <h3 className="text-lg font-semibold">Defensive Organization</h3>
                    <p>Liverpool maintained a compact 4-3-3 defensive shape, with the midfield three staying narrow to prevent central progression. The fullbacks were positioned higher to press Manchester United's wide players early.</p>
                    
                    <h3 className="text-lg font-semibold mt-4">Key Observations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Van Dijk and Gomez maintained excellent positioning, limiting Ronaldo's involvement</li>
                      <li>Henderson's defensive coverage was crucial in stopping Bruno Fernandes</li>
                      <li>The high press forced Manchester United into 23 turnovers in their own half</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="attack" className="mt-4 space-y-4">
                    <h3 className="text-lg font-semibold">Attacking Patterns</h3>
                    <p>Liverpool's attack focused on quick transitions and exploiting the wide areas, particularly targeting the space behind Wan-Bissaka. Salah and Mane frequently moved inside to create overloads in the half-spaces.</p>
                    
                    <h3 className="text-lg font-semibold mt-4">Key Observations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Robertson provided 6 crosses from advanced positions</li>
                      <li>Salah's movement inside created confusion in Manchester United's defensive line</li>
                      <li>Thiago's passing range allowed quick switches of play to exploit open spaces</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="transitions" className="mt-4 space-y-4">
                    <h3 className="text-lg font-semibold">Transition Moments</h3>
                    <p>Liverpool excelled in transition moments, with quick counter-pressing after losing possession and rapid forward progression when winning the ball. The team's coordinated movements allowed them to exploit Manchester United's disorganization.</p>
                    
                    <h3 className="text-lg font-semibold mt-4">Key Observations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Counter-pressing recovered possession within 5 seconds on 14 occasions</li>
                      <li>Mane's goal came from a transition that moved from defense to attack in just 8 seconds</li>
                      <li>Henderson and Keita's positioning during transitions provided excellent balance</li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <MatchTimeline events={timelineEvents} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MatchAnalysis;