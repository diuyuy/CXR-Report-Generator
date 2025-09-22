import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";

import patientsMock from "../../../mock_data/patients.json";

const { patients } = patientsMock;

const CURSOR = 15;

const fetchPatients = async ({ pageParam }: { pageParam: number }) => {
  return patients.slice(pageParam, pageParam + CURSOR);
};

export const useInfinitePatientQuery = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.PATIENTS],
    queryFn: fetchPatients,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < CURSOR) return null;

      return lastPageParam + CURSOR;
    },
  });
};
