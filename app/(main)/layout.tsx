"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MainHeader from "./components/main-header";
import MainSidebar from "./components/main-navbar";

export default function MainLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const sidebarWidth = pathname.startsWith("/chats") ? "22rem" : "22rem"; //TODO: 변경 필요

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": sidebarWidth,
        } as React.CSSProperties
      }
    >
      <MainSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <MainHeader />
          <Separator />
          <div className="flex-1 overflow-hidden">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
