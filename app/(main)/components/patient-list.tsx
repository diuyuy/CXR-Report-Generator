"use client";

import { useEffect, useRef, useState } from "react";
import CustomClipLoader from "@/components/custom-clip-loader";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { useInfinitePatientQuery } from "../hooks/use-infinite-patients-query";
import CollapsiblePatientItem from "./collapsible-patient-item";

export default function PatientList() {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const { status, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfinitePatientQuery();

  const obserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (obserRef.current) {
      observer.observe(obserRef.current);
    }

    return () => {
      if (obserRef.current) observer.unobserve(obserRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return <CustomClipLoader />;
  }

  if (status === "error") {
    return (
      <p className="whitespace-pre-line text-center">
        {ERROR_MESSAGE.loadPatientsError}
      </p>
    );
  }

  const patients = data.pages.flat();

  return (
    <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
      {patients.map((patient) => (
        <CollapsiblePatientItem
          key={patient.id}
          isOpen={patient.id === selectedPatient}
          patient={patient}
          setSelectedPatient={setSelectedPatient}
        />
      ))}
      <div ref={obserRef} className="h-3" />
      {isFetchingNextPage && <CustomClipLoader />}
    </div>
  );
}
