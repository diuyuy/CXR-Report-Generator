import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import reportsMock from "../../../../mock_data/reports.json";

const { reports } = reportsMock;

const fetchReportDetail = async (id: string) => {
  const report = reports.find((report) => report.reportId === id);

  if (!report) throw Error("The requested report does not exist.");

  return report;
};

export const useReportDetailQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REPORT, id],
    queryFn: async () => fetchReportDetail(id),
  });
};
