"use client";

import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  age: number;
  gender: string;
  shootingDate: string;
};

export default function PatientInformationCard({
  age,
  gender,
  shootingDate,
}: Props) {
  return (
    <div className="report-card min-h-48 flex flex-col justify-between">
      <div className="flex justify-between">
        <p className="text-base font-medium">Patient Information</p>
        <Button variant={"ghost"} size={"icon"} className="hide-on-print">
          <PencilIcon />
        </Button>
      </div>
      <ul className="list-disc list-inside space-y-1">
        <li>Age: {age}</li>
        <li>Gender: {gender}</li>
        <li>Shooting Date: {shootingDate}</li>
      </ul>
      <div />
    </div>
  );
}
