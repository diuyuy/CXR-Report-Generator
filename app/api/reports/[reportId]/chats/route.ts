import { type NextRequest, NextResponse } from "next/server";
import reportMock from "@/mock_data/my_reports.json";
import patientMock from "@/mock_data/patients.json";
import sessionMock from "@/mock_data/sessions.json";

const { reports } = reportMock;
const { patients } = patientMock;
const { sessions } = sessionMock;

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ reportId: string }> }
) {
  const { reportId } = await params;

  const report = reports.find((r) => r.reportId === reportId);

  if (!report) {
    return NextResponse.json(
      {
        message: "Rport does not exist",
      },
      { status: 404 }
    );
  }

  const session = sessions.find((s) => s.patientName === report.patientName);

  if (!session) {
    return NextResponse.json(
      {
        message: "Session does not exist",
      },
      { status: 404 }
    );
  }
  const { patientName, ...rest } = session;

  const patient = patients.find((p) => p.name === patientName);
  if (!patient) {
    return NextResponse.json(
      {
        message: "Patient does not exist",
      },
      { status: 404 }
    );
  }

  const { id, age, gender } = patient;

  return NextResponse.json({ patient: { id, age, gender }, ...rest });
}
