"use client";

import ChatsList from "@/app/(main)/chats/components/chats-list";
import { useIsReportDetail } from "@/app/(main)/hooks/use-is-report-detail";
import ReportDetail from "@/app/(main)/reports/components/report-detail";
import ReportsList from "@/app/(main)/reports/components/reports-list";
import { useNavViewStore } from "@/stores/use-nav-view-store";

export default function NavbarContents() {
  const { activeView } = useNavViewStore();
  const isReportDetail = useIsReportDetail();

  const isChat = activeView === "Chat";

  return (
    <div className="mb-5">
      {isChat ? (
        <ChatsList />
      ) : isReportDetail ? (
        <ReportDetail />
      ) : (
        <ReportsList />
      )}
    </div>
  );
}
