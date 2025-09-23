"use client";

import { redirect, useParams } from "next/navigation";
import { BarLoader } from "react-spinners";
import { Separator } from "@/components/ui/separator";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { ROLE } from "@/constants/role";
import { ROUTE_PATHS } from "@/constants/route-paths";
import PromptInput from "../../components/prompt-input";
import MarkdownViewer from "../components/markdown-viewer";
import UserPrompt from "../components/user-prompt";
import { useChatDetailQuery } from "../hooks/use-chat-detail-query";

export default function ChatHistoryPage() {
  const params = useParams();
  const chatId = params.chatId as string;

  const { isPending, isError, data: chatHistory } = useChatDetailQuery(chatId);

  if (isPending) {
    return <BarLoader color="gray" className="w-full" />;
  }

  if (isError) {
    return (
      <p className="text-center text-white text-lg whitespace-pre-line">
        {ERROR_MESSAGE.loadChatHistoryError}
      </p>
    );
  }

  if (!chatHistory) {
    redirect(ROUTE_PATHS.CHATS);
  }

  return (
    <div className="relative h-full w-full pb-4 flex flex-col justify-between">
      <p className="absolute top-4 left-4">
        {`${chatHistory.patient.id} ${chatHistory.patient.patientName} (${chatHistory.patient.age}세/${chatHistory.patient.gender})`}
      </p>
      <div className="w-5/6 max-w-4xl mx-auto overflow-y-auto scrollbar-hide p-6">
        {chatHistory.messages.map((msg, i) => {
          return (
            <div key={msg.messageId}>
              {i !== 0 && <Separator className="my-8" />}
              {msg.role === ROLE.ASSISTANT ? (
                <MarkdownViewer content={msg.content} />
              ) : (
                <UserPrompt
                  content={msg.content}
                  image={msg.messageImages}
                  patient={chatHistory.patient}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex mb-14">
        <PromptInput />
      </div>
    </div>
  );
}
