import type { ReactNode } from "react";
import { Topbar } from "./topbar";
import { SidebarNav } from "./sidebar-nav";
import { BrandMark } from "./brand-mark";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background min-h-screen">
      <Topbar />
      <div className="flex">
        <aside className="border-border bg-sidebar sticky top-[65px] hidden h-[calc(100vh-65px)] w-56 shrink-0 border-r lg:block">
          <SidebarNav />
          <div className="border-border text-caption text-muted-foreground absolute inset-x-0 bottom-0 border-t p-4">
            <BrandMark showWordmark={false} className="mb-2" />
            Alibaba Cloud AI Hackathon · 2026
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
