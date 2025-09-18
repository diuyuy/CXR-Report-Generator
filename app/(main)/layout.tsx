"use client";

import type { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MainHeader from "./components/main-header";
import MainSidebar from "./components/main-navbar";
import PdfProvider from "./contexts/pdf-context-provider";
import { useIsReportDetail } from "./hooks/use-is-report-detail";

export default function MainLayout({ children }: PropsWithChildren) {
  const isReportDetail = useIsReportDetail();

  const sidebarWidth = isReportDetail ? "48rem" : "22rem"; //TODO: 변경 필요

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": sidebarWidth,
        } as React.CSSProperties
      }
    >
      <PdfProvider>
        <MainSidebar />
        <SidebarInset>
          <div className="flex flex-col h-screen">
            <MainHeader />
            <Separator />
            <div className="flex-1 overflow-hidden">{children}</div>
          </div>
        </SidebarInset>
      </PdfProvider>
    </SidebarProvider>
  );
}
