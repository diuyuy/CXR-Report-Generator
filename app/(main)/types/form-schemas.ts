import z from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; //10MB

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  // "text/plain",
  // "application/pdf", 향후 추가 계획
];

const fileSchema = z
  .union([
    z
      .instanceof(File)
      .refine((file) => file.size > 0, { message: "Please select a file." })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be 10MB or less.",
      })
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
        message: "Unsupported file type.",
      }),
  ])
  .refine((value) => value instanceof File || typeof value === "string", {
    error: "Please provide a file or a URL.",
  });

export const PromptSchema = z
  .object({
    prompt: z.string().max(1000, "Maximum 1000 characters allowed."),
    loadedImages: z
      .array(z.string())
      .max(10, "You can upload a maximum of 10 images.")
      .optional(),
    files: z
      .array(fileSchema)
      .max(10, "You can upload a maximum of 10 files.")
      .optional(),
  })
  .refine(
    ({ loadedImages, files }) =>
      (loadedImages?.length ?? 0) + (files?.length ?? 0) <= 10,
    { error: "You can upload a maximum of 10 files in total." }
  );

export type PromptForm = z.infer<typeof PromptSchema>;

//PatientInfoForm
export const PatientInfoSchema = z.object({
  age: z.string().min(1, "Invalid Age.").max(3, "Invalid Age."),
  gender: z.union([z.literal("남"), z.literal("여")], "Invalid gender."),
  shootingDate: z.iso.date("Invalid date format."),
});

export type PatientInfoForm = z.infer<typeof PatientInfoSchema>;

//Diagnosis
export const DiagnosisSchema = z.object({
  disease: z.string(),
  location: z.string(),
  size: z.string(),
  symptoms: z.string(),
});

export type DiagnosisForm = z.infer<typeof DiagnosisSchema>;
