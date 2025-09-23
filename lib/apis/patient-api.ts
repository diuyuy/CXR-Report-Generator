import patientsMock from "@/mock_data/patients.json";

const { patients: patient } = patientsMock;

export const fetchPatientsByQuery = (query: string) => {
  if (query === "") return [];

  const matchedPatients = patient.filter((patient) => {
    const patientTitle = `${patient.id}${patient.name} ${patient.age} ${patient.shootingDate}`;

    return patientTitle.includes(query);
  });

  return matchedPatients;
};
