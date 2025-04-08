import { 
  BarChart3, 
  Home, 
  Users, 
  Activity, 
  Calendar, 
  Settings, 
  TrendingUp,
  Zap,
  Layers
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Match Analysis",
    url: "/match-analysis",
    icon: Activity,
  },
  {
    title: "Player Analysis",
    url: "/player-analysis",
    icon: Users,
  },
  {
    title: "Team Stats",
    url: "/team-stats",
    icon: BarChart3,
  },
  {
    title: "Fixtures",
    url: "/fixtures",
    icon: Calendar,
  },
  {
    title: "Tactics",
    url: "/tactics",
    icon: Layers,
  },
  {
    title: "Performance",
    url: "/performance",
    icon: TrendingUp,
  },
  {
    title: "Live Analysis",
    url: "/live",
    icon: Zap,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  
  return (
    <Sidebar className="border-r bg-card">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">PlayStat</span>
        </Link>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={location.pathname === item.url ? "bg-accent text-accent-foreground" : ""}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}