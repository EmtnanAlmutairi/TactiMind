import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  Activity, 
  Gauge, 
  Radio, 
  Home 
} from "lucide-react";

export function AppSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-sidebar text-sidebar-foreground md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <BarChart3 className="h-6 w-6" />
          <span>Sports Analytics</span>
        </NavLink>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "transparent"
              )
            }
          >
            <Home className="h-4 w-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/match-analysis"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "transparent"
              )
            }
          >
            <BarChart3 className="h-4 w-4" />
            Match Analysis
          </NavLink>
          <NavLink
            to="/player-analysis"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "transparent"
              )
            }
          >
            <Users className="h-4 w-4" />
            Player Analysis
          </NavLink>
          <NavLink
            to="/team-stats"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "transparent"
              )
            }
          >
            <Activity className="h-4 w-4" />
            Team Statistics
          </NavLink>
          <NavLink
            to="/tactics"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "transparent"
              )
            }
          >
            <Gauge className="h-4 w-4" />
            Tactical Analysis
          </NavLink>
          <NavLink
            to="/live"
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-sidebar-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "transparent",
                "text-red-500 font-medium"
              )
            }
          >
            <Radio className="h-4 w-4" />
            Live Analysis
          </NavLink>
        </nav>
      </div>
      {/* Adjust layout to ensure sidebar is on the left and content is on the right */}
      <style jsx>{`
        .app-layout {
          display: flex;
          flex-direction: row;
        }
        .sidebar {
          flex-shrink: 0;
          width: ${isOpen ? "16rem" : "5rem"};
        }
        .content {
          flex-grow: 1;
          margin-left: ${isOpen ? "16rem" : "5rem"};
        }
      `}</style>
    </aside>
  );
}