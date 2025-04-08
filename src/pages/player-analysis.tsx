import { Activity, BarChart3, Clock, Flag, Gauge, Target, Users } from "lucide-react";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TacticalHeatmap } from "@/components/dashboard/tactical-heatmap";
import { Progress } from "@/components/ui/progress";

const PlayerAnalysis = () => {
  // Sample player data
  const player = {
    id: 1,
    name: "Mohamed Salah",
    position: "Right Wing",
    number: 11,
    team: "Liverpool",
    nationality: "Egypt",
    age: 30,
    height: "175cm",
    weight: "71kg",
    image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p118748.png"
  };

  // Sample match performance data
  const matchPerformance = {
    minutes: 90,
    goals: 1,
    assists: 1,
    shots: 4,
    shotsOnTarget: 3,
    passesCompleted: 32,
    passesAttempted: 38,
    keyPasses: 3,
    dribbles: 5,
    dribbleSuccess: 4,
    tackles: 2,
    interceptions: 1,
    distanceCovered: 10.8,
    sprintCount: 18,
    topSpeed: 33.2,
  };

  // Sample heatmap data
  const heatmapData = [
    { x: 0.7, y: 0.2, value: 0.9 },
    { x: 0.75, y: 0.3, value: 0.8 },
    { x: 0.8, y: 0.25, value: 0.7 },
    { x: 0.65, y: 0.35, value: 0.6 },
    { x: 0.7, y: 0.4, value: 0.5 },
    { x: 0.6, y: 0.3, value: 0.4 },
    { x: 0.55, y: 0.35, value: 0.3 },
    { x: 0.5, y: 0.4, value: 0.2 },
    { x: 0.45, y: 0.45, value: 0.1 },
  ];

  // Sample season stats
  const seasonStats = [
    { stat: "Goals", value: 22, max: 30 },
    { stat: "Assists", value: 13, max: 20 },
    { stat: "Expected Goals (xG)", value: 19.4, max: 25 },
    { stat: "Expected Assists (xA)", value: 10.2, max: 15 },
    { stat: "Shots per 90", value: 3.8, max: 5 },
    { stat: "Key Passes per 90", value: 2.4, max: 4 },
    { stat: "Successful Dribbles per 90", value: 2.1, max: 4 },
    { stat: "Progressive Carries per 90", value: 8.3, max: 10 },
  ];

  // Sample radar chart data (percentiles compared to other players)
  const radarStats = [
    { stat: "Goals", percentile: 96 },
    { stat: "Assists", percentile: 92 },
    { stat: "xG", percentile: 94 },
    { stat: "xA", percentile: 89 },
    { stat: "Shot-Creating Actions", percentile: 95 },
    { stat: "Progressive Carries", percentile: 88 },
    { stat: "Progressive Passes", percentile: 75 },
    { stat: "Successful Take-Ons", percentile: 90 },
    { stat: "Touches in Att Box", percentile: 97 },
    { stat: "Pressures", percentile: 70 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Player Analysis</h1>
            <p className="text-muted-foreground">
              Detailed performance analysis and statistics
            </p>
          </div>

          {/* Player Profile Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-primary">
                  <AvatarImage src={player.image} alt={player.name} />
                  <AvatarFallback className="text-3xl">{player.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">{player.name}</h2>
                    <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-md text-sm">
                      #{player.number}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{player.position} • {player.team}</p>
                  <div className="flex gap-4 text-sm pt-1">
                    <div>
                      <span className="text-muted-foreground">Nationality:</span> {player.nationality}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Age:</span> {player.age}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Height:</span> {player.height}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Weight:</span> {player.weight}
                    </div>
                  </div>
                </div>
                
                <div className="ml-auto flex flex-col items-end">
                  <div className="text-3xl font-bold text-primary">8.7</div>
                  <div className="text-sm text-muted-foreground">Match Rating</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Match Performance Stats */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Goal Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matchPerformance.goals + matchPerformance.assists}</div>
                <p className="text-xs text-muted-foreground">
                  {matchPerformance.goals} goals, {matchPerformance.assists} assists
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pass Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((matchPerformance.passesCompleted / matchPerformance.passesAttempted) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {matchPerformance.passesCompleted}/{matchPerformance.passesAttempted} completed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Dribble Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((matchPerformance.dribbleSuccess / matchPerformance.dribbles) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {matchPerformance.dribbleSuccess}/{matchPerformance.dribbles} successful
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Distance Covered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{matchPerformance.distanceCovered} km</div>
                <p className="text-xs text-muted-foreground">
                  {matchPerformance.sprintCount} sprints, {matchPerformance.topSpeed} km/h top speed
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Analysis Tabs */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="attacking">Attacking</TabsTrigger>
                    <TabsTrigger value="defensive">Defensive</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-4 space-y-4">
                    <h3 className="text-lg font-semibold">Match Impact</h3>
                    <p>
                      Salah delivered an outstanding performance against Manchester United, contributing directly to both goals with one goal and one assist. His movement and positioning caused constant problems for the opposition defense, particularly exploiting the space behind Luke Shaw.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-4">Key Strengths</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Excellent positioning in the final third, finding space between defenders</li>
                      <li>Clinical finishing, converting 1 of 3 shots on target</li>
                      <li>Created 3 key chances for teammates</li>
                      <li>Successful in 4 out of 5 dribble attempts, beating defenders in 1v1 situations</li>
                    </ul>
                    
                    <h3 className="text-lg font-semibold mt-4">Areas for Improvement</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Could improve defensive contribution when team is out of possession</li>
                      <li>Occasionally held onto the ball too long when quicker passing options were available</li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="attacking" className="mt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold">Shot Map</h3>
                        <div className="h-48 bg-muted rounded-md flex items-center justify-center">
                          <p className="text-muted-foreground">Shot map visualization</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold">Pass Map</h3>
                        <div className="h-48 bg-muted rounded-md flex items-center justify-center">
                          <p className="text-muted-foreground">Pass map visualization</p>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-4">Attacking Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Shots</span>
                          <span>{matchPerformance.shots}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shots on Target</span>
                          <span>{matchPerformance.shotsOnTarget}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shot Accuracy</span>
                          <span>{Math.round((matchPerformance.shotsOnTarget / matchPerformance.shots) * 100)}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Goals</span>
                          <span>{matchPerformance.goals}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Key Passes</span>
                          <span>{matchPerformance.keyPasses}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Assists</span>
                          <span>{matchPerformance.assists}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Successful Dribbles</span>
                          <span>{matchPerformance.dribbleSuccess}/{matchPerformance.dribbles}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Touches in Box</span>
                          <span>12</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="defensive" className="mt-4 space-y-4">
                    <h3 className="text-lg font-semibold">Defensive Contribution</h3>
                    <p>
                      While primarily an attacking player, Salah contributed to the team's defensive efforts with strategic pressing and occasional tracking back to support the fullback.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Tackles</span>
                          <span>{matchPerformance.tackles}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Interceptions</span>
                          <span>{matchPerformance.interceptions}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Ball Recoveries</span>
                          <span>5</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Pressures</span>
                          <span>14</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Successful Pressures</span>
                          <span>6</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Pressure Success Rate</span>
                          <span>43%</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold mt-4">Pressing Zones</h3>
                    <div className="h-48 bg-muted rounded-md flex items-center justify-center">
                      <p className="text-muted-foreground">Pressing zones visualization</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <TacticalHeatmap 
                data={heatmapData} 
                title="Player Heatmap"
              />
              
              <Card>
                <CardHeader>
                  <CardTitle>Season Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {seasonStats.map((stat, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{stat.stat}</span>
                          <span className="text-muted-foreground">{stat.value}/{stat.max}</span>
                        </div>
                        <Progress 
                          value={(stat.value / stat.max) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Percentile Ranks */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Percentile Ranks vs. Premier League Wingers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {radarStats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative h-24 w-24">
                      <svg className="h-24 w-24" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="10"
                          className="text-muted opacity-20"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="currentColor"
                          strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 45 * (stat.percentile / 100)} ${2 * Math.PI * 45}`}
                          strokeLinecap="round"
                          className="text-primary transform -rotate-90 origin-center"
                        />
                        <text
                          x="50"
                          y="50"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-2xl font-bold"
                          fill="currentColor"
                        >
                          {stat.percentile}
                        </text>
                        <text
                          x="50"
                          y="65"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="text-xs"
                          fill="currentColor"
                        >
                          %ile
                        </text>
                      </svg>
                    </div>
                    <span className="text-sm text-center mt-2">{stat.stat}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default PlayerAnalysis;