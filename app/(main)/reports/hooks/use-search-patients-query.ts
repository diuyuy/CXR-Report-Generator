import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { fetchPatientsByQuery } from "@/lib/apis/patient-api";

export const useSearchPatientsQuery = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_PATIENTS, query],
    queryFn: () => fetchPatientsByQuery(query),
  });
};
