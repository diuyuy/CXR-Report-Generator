import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";

import reportsMock from "../../../../mock_data/reports.json";
import type { ReportTitle } from "../../types/types";

const { reports } = reportsMock;
const CURSOR = 10;

reports.sort((a, b) => (a.shootingDate > b.shootingDate ? -1 : 1));

const fetchReports = async ({ pageParam }: { pageParam: number }) => {
  const reportTitles: ReportTitle[] = reports
    .slice(pageParam, pageParam + CURSOR)
    .map(({ reportId, shootingDate, patientPid, patientName }) => ({
      reportId,
      patientPid,
      patientName,
      shootingDate,
    }));

  return reportTitles;
};

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
