import Image from "next/image";
import DiagnosisCard from "@/components/diagnosis-card";
import PatientInformationCard from "@/components/patient-information-card";
import ReportCard from "@/components/report-card";
import { fetchReportDetail } from "@/lib/apis/report-api";
import { imageUrlMap } from "@/lib/utils";

type Props = {
  params: Promise<{ reportId: string }>;
};

export default async function ReportPdfPage({ params }: Props) {
  const { reportId } = await params;

  const report = await fetchReportDetail(reportId);

  return (
    <main className="py-4 p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold mb-4">Report</h1>
        <div className="flex gap-8">
          <div className="flex-1 min-h-100 ">
            <Image
              src={imageUrlMap(report.patientImage)}
              alt={imageUrlMap(report.patientImage)}
              width={300}
              height={380}
            />
          </div>
          <div className="flex-1 flex flex-col gap-6">
            <PatientInformationCard
              age={report.age}
              gender={report.gender}
              shootingDate={report.shootingDate}
            />
            <DiagnosisCard
              disease={report.disease}
              location={report.location}
              size={report.size}
              symptoms={report.symptoms}
            />
          </div>
        </div>
        <ReportCard title={"Brief summary"} content={report.briefSummary} />
        <ReportCard title={"Finding"} content={report.finding} />
        <ReportCard title={"Recommendation"} content={report.recommendation} />
        <ReportCard title={"Impression"} content={report.impression} />
      </div>
    </main>
  );
}
