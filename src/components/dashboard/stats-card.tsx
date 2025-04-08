import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className,
}: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
        {trend && trendValue && (
          <div className="mt-2 flex items-center text-xs">
            <span
              className={cn(
                "mr-1",
                trend === "up" && "text-emerald-500",
                trend === "down" && "text-rose-500"
              )}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
            </span>
            <span
              className={cn(
                trend === "up" && "text-emerald-500",
                trend === "down" && "text-rose-500"
              )}
            >
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}