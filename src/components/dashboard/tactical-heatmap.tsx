import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeatmapData {
  x: number;
  y: number;
  value: number;
}

interface TacticalHeatmapProps {
  data: HeatmapData[];
  title?: string;
}

export function TacticalHeatmap({ data, title = "Tactical Heatmap" }: TacticalHeatmapProps) {
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

    // Draw heatmap
    drawHeatmap(ctx, data, canvas.width, canvas.height);
  }, [data]);

  const drawPitch = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Background
    ctx.fillStyle = "#0c4a2c";
    ctx.fillRect(0, 0, width, height);

    // Outline
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
    ctx.lineWidth = 1;
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

    // Add some texture/pattern to make it look more like grass
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };

  const drawHeatmap = (
    ctx: CanvasRenderingContext2D,
    data: HeatmapData[],
    width: number,
    height: number
  ) => {
    // Create a temporary canvas for the heatmap
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Draw heat points
    data.forEach((point) => {
      const gradient = tempCtx.createRadialGradient(
        point.x * width,
        point.y * height,
        0,
        point.x * width,
        point.y * height,
        width * 0.1
      );
      gradient.addColorStop(0, `rgba(255, 0, 0, ${point.value * 0.8})`);
      gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      tempCtx.fillStyle = gradient;
      tempCtx.beginPath();
      tempCtx.arc(point.x * width, point.y * height, width * 0.1, 0, Math.PI * 2);
      tempCtx.fill();
    });

    // Apply the heatmap to the main canvas with transparency
    ctx.globalAlpha = 0.7;
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.globalAlpha = 1.0;
  };

  return (
    <Card>
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