import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  FileStack,
  HelpCircle,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/exam/upload", label: "Exams", icon: FileStack },
  { to: "/exam/grade", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/help", label: "Help", icon: HelpCircle },
] as const;

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Main" className="flex flex-col gap-1 p-3">
      {navItems.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
          )}
          activeProps={{
            className: "bg-accent text-accent-foreground",
            "aria-current": "page",
          }}
        >
          <item.icon size={16} className="shrink-0" aria-hidden />
          <span className="min-w-0 truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}
