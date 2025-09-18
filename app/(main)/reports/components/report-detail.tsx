import Image from "next/image";
import { useParams } from "next/navigation";
import { ClipLoader } from "react-spinners";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { usePdfContext } from "../../contexts/use-pdf-context";
import { useReportDetailQuery } from "../hooks/use-report-detail-query";
import DiagnosisCard from "./diagnosis-card";
import PatientInformationCard from "./patient-information-card";
import ReportCard from "./report-card";

export default function ReportDetail() {
  const params = useParams();

  const reportId = params.reportId as string;
  const { isPending, isError, data: report } = useReportDetailQuery(reportId);
  const { pdfRef } = usePdfContext();

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
    <div ref={pdfRef} className="bg-[#070718] flex flex-col mx-14 gap-8">
      <div className="flex gap-8">
        <div className="flex-1 min-h-100 ">
          <Image
            src="/images/cxr_02.jpeg"
            alt="cxr_02"
            width={300}
            height={380}
          />
        </div>
        <div className="flex-1 flex flex-col gap-8">
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
    </div>
  );
}
