"use client";

import { ArrowDownToLineIcon, ChevronLeftIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "sonner";
import { useIsReportDetail } from "@/app/(main)/hooks/use-is-report-detail";
import { useReportDetailQuery } from "@/app/(main)/reports/hooks/use-report-detail-query";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { generatePdf } from "@/lib/apis/report-api";
import { useNavViewStore } from "@/stores/use-nav-view-store";
import CustomClipLoader from "./custom-clip-loader";

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
  const [isDownloading, setIsDownloading] = useState(false);
  // const { handleDownloadPdf } = usePdfContext();

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const blob = await generatePdf(reportId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;

      // 4. 다운로드할 파일 이름을 지정합니다.
      a.download = "generated-document.pdf";

      // 5. <a> 태그를 body에 추가하고 클릭 이벤트를 실행합니다.
      document.body.appendChild(a);
      a.click();

      // 6. 사용이 끝난 객체와 <a> 태그를 정리합니다.
      a.remove();

      URL.revokeObjectURL(url);
      setIsDownloading(false);
    } catch (_) {
      setIsDownloading(false);
      toast.error(ERROR_MESSAGE.generatePdfError);
    }
  };

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
      {isDownloading ? (
        <CustomClipLoader />
      ) : (
        <Button variant={"ghost"} onClick={handleDownloadPdf}>
          <ArrowDownToLineIcon color="white" className="size-7" />
        </Button>
      )}
    </div>
  );
}
