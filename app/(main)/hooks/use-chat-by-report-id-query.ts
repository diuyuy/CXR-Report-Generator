import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { fetchChatByReportId } from "@/lib/apis/chat-api";

export const useChatByReportIdQuery = (reportId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CHATS, { reportId }],
    queryFn: async () => fetchChatByReportId(reportId),
  });
};
