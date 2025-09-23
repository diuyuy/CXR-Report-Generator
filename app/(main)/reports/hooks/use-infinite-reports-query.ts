import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { fetchReports } from "@/lib/apis/report-api";

const CURSOR = 10;

export const useInfiniteReportQuery = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.REPORT],
    queryFn: fetchReports,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < CURSOR) return null;

      return lastPageParam + CURSOR;
    },
    staleTime: 5 * 60 * 1000,
  });
};
