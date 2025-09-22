import { useState } from "react";
import CustomClipLoader from "@/components/custom-clip-loader";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { useSearchPatientsQuery } from "../reports/hooks/use-search-patients-query";
import CollapsiblePatientItem from "./collapsible-patient-item";

type Props = {
  query: string;
};

export default function SearchedPatientsList({ query }: Props) {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const { isPending, isError, data: patients } = useSearchPatientsQuery(query);

  if (isPending) {
    return <CustomClipLoader />;
  }

  if (isError) {
    return (
      <p className="whitespace-pre-line text-center">
        {ERROR_MESSAGE.loadPatientsError}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
      {patients.length === 0 ? (
        <p className="mt-2 text-center text-light-gray">
          {query === "" ? "Search for patients" : "No patients found."}
        </p>
      ) : (
        patients.map((patient) => (
          <CollapsiblePatientItem
            key={patient.id}
            isOpen={patient.id === selectedPatient}
            patient={patient}
            setSelectedPatient={setSelectedPatient}
          />
        ))
      )}
    </div>
  );
}
