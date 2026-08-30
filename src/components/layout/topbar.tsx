import { Link } from "@tanstack/react-router";
import { Bell, Menu, Sparkles } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarNav } from "./sidebar-nav";
import { BrandMark } from "./brand-mark";

export function Topbar() {
  return (
    <header className="border-border bg-card sticky top-0 z-40 border-b">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Sheet>
            <SheetTrigger
              className="hover:bg-accent grid size-9 shrink-0 place-items-center rounded-md lg:hidden"
              aria-label="Open navigation"
            >
              <Menu size={18} />
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="border-border border-b p-4">
                <BrandMark />
              </div>
              <SidebarNav />
            </SheetContent>
          </Sheet>

          <Link to="/dashboard" className="min-w-0 shrink-0">
            <BrandMark />
          </Link>

          <span className="border-primary/20 bg-brand-soft text-brand-strong text-caption hidden items-center gap-1.5 rounded-full border px-2.5 py-1 sm:inline-flex">
            <Sparkles size={11} aria-hidden />
            Qwen-Powered
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            className="hover:bg-accent relative grid size-9 place-items-center rounded-md"
            aria-label="Notifications, 2 unread"
          >
            <Bell size={17} />
            <span className="bg-alert absolute top-2 right-2 size-1.5 rounded-full" />
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="hover:bg-accent flex items-center gap-2 rounded-md p-1 pr-2"
              aria-label="Account menu"
            >
              <span className="bg-primary text-primary-foreground grid size-8 shrink-0 place-items-center rounded-full text-xs font-semibold">
                RK
              </span>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-xs font-semibold">Rohail Khan</span>
                <span className="text-muted-foreground block text-[11px]">
                  NUST Islamabad
                </span>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              <DropdownMenuLabel>demo@scriptgrade.pk</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/help">Help centre</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/login">Sign out</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
