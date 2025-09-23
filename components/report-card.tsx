"use client";

import { CheckIcon, PencilIcon, XIcon } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import type { ReportData } from "@/app/(main)/types/types";
import { Button } from "@/components/ui/button";
import CustomClipLoader from "./custom-clip-loader";

type Props = {
  title: string;
  propName?: string;
  content: string;
  onUpdate?: (values: Partial<ReportData>) => Promise<void>;
};

export default function ReportCard({
  title,
  content,
  propName,
  onUpdate,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const content = formData.get("content");
    if (onUpdate && propName) {
      setIsUpdating(true);
      await onUpdate({ [propName]: content });
      setIsEditing(false);
      setIsUpdating(false);
    }
  };

  const [text, setText] = useState(content);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <Unnecessary dependencies>
  useEffect(() => {
    if (textareaRef.current) {
      const textLength = text.length;

      textareaRef.current.selectionStart = textLength;
      textareaRef.current.selectionEnd = textLength;

      textareaRef.current.focus();
    }
  }, [isEditing]);

  return (
    <form onSubmit={onSubmit}>
      <div className="report-card flex flex-col gap-3 justify-between">
        <div className="flex justify-between">
          <p className="text-base font-semibold">{title}</p>
          {isUpdating ? (
            <CustomClipLoader />
          ) : isEditing ? (
            <div className="flex gap-2">
              <Button
                type={"button"}
                variant={"ghost"}
                onClick={() => setIsEditing(false)}
              >
                <XIcon />
              </Button>
              <Button
                type="submit"
                variant={"ghost"}
                size={"icon"}
                className="hide-on-print"
              >
                <CheckIcon />
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              variant={"ghost"}
              size={"icon"}
              onClick={() => setIsEditing(true)}
              className="hide-on-print"
            >
              <PencilIcon />
            </Button>
          )}
        </div>
        {isEditing ? (
          <TextareaAutosize
            name="content"
            ref={textareaRef}
            value={text}
            onChange={handleTextChange}
            className="focus:outline-none rounded-md resize-none text-base font-medium "
            minRows={1}
          />
        ) : (
          <p className="text-base font-medium whitespace-pre-wrap">{content}</p>
        )}
        <div />
      </div>
    </form>
  );
}
