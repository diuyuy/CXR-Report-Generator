"use client";

import { PencilIcon } from "lucide-react";
import { useState } from "react";
import DiseaseBagde from "@/app/(main)/components/disease-badge";
import type { Report } from "@/app/(main)/types/types";
import { Button } from "@/components/ui/button";
import { Form } from "./ui/form";

type Props = Pick<Report, "disease" | "location" | "size" | "symptoms">;

export default function DiagnosisCard({
  disease,
  location,
  size,
  symptoms,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="report-card min-h-48 flex flex-col justify-between">
      <div className="flex justify-between">
        <p className="text-base font-medium">Patient Information</p>
        <Button variant={"ghost"} size={"icon"} className="hide-on-print">
          <PencilIcon />
        </Button>
      </div>
      <form>
        <ul className="list-disc list-inside space-y-1">
          <li>
            Disease: <DiseaseBagde disease={disease} />
          </li>
          <li>Location: {location}</li>
          <li>Size: {size}</li>
          <li>Symptoms: {symptoms}</li>
        </ul>
      </form>
      <div />
    </div>
  );
}
