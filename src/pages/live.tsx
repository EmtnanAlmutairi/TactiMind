import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PitchVisualization } from "@/components/dashboard/pitch-visualization";
import { MatchTimeline } from "@/components/dashboard/match-timeline";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Clock, Flag, Gauge, Play, Pause, RefreshCw, Target } from "lucide-react";
import { ComparisonChart } from "@/components/dashboard/comparison-chart";

const LiveAnalysis = () => {
  const [isLive, setIsLive] = useState(true);
  const [matchTime, setMatchTime] = useState(67);
  const [events, setEvents] = useState<any[]>([]);
  const [players, setPlayers] = useState<any[]>([]);

  // Initial events
  const initialEvents = [
    { id: 1, time: 12, type: "goal" as const, team: "home" as const, player: "M. Salah", description: "Goal from inside the box" },
    { id: 2, time: 24, type: "card" as const, team: "away" as const, player: "Fred", description: "Yellow card for a late tackle" },
    { id: 3, time: 37, type: "shot" as const, team: "home" as const, player: "R. Firmino", description: "Shot on target" },
    { id: 4, time: 45, type: "save" as const, team: "away" as const, player: "De Gea", description: "Great save from close range" },
    { id: 5, time: 52, type: "goal" as const, team: "away" as const, player: "C. Ronaldo", description: "Header from a corner" },
    { id: 6, time: 67, type: "substitution" as const, team: "home" as const, player: "D. Jota", description: "Replaces R. Firmino" },
  ];

  // Initial player positions
  const initialPlayers = [
    { id: 1, name: "J. Smith", position: "GK", x: 0.1, y: 0.5, team: "home" as const, number: 1 },
    { id: 2, name: "T. Arnold", position: "RB", x: 0.25, y: 0.2, team: "home" as const, number: 2 },
    { id: 3, name: "V. Dijk", position: "CB", x: 0.25, y: 0.4, team: "home" as const, number: 4 },
    { id: 4, name: "J. Gomez", position: "CB", x: 0.25, y: 0.6, team: "home" as const, number: 5 },
    { id: 5, name: "A. Robertson", position: "LB", x: 0.25, y: 0.8, team: "home" as const, number: 3 },
    { id: 6, name: "F. Keita", position: "CM", x: 0.4, y: 0.3, team: "home" as const, number: 8 },
    { id: 7, name: "J. Henderson", position: "CDM", x: 0.4, y: 0.5, team: "home" as const, number: 6 },
    { id: 8, name: "T. Alcantara", position: "CM", x: 0.4, y: 0.7, team: "home" as const, number: 7 },
    { id: 9, name: "M. Salah", position: "RW", x: 0.6, y: 0.3, team: "home" as const, number: 11 },
    { id: 10, name: "D. Jota", position: "CF", x: 0.6, y: 0.5, team: "home" as const, number: 20 },
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

  // Comparison data
  const comparisonData = [
    { name: "Possession", team1Value: 58, team2Value: 42 },
    { name: "Shots", team1Value: 12, team2Value: 9 },
    { name: "Shots on Target", team1Value: 5, team2Value: 3 },
    { name: "Corners", team1Value: 7, team2Value: 5 },
    { name: "Fouls", team1Value: 8, team2Value: 12 },
  ];

  useEffect(() => {
    setEvents(initialEvents);
    setPlayers(initialPlayers);

    // Simulate live updates if isLive is true
    let interval: NodeJS.Timeout | undefined;
    if (isLive) {
      interval = setInterval(() => {
        // Update match time
        setMatchTime(prevTime => {
          if (prevTime >= 90) {
            if (interval) clearInterval(interval);
            setIsLive(false);
            return 90;
          }
          return prevTime + 1;
        });

        // Occasionally add new events
        if (matchTime === 78) {
          setEvents(prev => [
            ...prev,
            { id: 7, time: 78, type: "foul" as const, team: "away" as const, player: "Maguire", description: "Foul near the penalty area" }
          ]);
        }
        
        if (matchTime === 85) {
          setEvents(prev => [
            ...prev,
            { id: 8, time: 85, type: "goal" as const, team: "home" as const, player: "S. Mane", description: "Counter-attack goal" }
          ]);
        }

        // Randomly update player positions slightly
        setPlayers(prev => 
          prev.map(player => ({
            ...player,
            x: player.x + (Math.random() * 0.04 - 0.02),
            y: player.y + (Math.random() * 0.04 - 0.02)
          }))
        );
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive, matchTime]);

  const toggleLiveStatus = () => {
    setIsLive(prev => !prev);
  };

  const resetSimulation = () => {
    setMatchTime(67);
    setEvents(initialEvents);
    setPlayers(initialPlayers);
    setIsLive(true);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight">Live Analysis</h1>
                <Badge variant={isLive ? "destructive" : "outline"} className="h-6">
                  {isLive ? "LIVE" : "PAUSED"}
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Liverpool vs Manchester United - Real-time tactical insights
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleLiveStatus}
              >
                {isLive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isLive ? "Pause" : "Resume"}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={resetSimulation}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          <div className="mb-4 p-4 bg-card rounded-lg border flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="font-bold">Liverpool</div>
                <div className="text-3xl font-bold text-primary">2</div>
              </div>
              <div className="text-xl font-bold text-muted-foreground">vs</div>
              <div className="text-center">
                <div className="font-bold">Man United</div>
                <div className="text-3xl font-bold text-destructive">1</div>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <div className="text-sm text-muted-foreground">Match Time</div>
              <div className="text-2xl font-bold">{matchTime}'</div>
            </div>
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

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-primary" />
                  Live Player Positions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <PitchVisualization players={players} title="" />
              </CardContent>
            </Card>
            
            <div className="grid gap-6">
              <MatchTimeline events={events} />
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Real-time Tactical Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-primary/10 border border-primary/20 rounded-md">
                      <h3 className="font-semibold text-primary mb-1">Attacking Opportunity</h3>
                      <p className="text-sm">
                        Liverpool is creating overloads on the left side. Exploit the space behind Wan-Bissaka with Mane's runs.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                      <h3 className="font-semibold text-destructive mb-1">Defensive Vulnerability</h3>
                      <p className="text-sm">
                        Man United targeting the space between Van Dijk and Robertson. Midfield needs to provide better cover.
                      </p>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-md">
                      <h3 className="font-semibold mb-1">Set Piece Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Liverpool has a 67% success rate on corners from the right side. Target Maguire who has lost 3/4 aerial duels.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Match Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="possession">Possession</TabsTrigger>
                    <TabsTrigger value="shots">Shots</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="pt-4">
                    <ComparisonChart 
                      data={comparisonData}
                      team1Name="Liverpool"
                      team2Name="Man United"
                      team1Color="#3b82f6"
                      team2Color="#ef4444"
                    />
                  </TabsContent>
                  
                  <TabsContent value="possession" className="pt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Possession Breakdown</h3>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Liverpool</span>
                              <span>58%</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: "58%" }}></div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Man United</span>
                              <span>42%</span>
                            </div>
                            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-red-500 rounded-full" style={{ width: "42%" }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-semibold mt-6 mb-4">Possession by Area</h3>
                        <div className="grid grid-cols-3 gap-2 text-center">
                          <div className="p-2 bg-blue-500/20 rounded-md">
                            <div className="text-xs text-muted-foreground">Defensive Third</div>
                            <div className="font-bold">22%</div>
                          </div>
                          <div className="p-2 bg-blue-500/20 rounded-md">
                            <div className="text-xs text-muted-foreground">Middle Third</div>
                            <div className="font-bold">45%</div>
                          </div>
                          <div className="p-2 bg-blue-500/20 rounded-md">
                            <div className="text-xs text-muted-foreground">Final Third</div>
                            <div className="font-bold">33%</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Passing Statistics</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Total Passes</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">423</span>
                              <span className="text-red-500 font-bold">312</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Pass Accuracy</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">87%</span>
                              <span className="text-red-500 font-bold">79%</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Long Balls</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">24</span>
                              <span className="text-red-500 font-bold">32</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Through Balls</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">8</span>
                              <span className="text-red-500 font-bold">3</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Crosses</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">18</span>
                              <span className="text-red-500 font-bold">12</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="shots" className="pt-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Shot Analysis</h3>
                        <div className="space-y-4">
                          <div className="flex justify-between">
                            <span>Total Shots</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">12</span>
                              <span className="text-red-500 font-bold">9</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Shots on Target</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">5</span>
                              <span className="text-red-500 font-bold">3</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Shot Accuracy</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">42%</span>
                              <span className="text-red-500 font-bold">33%</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Expected Goals (xG)</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">2.4</span>
                              <span className="text-red-500 font-bold">1.2</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between">
                            <span>Big Chances</span>
                            <div className="flex gap-4">
                              <span className="text-blue-500 font-bold">3</span>
                              <span className="text-red-500 font-bold">1</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Shot Locations</h3>
                        <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                          <p className="text-muted-foreground">Shot map visualization</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LiveAnalysis;