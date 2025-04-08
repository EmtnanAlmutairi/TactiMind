import { Activity, BarChart3, Clock, Flag, Gauge, Target, Users } from "lucide-react";
import { Header } from "@/components/layout/header";
import { AppSidebar } from "@/components/layout/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TeamFormation } from "@/components/dashboard/team-formation";

const TeamStats = () => {
  // Sample team data
  const team = {
    name: "Liverpool FC",
    logo: "https://resources.premierleague.com/premierleague/badges/t14.svg",
    manager: "Jürgen Klopp",
    founded: 1892,
    stadium: "Anfield",
    capacity: 53394,
  };

  // Sample season stats
  const seasonStats = {
    matches: 38,
    wins: 28,
    draws: 8,
    losses: 2,
    goalsFor: 94,
    goalsAgainst: 26,
    cleanSheets: 21,
    points: 92,
  };

  // Sample formation data
  const homeTeam = {
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

  const alternativeFormation = {
    name: "Liverpool (Alt)",
    formation: "4-2-3-1",
    players: [
      { number: 1, name: "Alisson", position: "GK", x: 0.08, y: 0.5 },
      { number: 2, name: "Arnold", position: "RB", x: 0.2, y: 0.2 },
      { number: 4, name: "Van Dijk", position: "CB", x: 0.2, y: 0.4 },
      { number: 5, name: "Gomez", position: "CB", x: 0.2, y: 0.6 },
      { number: 3, name: "Robertson", position: "LB", x: 0.2, y: 0.8 },
      { number: 6, name: "Henderson", position: "CDM", x: 0.35, y: 0.4 },
      { number: 7, name: "Alcantara", position: "CDM", x: 0.35, y: 0.6 },
      { number: 11, name: "Salah", position: "RW", x: 0.6, y: 0.2 },
      { number: 20, name: "Jota", position: "CAM", x: 0.55, y: 0.5 },
      { number: 10, name: "Mane", position: "LW", x: 0.6, y: 0.8 },
      { number: 9, name: "Firmino", position: "ST", x: 0.75, y: 0.5 },
    ]
  };

  // Sample top performers
  const topScorers = [
    { name: "Mohamed Salah", goals: 22, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p118748.png" },
    { name: "Sadio Mané", goals: 16, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p110979.png" },
    { name: "Diogo Jota", goals: 15, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p194634.png" },
    { name: "Roberto Firmino", goals: 9, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p92217.png" },
    { name: "Virgil van Dijk", goals: 3, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p97032.png" },
  ];

  const topAssists = [
    { name: "Trent Alexander-Arnold", assists: 12, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p169187.png" },
    { name: "Mohamed Salah", assists: 13, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p118748.png" },
    { name: "Andrew Robertson", assists: 10, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p122798.png" },
    { name: "Jordan Henderson", assists: 5, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p56979.png" },
    { name: "Sadio Mané", assists: 4, image: "https://resources.premierleague.com/premierleague/photos/players/250x250/p110979.png" },
  ];

  // Sample team stats comparison
  const teamComparison = [
    { stat: "Goals Scored", value: 94, rank: 1, avgValue: 52 },
    { stat: "Goals Conceded", value: 26, rank: 1, avgValue: 48 },
    { stat: "Expected Goals (xG)", value: 89.2, rank: 1, avgValue: 50.3 },
    { stat: "Expected Goals Against (xGA)", value: 32.1, rank: 2, avgValue: 50.3 },
    { stat: "Possession", value: 63.4, rank: 2, avgValue: 50 },
    { stat: "Pass Accuracy", value: 85.7, rank: 2, avgValue: 78.2 },
    { stat: "Shots per Game", value: 18.2, rank: 1, avgValue: 12.4 },
    { stat: "Tackles per Game", value: 16.8, rank: 5, avgValue: 15.2 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Team Statistics</h1>
            <p className="text-muted-foreground">
              Season performance and tactical analysis
            </p>
          </div>

          {/* Team Profile Card */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="h-24 w-24 flex items-center justify-center">
                  <img src={team.logo} alt={team.name} className="h-20 w-20" />
                </div>
                
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">{team.name}</h2>
                  <p className="text-muted-foreground">Manager: {team.manager}</p>
                  <div className="flex gap-4 text-sm pt-1">
                    <div>
                      <span className="text-muted-foreground">Founded:</span> {team.founded}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Stadium:</span> {team.stadium}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Capacity:</span> {team.capacity.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="ml-auto flex flex-col items-end">
                  <div className="text-3xl font-bold text-primary">{seasonStats.points}</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Season Stats */}
          <div className="grid gap-6 md:grid-cols-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seasonStats.matches}</div>
                <div className="mt-1 flex items-center text-xs">
                  <span className="text-emerald-500 mr-1">{seasonStats.wins}W</span>
                  <span className="text-amber-500 mx-1">{seasonStats.draws}D</span>
                  <span className="text-rose-500 mx-1">{seasonStats.losses}L</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {Math.round((seasonStats.wins / seasonStats.matches) * 100)}%
                </div>
                <p className="text-xs text-muted-foreground">
                  League Rank: 1st
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Goals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {seasonStats.goalsFor} : {seasonStats.goalsAgainst}
                </div>
                <p className="text-xs text-muted-foreground">
                  GD: +{seasonStats.goalsFor - seasonStats.goalsAgainst}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Clean Sheets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{seasonStats.cleanSheets}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((seasonStats.cleanSheets / seasonStats.matches) * 100)}% of matches
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Formation */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <TeamFormation 
              homeTeam={homeTeam} 
              awayTeam={alternativeFormation} 
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Team Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamComparison.map((stat, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{stat.stat}</span>
                        <div>
                          <span className="font-medium">{stat.value}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            (Rank: {stat.rank})
                          </span>
                        </div>
                      </div>
                      <div className="flex h-2 items-center">
                        <div 
                          className="h-2 bg-primary rounded-l-full" 
                          style={{ width: `${(stat.value / (stat.value > stat.avgValue ? stat.value * 1.2 : stat.avgValue * 1.2)) * 100}%` }}
                        />
                        <div className="relative">
                          <div className="absolute -left-1 top-1/2 h-4 w-0.5 bg-muted-foreground -translate-y-1/2"></div>
                        </div>
                        <div 
                          className="h-2 bg-muted rounded-r-full" 
                          style={{ width: `${(stat.avgValue / (stat.value > stat.avgValue ? stat.value * 1.2 : stat.avgValue * 1.2)) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Team</span>
                        <span>League Average: {stat.avgValue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performers */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Scorers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topScorers.map((player, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10 ml-4">
                        <AvatarImage src={player.image} alt={player.name} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{player.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {player.goals} goals
                        </p>
                      </div>
                      <div className="ml-auto font-bold">
                        {player.goals}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Assists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAssists.map((player, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10 ml-4">
                        <AvatarImage src={player.image} alt={player.name} />
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">{player.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {player.assists} assists
                        </p>
                      </div>
                      <div className="ml-auto font-bold">
                        {player.assists}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tactical Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Tactical Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="attacking">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="attacking">Attacking Patterns</TabsTrigger>
                  <TabsTrigger value="defensive">Defensive Structure</TabsTrigger>
                  <TabsTrigger value="transitions">Transitions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="attacking" className="mt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold">Key Attacking Patterns</h3>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Fullbacks providing width in advanced positions</li>
                        <li>Inverted wingers cutting inside to create space</li>
                        <li>Central midfielders rotating to maintain possession</li>
                        <li>False 9 dropping deep to create overloads</li>
                        <li>Quick switches of play to exploit open spaces</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-4">Strengths</h3>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>High-quality chance creation (2.4 xG per match)</li>
                        <li>Effective high press leading to turnovers in dangerous areas</li>
                        <li>Excellent crossing from fullbacks (22 assists combined)</li>
                        <li>Clinical finishing from front three (53 goals combined)</li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted rounded-md p-4 flex items-center justify-center">
                      <p className="text-muted-foreground">Attacking patterns visualization</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="defensive" className="mt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold">Defensive Structure</h3>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Compact 4-3-3 shape when defending</li>
                        <li>High defensive line with offside trap</li>
                        <li>Aggressive counter-pressing after losing possession</li>
                        <li>Midfield three providing central cover</li>
                        <li>Forwards actively participating in the press</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-4">Strengths</h3>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>21 clean sheets (highest in the league)</li>
                        <li>Only 26 goals conceded (lowest in the league)</li>
                        <li>Excellent aerial dominance from center-backs</li>
                        <li>Effective high press (recovered possession within 5 seconds on 232 occasions)</li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted rounded-md p-4 flex items-center justify-center">
                      <p className="text-muted-foreground">Defensive structure visualization</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="transitions" className="mt-4 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold">Transition Moments</h3>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>Quick vertical progression after winning possession</li>
                        <li>Immediate counter-press after losing the ball</li>
                        <li>Vertical passes to bypass opposition midfield</li>
                        <li>Quick player movement to create passing options after winning possession</li>
                        <li>Fullbacks quickly transitioning between attack and defense roles</li>
                      </ul>
                      
                      <h3 className="text-lg font-semibold mt-4">Key Metrics</h3>
                      <ul className="list-disc pl-5 space-y-2 mt-2">
                        <li>28 counter-attacking goals (highest in the league)</li>
                        <li>Average time to shot after regaining possession: 8.4 seconds</li>
                        <li>Counter-pressing success rate: 68%</li>
                        <li>Average time to recover shape after losing possession: 3.2 seconds</li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted rounded-md p-4 flex items-center justify-center">
                      <p className="text-muted-foreground">Transition analysis visualization</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TeamStats;