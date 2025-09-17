"use client";

import { PaperclipIcon, SendIcon } from "lucide-react";
import { type ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePromptForm } from "../hooks/usePromptForm";
import { ACCEPTED_FILE_TYPES, type PromptForm } from "../types/form-schemas";

export default function PromptInput() {
  const form = usePromptForm();
  const [previewUrls, setPreviewUrls] = useState<string[]>();

  const onSubmit = (values: PromptForm) => {
    const formData = new FormData();
    formData.append("prompt", values.prompt);
    values.files?.forEach((file) => {
      formData.append("files", file);
    });

    //postData()
  };

  const handleResizeHeight = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full mx-8 sm:mx-10 flex flex-col gap-2 bg-prompt rounded-xl p-2"
      >
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
                  {...rest}
                  className="border-none focus:outline-none resize-none py-4 px-4 min-h-24 max-h-48 md:text-xl "
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
                      const files = Array.from(e.target.files ?? []);
                      onChange(files);
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
