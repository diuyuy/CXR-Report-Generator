import Image from "next/image";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import DiagnosisCard from "@/components/diagnosis-card";
import PatientInformationCard from "@/components/patient-information-card";
import ReportCard from "@/components/report-card";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { usePdfContext } from "../../contexts/use-pdf-context";
import type { ReportData } from "../../types/types";
import { useReportDetailQuery } from "../hooks/use-report-detail-query";
import { useReportMutation } from "../hooks/use-report-mutation";

const imgMap = (img: string) => {
  const n = Number(img[2]);

  switch (n % 3) {
    case 0:
      return "/images/cxr_01.jpg";
    case 1:
      return "/images/cxr_02.jpeg";
    default:
      return "/images/cxr_03.jpeg";
  }
};

export default function ReportDetail() {
  const params = useParams();

  const reportId = params.reportId as string;
  const { isPending, isError, data: report } = useReportDetailQuery(reportId);
  const mutation = useReportMutation(reportId);
  const { pdfRef } = usePdfContext();

  const handleUpdateReport = async (values: Partial<ReportData>) => {
    if (!report) return;

    const updatedReport = { ...report, ...values };

    await mutation.mutateAsync(updatedReport);
  };

  if (isPending) {
    return (
      <div className="flex justify-center">
        <ClipLoader color="gray" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="whitespace-pre-line text-center">
        {ERROR_MESSAGE.loadReportError}
      </p>
    );
  }
  return (
    <div ref={pdfRef} className="bg-[#070718] flex flex-col mx-16 gap-6">
      <div className="flex gap-8">
        <div className="flex-1 min-h-100 ">
          <Image
            src={imgMap(report.patientImage)}
            alt="cxr_02"
            width={300}
            height={380}
          />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <PatientInformationCard
            age={report.age}
            gender={report.gender}
            shootingDate={report.shootingDate}
            onUpdate={handleUpdateReport}
          />
          <DiagnosisCard
            disease={report.disease}
            location={report.location}
            size={report.size}
            symptoms={report.symptoms}
            onUpdate={handleUpdateReport}
          />
        </div>
      </div>
      <ReportCard
        title={"Brief summary"}
        content={report.briefSummary}
        propName="briefSummary"
        onUpdate={handleUpdateReport}
      />
      <ReportCard
        title={"Finding"}
        content={report.finding}
        propName="finding"
        onUpdate={handleUpdateReport}
      />
      <ReportCard
        title={"Recommendation"}
        content={report.recommendation}
        propName="recommendation"
        onUpdate={handleUpdateReport}
      />
      <ReportCard
        title={"Impression"}
        content={report.impression}
        propName="impression"
        onUpdate={handleUpdateReport}
      />
    </div>
  );
}
