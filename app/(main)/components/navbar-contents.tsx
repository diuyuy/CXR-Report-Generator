"use client";

import { useNavViewStore } from "@/stores/use-nav-view-store";
import ChatsList from "../chats/components/chats-list";
import { useIsReportDetail } from "../hooks/use-is-report-detail";
import ReportDetail from "../reports/components/report-detail";
import ReportsList from "../reports/components/reports-list";

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
