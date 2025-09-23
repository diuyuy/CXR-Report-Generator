import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { updateReport } from "@/lib/apis/report-api";

export const useReportMutation = (reportId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.REPORT, reportId],
    mutationFn: updateReport,
    onSuccess: (updatedReport) => {
      queryClient.setQueryData([QUERY_KEYS.REPORT, reportId], updatedReport);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.REPORT],
        exact: true,
      });
    },
  });
};
