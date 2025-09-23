import { TEXT } from "@/constants/text";
import PromptInput from "../components/prompt-input";

export default function ChatsPage() {
  return (
    <div className="w-full h-full flex flex-col justify-center gap-12 py-4 px-8">
      <h1 className="whitespace-pre-line text-center">{TEXT.chatTitle}</h1>
      <div className="flex justify-center">
        <PromptInput />
      </div>
    </div>
  );
}
