import { type NextRequest, NextResponse } from "next/server";
import type { ReportData } from "@/app/(main)/types/types";
import reportMock from "@/mock_data/reports.json";

const { reports } = reportMock;

export async function GET(
  _: NextRequest,
  {
    params,
  }: {
    params: Promise<{ reportId: string }>;
  }
) {
  const { reportId } = await params;

  const report = reports.find((r) => r.reportId === reportId);

  if (!report) {
    return NextResponse.json(
      { message: "Report does not exists" },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(report);
}

export async function PATCH(req: NextRequest) {
  const updatedReport = (await req.json()) as ReportData;

  const idx = reports.findIndex(
    (report) => report.reportId === updatedReport.reportId
  );

  if (idx === -1) {
    return NextResponse.json(
      {
        message: "Report does not exist",
      },
      {
        status: 404,
      }
    );
  }

  reports[idx] = updatedReport;

  return NextResponse.json(updatedReport);
}
