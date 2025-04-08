import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RadarStat {
  name: string;
  value: number;
  maxValue: number;
}

interface PerformanceRadarProps {
  stats: RadarStat[];
  title?: string;
  playerName?: string;
  teamColor?: string;
}

export function PerformanceRadar({ 
  stats, 
  title = "Performance Radar", 
  playerName,
  teamColor = "#3b82f6" 
}: PerformanceRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    drawRadarChart(ctx, canvas.width, canvas.height);
  }, [stats, teamColor]);

  const drawRadarChart = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;
    
    const numStats = stats.length;
    const angleStep = (Math.PI * 2) / numStats;

    // Draw background
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, width, height);

    // Draw radar grid
    for (let level = 1; level <= 5; level++) {
      const levelRadius = (radius * level) / 5;
      
      ctx.beginPath();
      for (let i = 0; i < numStats; i++) {
        const angle = i * angleStep - Math.PI / 2; // Start from top
        const x = centerX + levelRadius * Math.cos(angle);
        const y = centerY + levelRadius * Math.sin(angle);
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.stroke();
    }

    // Draw radar axes
    for (let i = 0; i < numStats; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
      ctx.stroke();
      
      // Draw stat labels
      const labelX = centerX + (radius + 20) * Math.cos(angle);
      const labelY = centerY + (radius + 20) * Math.sin(angle);
      
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Adjust label position based on angle
      let adjustedLabelX = labelX;
      let adjustedLabelY = labelY;
      
      if (angle === -Math.PI / 2) { // Top
        adjustedLabelY -= 5;
      } else if (angle === Math.PI / 2) { // Bottom
        adjustedLabelY += 5;
      } else if (angle === 0) { // Right
        adjustedLabelX += 5;
      } else if (angle === Math.PI) { // Left
        adjustedLabelX -= 5;
      }
      
      ctx.fillText(stats[i].name, adjustedLabelX, adjustedLabelY);
    }

    // Draw player data
    ctx.beginPath();
    for (let i = 0; i < numStats; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const value = stats[i].value / stats[i].maxValue; // Normalize to 0-1
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.fillStyle = `${teamColor}33`; // Add transparency
    ctx.fill();
    ctx.strokeStyle = teamColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data points
    for (let i = 0; i < numStats; i++) {
      const angle = i * angleStep - Math.PI / 2; // Start from top
      const value = stats[i].value / stats[i].maxValue; // Normalize to 0-1
      const x = centerX + radius * value * Math.cos(angle);
      const y = centerY + radius * value * Math.sin(angle);
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = teamColor;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw player name in center if provided
    if (playerName) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(playerName, centerX, centerY);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="aspect-square w-full">
          <canvas
            ref={canvasRef}
            className="h-full w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
}