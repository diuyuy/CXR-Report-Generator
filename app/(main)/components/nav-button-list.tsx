"use client";

import { ArrowDownToLineIcon, ChevronLeftIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { useNavViewStore } from "@/stores/use-nav-view-store";
import { usePdfContext } from "../contexts/use-pdf-context";
import { useIsReportDetail } from "../hooks/use-is-report-detail";
import { useReportDetailQuery } from "../reports/hooks/use-report-detail-query";

export default function NavButtonList() {
  const { activeView, setActiveView } = useNavViewStore();
  const { open } = useSidebar();

  const isChat = activeView === "Chat";
  const isReportDetail = useIsReportDetail();

  if (open) {
    return (
      <div className="overflow-hidden mb-8 px-1">
        {isReportDetail ? (
          <ReportDetailButtonList />
        ) : (
          <div className="flex justify-around items-center">
            <Button
              variant={isChat ? "tab" : "tab_disabled"}
              size={"tab"}
              className="font-medium text-lg"
              onClick={() => setActiveView("Chat")}
            >
              Chat
            </Button>
            <Button
              variant={isChat ? "tab_disabled" : "tab"}
              size={"tab"}
              className="font-medium text-lg"
              onClick={() => setActiveView("Report")}
            >
              Report
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => setActiveView("Chat")}
              asChild
            >
              <Link href={ROUTE_PATHS.CHATS}>
                <PlusIcon className="size-8" color="white" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex justify-center mb-8">
      {!isReportDetail && (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setActiveView("Chat")}
          asChild
        >
          <Link href={ROUTE_PATHS.CHATS}>
            <PlusIcon className="size-8" color="white" />
          </Link>
        </Button>
      )}
    </div>
  );
}

function ReportDetailButtonList() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.reportId as string;
  const { setActiveView } = useNavViewStore();
  const { handleDownloadPdf } = usePdfContext();

  const { isPending, isError, data: report } = useReportDetailQuery(reportId);

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Button variant={"ghost"} onClick={() => router.back()}>
          <ChevronLeftIcon color="white" className="size-7" />
          {isPending ? (
            <ClipLoader color="gray" />
          ) : isError ? (
            <span>{ERROR_MESSAGE.somethingWentWrong}</span>
          ) : (
            <span className="text-white text-lg">{`${report.patientPid} ${report.patientName}`}</span>
          )}
        </Button>
        <Button
          variant={"tab_disabled"}
          size={"tab"}
          className="font-medium text-lg"
          onClick={() => setActiveView("Chat")}
          asChild
        >
          <Link href={ROUTE_PATHS.CHATS}>Chat</Link>
        </Button>
        <Button variant={"tab"} size={"tab"} className="font-medium text-lg">
          Report
        </Button>
      </div>
      <Button variant={"ghost"} onClick={handleDownloadPdf}>
        <ArrowDownToLineIcon color="white" className="size-7" />
      </Button>
    </div>
  );
}
