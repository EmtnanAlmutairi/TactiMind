import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ComparisonData {
  name: string;
  team1Value: number;
  team2Value: number;
}

interface TeamComparisonProps {
  data: ComparisonData[];
  team1Name: string;
  team2Name: string;
  team1Color?: string;
  team2Color?: string;
  title?: string;
}

export function ComparisonChart({
  data,
  team1Name,
  team2Name,
  team1Color = "#3b82f6",
  team2Color = "#ef4444",
  title = "Team Comparison"
}: TeamComparisonProps) {
  // Prepare data for horizontal chart
  const horizontalData = data.map(item => ({
    name: item.name,
    [team1Name]: item.team1Value,
    [team2Name]: item.team2Value
  }));

  // Prepare data for radar chart
  const radarData = data.map(item => ({
    subject: item.name,
    [team1Name]: item.team1Value,
    [team2Name]: item.team2Value,
    fullMark: Math.max(item.team1Value, item.team2Value) * 1.2
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="horizontal">Horizontal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bar" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={horizontalData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1a1a2e", 
                    borderColor: "#333", 
                    color: "#fff" 
                  }} 
                />
                <Legend />
                <Bar dataKey={team1Name} fill={team1Color} />
                <Bar dataKey={team2Name} fill={team2Color} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="horizontal" className="pt-4">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                layout="vertical"
                data={horizontalData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 60,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1a1a2e", 
                    borderColor: "#333", 
                    color: "#fff" 
                  }} 
                />
                <Legend />
                <Bar dataKey={team1Name} fill={team1Color} />
                <Bar dataKey={team2Name} fill={team2Color} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}