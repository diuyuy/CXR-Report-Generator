import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Report } from "../../types/types";

type Props = Pick<Report, "disease" | "location" | "size" | "symptoms">;

export default function DiagnosisCard({
  disease,
  location,
  size,
  symptoms,
}: Props) {
  return (
    <div className="report-card min-h-48 flex flex-col justify-between">
      <div className="flex justify-between">
        <p className="text-base font-medium">Patient Information</p>
        <Button variant={"ghost"} size={"icon"}>
          <PencilIcon />
        </Button>
      </div>
      <ul className="list-disc list-inside">
        <li>Disease: {disease}</li>
        <li>Location: {location}</li>
        <li>Size: {size}</li>
        <li>Symptoms: {symptoms}</li>
      </ul>
      <div />
    </div>
  );
}
