import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type PatientInfoForm,
  PatientInfoSchema,
} from "../../types/form-schemas";

export const usePatientInfoForm = (defaultValues: PatientInfoForm) => {
  return useForm({
    resolver: zodResolver(PatientInfoSchema),
    defaultValues,
  });
};
