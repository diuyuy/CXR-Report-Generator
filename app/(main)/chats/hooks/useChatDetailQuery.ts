import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import patientsMocks from "../../../../mock_data/patients.json";
import sessionMocks from "../../../../mock_data/sessions.json";

const fetchChatDetail = async (chatId: string) => {
  const { sessions } = sessionMocks;
  const { patients } = patientsMocks;
  console.log(">>>>>>>>>>>>>>>>");

  const session = sessions.find((session) => session.id === chatId);
  if (!session) return session;

  const { patientName, ...rest } = session;
  const patient = patients.find((p) => p.name === patientName);
  if (!patient) return patient;

  const { id, gender, age } = patient;

  return { patient: { id, gender, age, patientName }, ...rest };
};

export const useChatDetailQuery = (id: string) => {
  console.log("sdfsdfsdfsdfafdjkaslfj;l");
  return useQuery({
    queryKey: [QUERY_KEYS.CHATS, id],
    queryFn: async () => await fetchChatDetail(id),
  });
};
