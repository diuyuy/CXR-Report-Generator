import type { ReportData, ReportTitle } from "@/app/(main)/types/types";

const baseUrl = "http://localhost:3000/api";

export const fetchReports = async ({ pageParam }: { pageParam: number }) => {
  const response = await fetch(
    `${baseUrl}/reports?page=${pageParam}&size=${10}`
  );

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return (await response.json()) as ReportTitle[];
};

export const fetchReportDetail = async (id: string) => {
  const response = await fetch(`${baseUrl}/reports/${id}`);

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return (await response.json()) as ReportData;
};

export const updateReport = async (report: ReportData) => {
  const response = await fetch(`${baseUrl}/reports/${report.reportId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(report),
  });

  if (!response.ok) {
    const data = await response.json();

    throw new Error(data.message);
  }

  return (await response.json()) as ReportData;
};

export const generatePdf = async (reportId: string) => {
  const response = await fetch(`${baseUrl}/generate-pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pdfUrl: `${baseUrl.substring(0, baseUrl.length - 4)}/pdfs/${reportId}`,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw Error(data.message);
  }

  return response.blob();
};
