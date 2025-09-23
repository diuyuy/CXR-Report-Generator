import { type NextRequest, NextResponse } from "next/server";
import type { ReportTitle } from "@/app/(main)/types/types";
import reportsMock from "@/mock_data/my_reports.json";

const { reports } = reportsMock;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = Number(searchParams.get("page"));
  const size = Number(searchParams.get("size"));

  reports.sort((a, b) => (a.shootingDate > b.shootingDate ? -1 : 1));

  const reportTitles: ReportTitle[] = reports
    .slice(page, page + size)
    .map(({ reportId, shootingDate, patientPid, patientName }) => ({
      reportId,
      patientPid,
      patientName,
      shootingDate,
    }));

  return NextResponse.json(reportTitles);
}
