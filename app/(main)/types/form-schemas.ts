import z from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; //10MB

export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "text/plain",
  "application/pdf",
];

const fileSchema = z
  .union([
    z
      .instanceof(File)
      .refine((file) => file.size > 0, { message: "파일을 선택하세요." })
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "파일 크기는 10MB 이하로 해주세요.",
      })
      .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), {
        message: "지원되지 않는 파일 형식입니다.",
      }),
  ])
  .refine((value) => value instanceof File || typeof value === "string", {
    message: "파일 또는 URL을 제공하세요.",
  });

export const PromptSchema = z.object({
  prompt: z.string().max(1000, "최대 1000개의 글자를 입력할 수 있습니다."),
  files: z
    .array(fileSchema)
    .max(10, "최대 10개의 파일을 업로드 할 수 있습니다.")
    .optional(),
});

export type PromptForm = z.infer<typeof PromptSchema>;
