import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import sessionMocks from "../../../../mock_data/sessions.json";

const { sessions } = sessionMocks;

const CURSOR = 10;

const fetchChats = async ({ pageParam }: { pageParam: number }) => {
  return sessions
    .slice(pageParam, pageParam + CURSOR)
    .map(({ id, createDate, contentSummary }) => ({
      id,
      createDate,
      contentSummary,
    }));
};

export const useInfiniteChatsQuery = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.CHATS],
    queryFn: fetchChats,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length < CURSOR) {
        return null;
      }

      return lastPageParam + CURSOR;
    },
  });
};
