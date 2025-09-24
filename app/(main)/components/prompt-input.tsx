"use client";

import { PaperclipIcon, SendIcon } from "lucide-react";
import { type ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadImgStore } from "@/stores/use-upload-img-store";
import { usePromptForm } from "../hooks/usePromptForm";
import { ACCEPTED_FILE_TYPES, type PromptForm } from "../types/form-schemas";
import UploadedImage from "./uploaded-image";

type UploadedFile = {
  previewUrl: string;
  file: File;
};

export default function PromptInput() {
  const form = usePromptForm();
  const { patientId, imgs, setUploadImgs } = useUploadImgStore();
  const [fileList, setFileList] = useState<UploadedFile[]>([]);

  const onSubmit = (values: PromptForm) => {
    const formData = new FormData();
    formData.append("prompt", values.prompt);
    imgs.forEach((img) => {
      formData.append("patientImgs", img);
    });
    values.files?.forEach((file) => {
      formData.append("files", file);
    });

    //postData() 이때 patientId 도 같이 전송.
  };

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const fl = files.map((file) => {
        const previewUrl = URL.createObjectURL(file);

        return { previewUrl, file };
      });

      setFileList([...fileList, ...fl]);
    }
  };

  const handleResizeHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const removeImages = (imgUrl: string) => {
    if (imgs.includes(imgUrl)) {
      setUploadImgs(
        patientId,
        imgs.filter((img) => img !== imgUrl)
      );
      return;
    }

    const fileToRemove = fileList.find(
      ({ previewUrl }) => previewUrl === imgUrl
    );

    if (!fileToRemove) return;

    URL.revokeObjectURL(imgUrl);
    setFileList(fileList.filter(({ previewUrl }) => previewUrl !== imgUrl));

    const currentFormFiles = form.getValues("files") ?? [];
    const updatedFormFiles = currentFormFiles.filter(
      (file) => file !== fileToRemove.file
    );

    form.setValue("files", updatedFormFiles, { shouldValidate: true });
  };

  useEffect(() => {
    return () =>
      fileList.forEach((file) => {
        URL.revokeObjectURL(file.previewUrl);
      });
  }, [fileList]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-4/5 max-w-4xl mx-auto flex flex-col gap-2 bg-textbox rounded-xl p-2"
      >
        <div className="flex gap-2 items-center">
          {imgs.map((img) => (
            <UploadedImage
              key={img}
              src={img}
              alt={img}
              removeImage={removeImages}
            />
          ))}
          {fileList.map((file) => (
            <UploadedImage
              key={file.previewUrl}
              src={file.previewUrl}
              alt={file.previewUrl}
              removeImage={removeImages}
            />
          ))}
        </div>
        <FormField
          control={form.control}
          name="prompt"
          render={({ field: { onChange, ...rest } }) => (
            <FormItem>
              <FormControl>
                <textarea
                  placeholder="Ask anything..."
                  onChange={(e) => {
                    onChange(e);
                    handleResizeHeight(e);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (e.shiftKey) return;
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  {...rest}
                  rows={1}
                  className="border-none focus:outline-none resize-none py-4 px-4 max-h-48 md:text-2xl "
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center gap-2 px-2">
          <FormField
            control={form.control}
            name="files"
            render={({ field: { onChange, value, ...rest } }) => (
              <FormItem>
                <Button variant={"ghost"} size={"icon"} asChild>
                  <FormLabel>
                    <PaperclipIcon color="#8C8C8C" className="size-6" />
                  </FormLabel>
                </Button>
                <FormControl>
                  <Input
                    type="file"
                    accept={ACCEPTED_FILE_TYPES.join(",")}
                    multiple
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files ?? []);
                      if (newFiles.length === 0) return;

                      const currentFiles = form.getValues("files") ?? [];
                      onChange([...currentFiles, ...newFiles]);
                      handleFileUpload(newFiles);

                      e.target.value = "";
                    }}
                    {...rest}
                    className="hidden"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type={"submit"} variant={"ghost"} size={"icon"}>
            <SendIcon color="#8C8C8C" className="size-6" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
