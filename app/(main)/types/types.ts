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

export type ReportData = {
  reportId: string;
  patientName: string;
  patientPid: string;
  examDate: string;
  age: number;
  gender: "남" | "여";
  shootingDate: string;
  disease: string;
  location: string;
  size: string;
  symptoms: string;
  briefSummary: string;
  finding: string;
  recommendation: string;
  impression: string;
  patientImage: string;
};

export type ReportTitle = Pick<
  ReportData,
  "reportId" | "patientPid" | "patientName" | "shootingDate"
>;

export type PatientImage = {
  id: string;
  filename: string;
  date: string;
};

type Diagnosis = {
  disease: string;
  location: string;
  size: string;
  symptoms: string;
  finding: string;
  summary: string;
};

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: string;
  shootingDate: string;
  images: PatientImage[];
  diagnosis: Diagnosis;
};
