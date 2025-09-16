import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { formatDate } from "@/lib/utils";
import sessionMocks from "../../../../mock_data/sessions.json";

type ChatSummary = {
  id: string;
  summary: string;
};

const fetchChats = async () => {
  const { sessions } = sessionMocks;
  console.log(sessions.map((s) => s.id));
  const dateMap: { [key: string]: ChatSummary[] } = {};
  sessions.forEach((session) => {
    const date = formatDate(session.createDate);
    if (!dateMap[date]) {
      dateMap[date] = [];
    }
    dateMap[date].push({
      id: session.id,
      summary: session.contentSummary,
    });
  });
  console.log(dateMap);
  return dateMap;
};

// TODO: 무한 스크롤로 변경 필요

export const useChatsQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHATS],
    queryFn: fetchChats,
    staleTime: Infinity,
  });
};
