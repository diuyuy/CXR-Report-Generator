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
  const chatId = params.chatId;

  if (!chatId || Array.isArray(chatId)) {
    redirect(ROUTE_PATHS.CHATS);
  }

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
    <div className="h-full py-4 px-8 flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-hide p-6">
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
      <div className="flex mb-4">
        <PromptInput />
      </div>
    </div>
  );
}
