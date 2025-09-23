import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type DiagnosisForm, DiagnosisSchema } from "../../types/form-schemas";

export const useDiagnosisForm = (defaultValues: DiagnosisForm) => {
  return useForm({
    resolver: zodResolver(DiagnosisSchema),
    defaultValues,
  });
};
