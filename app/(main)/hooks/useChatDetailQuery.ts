import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import sessionMocks from "../../../mock_data/sessions.json";

const fetchChatDetail = (id: string) => {
  const { sessions } = sessionMocks;

  return sessions.find((session) => session.id === id);
};

export const useChatDetailQuery = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHATS, id],
    queryFn: () => fetchChatDetail(id),
  });
};
