import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { fetchReportDetail } from "@/lib/apis/report-api";

export const useReportDetailQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REPORT, id],
    queryFn: async () => fetchReportDetail(id),
  });
};
