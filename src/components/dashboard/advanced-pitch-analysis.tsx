import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PassData {
  from: { x: number; y: number };
  to: { x: number; y: number };
  successful: boolean;
  player: string;
}

interface PressurePoint {
  x: number;
  y: number;
  intensity: number;
}

interface AdvancedPitchAnalysisProps {
  passes: PassData[];
  pressurePoints: PressurePoint[];
  title?: string;
}

export function AdvancedPitchAnalysis({ 
  passes, 
  pressurePoints, 
  title = "Advanced Pitch Analysis" 
}: AdvancedPitchAnalysisProps) {
  const passMapRef = useRef<HTMLCanvasElement>(null);
  const pressureMapRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    renderPassMap();
    renderPressureMap();
  }, [passes, pressurePoints]);

  const renderPassMap = () => {
    const canvas = passMapRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw pitch
    drawPitch(ctx, canvas.width, canvas.height);

    // Draw passes
    passes.forEach((pass) => {
      const fromX = pass.from.x * canvas.width;
      const fromY = pass.from.y * canvas.height;
      const toX = pass.to.x * canvas.width;
      const toY = pass.to.y * canvas.height;

      // Draw pass line
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.strokeStyle = pass.successful ? "rgba(46, 204, 113, 0.7)" : "rgba(231, 76, 60, 0.7)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw arrow head
      const angle = Math.atan2(toY - fromY, toX - fromX);
      const headLength = 10;
      
      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(
        toX - headLength * Math.cos(angle - Math.PI / 6),
        toY - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        toX - headLength * Math.cos(angle + Math.PI / 6),
        toY - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fillStyle = pass.successful ? "rgba(46, 204, 113, 0.9)" : "rgba(231, 76, 60, 0.9)";
      ctx.fill();
    });
  };

  const renderPressureMap = () => {
    const canvas = pressureMapRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw pitch
    drawPitch(ctx, canvas.width, canvas.height);

    // Create a temporary canvas for the pressure map
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext("2d");
    if (!tempCtx) return;

    // Draw pressure points
    pressurePoints.forEach((point) => {
      const gradient = tempCtx.createRadialGradient(
        point.x * canvas.width,
        point.y * canvas.height,
        0,
        point.x * canvas.width,
        point.y * canvas.height,
        canvas.width * 0.1
      );
      gradient.addColorStop(0, `rgba(241, 196, 15, ${point.intensity * 0.8})`);
      gradient.addColorStop(1, "rgba(241, 196, 15, 0)");

      tempCtx.fillStyle = gradient;
      tempCtx.beginPath();
      tempCtx.arc(
        point.x * canvas.width, 
        point.y * canvas.height, 
        canvas.width * 0.1, 
        0, 
        Math.PI * 2
      );
      tempCtx.fill();
    });

    // Apply the pressure map to the main canvas with transparency
    ctx.globalAlpha = 0.7;
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.globalAlpha = 1.0;
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="passes">
          <TabsList className="w-full">
            <TabsTrigger value="passes">Pass Map</TabsTrigger>
            <TabsTrigger value="pressure">Pressure Map</TabsTrigger>
          </TabsList>
          <TabsContent value="passes" className="mt-0">
            <div className="aspect-[16/9] w-full">
              <canvas
                ref={passMapRef}
                className="h-full w-full"
              />
            </div>
            <div className="p-4 flex items-center justify-center gap-6">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[rgba(46,204,113,0.7)] mr-2"></div>
                <span className="text-xs text-muted-foreground">Successful Pass</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[rgba(231,76,60,0.7)] mr-2"></div>
                <span className="text-xs text-muted-foreground">Failed Pass</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="pressure" className="mt-0">
            <div className="aspect-[16/9] w-full">
              <canvas
                ref={pressureMapRef}
                className="h-full w-full"
              />
            </div>
            <div className="p-4 flex items-center justify-center">
              <div className="w-full max-w-xs h-4 bg-gradient-to-r from-transparent to-[rgba(241,196,15,0.8)]"></div>
              <div className="flex justify-between w-full max-w-xs text-xs text-muted-foreground mt-1">
                <span>Low Pressure</span>
                <span>High Pressure</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}