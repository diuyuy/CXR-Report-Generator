const baseUrl = "http://localhost:3000/api";

export const fetchChatByReportId = async (reportId: string) => {
  const response = await fetch(`${baseUrl}/reports/${reportId}/chats`);

  if (!response.ok) {
    throw Error("Something went wrong");
  }

  return (await response.json()) as {
    id: string;
    contentSummary: string;
    createDate: string;
    messages: (
      | {
          messageId: string;
          role: string;
          content: string;
          createDate: string;
          messageImages: string[];
        }
      | {
          messageId: string;
          role: string;
          content: string;
          createDate: string;
          messageImages?: undefined;
        }
    )[];
    patient: {
      id: string;
      gender: string;
      age: number;
      patientName: string;
    };
  };
};
