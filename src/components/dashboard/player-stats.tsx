import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Stat {
  name: string;
  value: number;
  max: number;
  color?: string;
}

interface PlayerStatsProps {
  player: {
    id: number;
    name: string;
    position: string;
    number: number;
    team: string;
    image?: string;
  };
  stats: Stat[];
  className?: string;
}

export function PlayerStats({ player, stats, className }: PlayerStatsProps) {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="pb-2">
        <CardTitle>Player Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-16 w-16 border-2 border-primary">
            <AvatarImage src={player.image} alt={player.name} />
            <AvatarFallback className="text-lg">{player.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-bold">{player.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="mr-2">{player.position}</span>
              <span className="mr-2">•</span>
              <span>#{player.number}</span>
              <span className="mx-2">•</span>
              <span>{player.team}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {stats.map((stat) => (
            <div key={stat.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{stat.name}</span>
                <span className="text-sm text-muted-foreground">
                  {stat.value}/{stat.max}
                </span>
              </div>
              <Progress 
                value={(stat.value / stat.max) * 100} 
                className={cn(
                  "h-2",
                  stat.color ? `bg-${stat.color}-100` : ""
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}