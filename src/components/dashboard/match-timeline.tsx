import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: number;
  time: number;
  type: "goal" | "card" | "substitution" | "foul" | "shot" | "save";
  team: "home" | "away";
  player: string;
  description: string;
}

interface MatchTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export function MatchTimeline({ events, className }: MatchTimelineProps) {
  const getEventIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "goal":
        return "⚽";
      case "card":
        return "🟨";
      case "substitution":
        return "🔄";
      case "foul":
        return "🥊";
      case "shot":
        return "👟";
      case "save":
        return "🧤";
      default:
        return "•";
    }
  };

  const getEventColor = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "goal":
        return "bg-emerald-500";
      case "card":
        return "bg-amber-500";
      case "substitution":
        return "bg-blue-500";
      case "foul":
        return "bg-red-500";
      case "shot":
        return "bg-purple-500";
      case "save":
        return "bg-cyan-500";
      default:
        return "bg-gray-500";
    }
  };

  // Sort events by time
  const sortedEvents = [...events].sort((a, b) => a.time - b.time);

  return (
    <Card className={cn("col-span-1", className)}>
      <CardHeader>
        <CardTitle>Match Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute left-2.5 top-0 h-full w-px bg-border" />

          {sortedEvents.map((event) => (
            <div key={event.id} className="mb-4 last:mb-0">
              <div className="flex items-start">
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background",
                    getEventColor(event.type)
                  )}
                />
                
                {/* Event content */}
                <div className="ml-2 flex flex-col">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{event.time}'</span>
                    <span className="ml-2 text-lg">{getEventIcon(event.type)}</span>
                    <span className={cn(
                      "ml-2 text-sm font-medium",
                      event.team === "home" ? "text-blue-500" : "text-red-500"
                    )}>
                      {event.player}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}