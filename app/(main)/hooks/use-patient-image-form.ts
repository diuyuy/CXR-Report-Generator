import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type PatientImagesForm,
  PatientImagesSchema,
} from "../types/form-schemas";

export const usePatientImageForm = () => {
  return useForm<PatientImagesForm>({
    resolver: zodResolver(PatientImagesSchema),
    defaultValues: { images: [] },
  });
};
