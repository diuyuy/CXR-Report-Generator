import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type PromptForm, PromptSchema } from "../types/form-schemas";

export const usePromptForm = () => {
  return useForm<PromptForm>({
    resolver: zodResolver(PromptSchema),
    defaultValues: {
      prompt: "",
    },
  });
};
