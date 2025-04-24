import { Header } from "@/components/layout/header";
import { MainSidebar } from "@/components/layout/main-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdvancedPitchAnalysis } from "@/components/dashboard/advanced-pitch-analysis";
import { TeamFormation } from "@/components/dashboard/team-formation";
import { TacticalHeatmap } from "@/components/dashboard/tactical-heatmap";
import { PerformanceRadar } from "@/components/dashboard/performance-radar";

const Tactics = () => {
  // Sample pass data
  const passes = [
    { from: { x: 0.2, y: 0.3 }, to: { x: 0.4, y: 0.2 }, successful: true, player: "Robertson" },
    { from: { x: 0.4, y: 0.2 }, to: { x: 0.6, y: 0.3 }, successful: true, player: "Henderson" },
    { from: { x: 0.6, y: 0.3 }, to: { x: 0.8, y: 0.4 }, successful: false, player: "Salah" },
    { from: { x: 0.2, y: 0.5 }, to: { x: 0.4, y: 0.5 }, successful: true, player: "Van Dijk" },
    { from: { x: 0.4, y: 0.5 }, to: { x: 0.6, y: 0.6 }, successful: true, player: "Thiago" },
    { from: { x: 0.6, y: 0.6 }, to: { x: 0.8, y: 0.7 }, successful: true, player: "Mane" },
    { from: { x: 0.2, y: 0.7 }, to: { x: 0.4, y: 0.8 }, successful: true, player: "Gomez" },
    { from: { x: 0.4, y: 0.8 }, to: { x: 0.6, y: 0.7 }, successful: false, player: "Keita" },
    { from: { x: 0.3, y: 0.4 }, to: { x: 0.5, y: 0.3 }, successful: true, player: "Henderson" },
    { from: { x: 0.5, y: 0.3 }, to: { x: 0.7, y: 0.2 }, successful: true, player: "Salah" },
    { from: { x: 0.7, y: 0.2 }, to: { x: 0.9, y: 0.3 }, successful: false, player: "Firmino" },
  ];

  // Sample pressure points
  const pressurePoints = [
    { x: 0.75, y: 0.3, intensity: 0.9 },
    { x: 0.8, y: 0.4, intensity: 0.8 },
    { x: 0.7, y: 0.5, intensity: 0.7 },
    { x: 0.75, y: 0.6, intensity: 0.8 },
    { x: 0.8, y: 0.7, intensity: 0.9 },
    { x: 0.65, y: 0.35, intensity: 0.6 },
    { x: 0.6, y: 0.45, intensity: 0.5 },
    { x: 0.65, y: 0.55, intensity: 0.6 },
    { x: 0.6, y: 0.65, intensity: 0.5 },
  ];

  // Sample heatmap data
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

  // Sample formation data
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

  // Sample radar stats
  const teamStats = [
    { name: "Possession", value: 65, maxValue: 100 },
    { name: "Shots", value: 18, maxValue: 25 },
    { name: "Pass Accuracy", value: 88, maxValue: 100 },
    { name: "Tackles", value: 22, maxValue: 30 },
    { name: "Interceptions", value: 15, maxValue: 25 },
    { name: "Aerial Duels", value: 12, maxValue: 20 },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <MainSidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="p-6 pl-72 space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Tactical Analysis</h1>
            <p className="text-muted-foreground">
              Advanced tactical insights and pattern analysis
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <AdvancedPitchAnalysis 
              passes={passes} 
              pressurePoints={pressurePoints} 
              title="Pass & Pressure Analysis"
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Tactical Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="attacking">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="attacking">Attacking</TabsTrigger>
                    <TabsTrigger value="defensive">Defensive</TabsTrigger>
                    <TabsTrigger value="transitions">Transitions</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="attacking" className="mt-4 space-y-4">
                    <h3 className="text-lg font-semibold">Attacking Patterns</h3>
                    <p>
                      Liverpool's attack focuses on quick transitions and exploiting the wide areas, particularly targeting the space behind the opposition fullbacks. The front three frequently interchange positions to create confusion in the defensive line.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-4">Key Observations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Fullbacks provide width and crossing opportunities (12 crosses from advanced positions)</li>
                      <li>Central midfielders rotate to maintain possession (88% pass completion rate)</li>
                      <li>Front three create overloads in half-spaces</li>
                      <li>Quick switches of play to exploit open spaces (7 successful switches)</li>
                      <li>High press forces turnovers in dangerous areas (8 high turnovers)</li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="defensive" className="mt-4 space-y-4">
                    <h3 className="text-lg font-semibold">Defensive Structure</h3>
                    <p>
                      Liverpool maintains a compact 4-3-3 shape when defending, with the midfield three staying narrow to prevent central progression. The fullbacks position themselves higher to press opposition wide players early.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-4">Key Observations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>High defensive line with offside trap (caught opposition offside 4 times)</li>
                      <li>Aggressive counter-pressing after losing possession (recovered within 5 seconds 14 times)</li>
                      <li>Center-backs excellent in aerial duels (won 8/10 aerial challenges)</li>
                      <li>Midfield three provide central cover and block passing lanes</li>
                      <li>Forwards actively participate in the press (12 successful pressures in final third)</li>
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="transitions" className="mt-4 space-y-4">
                    <h3 className="text-lg font-semibold">Transition Moments</h3>
                    <p>
                      Liverpool excels in transition moments, with quick counter-pressing after losing possession and rapid forward progression when winning the ball. The team's coordinated movements allow them to exploit opposition disorganization.
                    </p>
                    
                    <h3 className="text-lg font-semibold mt-4">Key Observations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Counter-pressing recovered possession within 5 seconds on 14 occasions</li>
                      <li>Average time to shot after regaining possession: 8.4 seconds</li>
                      <li>Vertical passes to bypass opposition midfield (15 successful vertical passes)</li>
                      <li>Quick player movement to create passing options after winning possession</li>
                      <li>Fullbacks quickly transitioning between attack and defense roles</li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TeamFormation 
              homeTeam={homeFormation} 
              awayTeam={alternativeFormation} 
            />
            
            <PerformanceRadar 
              stats={teamStats}
              title="Team Performance Radar"
              playerName="Liverpool FC"
              teamColor="#ef4444"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <TacticalHeatmap 
              data={heatmapData} 
              title="Attacking Third Heatmap"
            />
            
            <Card>
              <CardHeader>
                <CardTitle>Opposition Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Weaknesses to Exploit</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">High Line Vulnerability:</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Opposition defense plays a high line that can be exploited with through balls behind the fullbacks. Target the space between center-back and fullback with diagonal runs.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Pressing Triggers:</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Opposition presses aggressively when the ball is played to a fullback facing their own goal. Use this as a pressing trigger to draw them out and exploit the space behind.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Set Piece Vulnerability:</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Opposition struggles with defending second balls from set pieces. Focus on creating chaos in the box and having players positioned for rebounds.
                      </p>
                    </li>
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-4">Threats to Neutralize</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <span className="font-medium">Counter-Attacking Speed:</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Opposition has pace on the wings and transitions quickly. Maintain defensive shape during attacking phases and ensure counter-press is effective.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium">Creative Midfielder:</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Player #8 is their primary creator with 5 key passes per game. Assign defensive midfielder to track his movements and limit time on the ball.
                      </p>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Tactics;