export type Message = {
  messageId: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createDate: string;
  messageImages?: string[];
};

export type Session = {
  id: string;
  patientName: string;
  contentSummary: string;
  createDate: string;
  messages: Message[];
};

export type ChatSummary = {
  id: string;
  createDate: string;
  contentSummary: string;
};
