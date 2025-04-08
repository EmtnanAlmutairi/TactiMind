import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PlayerPosition {
  number: number;
  name: string;
  position: string;
  x: number;
  y: number;
}

interface FormationProps {
  homeTeam: {
    name: string;
    formation: string;
    players: PlayerPosition[];
  };
  awayTeam: {
    name: string;
    formation: string;
    players: PlayerPosition[];
  };
}

export function TeamFormation({ homeTeam, awayTeam }: FormationProps) {
  const renderFormation = (players: PlayerPosition[], teamColor: string) => {
    return (
      <div className="relative h-[300px] w-full bg-[#0c4a2c] rounded-md overflow-hidden">
        {/* Field markings */}
        <div className="absolute inset-[5%] border-2 border-white/30"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30 -translate-x-1/2"></div>
        <div className="absolute left-1/2 top-1/2 h-16 w-16 rounded-full border-2 border-white/30 -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Penalty areas */}
        <div className="absolute left-[5%] top-[30%] h-[40%] w-[15%] border-2 border-white/30"></div>
        <div className="absolute right-[5%] top-[30%] h-[40%] w-[15%] border-2 border-white/30"></div>
        
        {/* Players */}
        {players.map((player) => (
          <div
            key={player.number}
            className="absolute flex flex-col items-center"
            style={{
              left: `${player.x * 100}%`,
              top: `${player.y * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div 
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white`}
              style={{ backgroundColor: teamColor }}
            >
              {player.number}
            </div>
            <div className="mt-1 text-center">
              <div className="text-xs font-medium text-white">{player.name}</div>
              <div className="text-[10px] text-white/70">{player.position}</div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Formation</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="home">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="home">{homeTeam.name} ({homeTeam.formation})</TabsTrigger>
            <TabsTrigger value="away">{awayTeam.name} ({awayTeam.formation})</TabsTrigger>
          </TabsList>
          <TabsContent value="home" className="mt-4">
            {renderFormation(homeTeam.players, "#3b82f6")}
          </TabsContent>
          <TabsContent value="away" className="mt-4">
            {renderFormation(awayTeam.players, "#ef4444")}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}