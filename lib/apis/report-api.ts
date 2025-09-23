import reportsMock from "@/mock_data/my_reports.json";

const { reports } = reportsMock;
const baseUrl = "http://localhost:3000";

export const fetchReportDetail = async (id: string) => {
  const report = reports.find((report) => report.reportId === id);

  if (!report) throw Error("The requested report does not exist.");

  return report;
};

export const generatePdf = async (reportId: string) => {
  const response = await fetch(`${baseUrl}/api/generate-pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pdfUrl: `${baseUrl}/pdfs/${reportId}`,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw Error(data.message);
  }

  return response.blob();
};
