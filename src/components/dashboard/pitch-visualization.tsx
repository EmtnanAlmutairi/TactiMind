import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Player {
  id: number;
  name: string;
  position: string;
  x: number;
  y: number;
  team: "home" | "away";
  number: number;
}

interface PitchVisualizationProps {
  players: Player[];
  title?: string;
}

export function PitchVisualization({ players, title = "Pitch Visualization" }: PitchVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw pitch
    drawPitch(ctx, canvas.width, canvas.height);

    // Draw players
    players.forEach((player) => {
      drawPlayer(
        ctx,
        player.x * canvas.width,
        player.y * canvas.height,
        player.team === "home" ? "#3b82f6" : "#ef4444",
        player.number.toString()
      );
    });
  }, [players]);

  const drawPitch = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Background
    ctx.fillStyle = "#0c4a2c";
    ctx.fillRect(0, 0, width, height);

    // Outline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 2;
    ctx.strokeRect(width * 0.05, height * 0.05, width * 0.9, height * 0.9);

    // Center line
    ctx.beginPath();
    ctx.moveTo(width / 2, height * 0.05);
    ctx.lineTo(width / 2, height * 0.95);
    ctx.stroke();

    // Center circle
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, height * 0.1, 0, Math.PI * 2);
    ctx.stroke();

    // Penalty areas
    // Left
    ctx.strokeRect(width * 0.05, height * 0.3, width * 0.15, height * 0.4);
    // Right
    ctx.strokeRect(width * 0.8, height * 0.3, width * 0.15, height * 0.4);

    // Goal areas
    // Left
    ctx.strokeRect(width * 0.05, height * 0.4, width * 0.05, height * 0.2);
    // Right
    ctx.strokeRect(width * 0.9, height * 0.4, width * 0.05, height * 0.2);

    // Penalty spots
    ctx.beginPath();
    ctx.arc(width * 0.15, height / 2, 3, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.beginPath();
    ctx.arc(width * 0.85, height / 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Center spot
    ctx.beginPath();
    ctx.arc(width / 2, height / 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Add some texture/pattern to make it look more like grass
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  const drawPlayer = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    number: string
  ) => {
    // Player circle
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Player number
    ctx.fillStyle = "white";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(number, x, y);
  };

  return (
    <Card className="col-span-2 overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-[16/9] w-full">
          <canvas
            ref={canvasRef}
            className="h-full w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}