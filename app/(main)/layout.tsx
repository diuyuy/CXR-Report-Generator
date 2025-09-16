"use client";

import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MainHeader from "./components/main_header";
import MainSidebar from "./components/main_navbar";
import NavbarTrigger from "./components/navbar-trigger";

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
        <div className="hd-height flex justify-between items-center">
          <div className="flex-1">
            <NavbarTrigger />
          </div>
          <MainHeader />
        </div>
        <Separator />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
