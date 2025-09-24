"use client";

import { useParams } from "next/navigation";
import { BarLoader } from "react-spinners";
import { Separator } from "@/components/ui/separator";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { ROLE } from "@/constants/role";
import MarkdownViewer from "../../chats/components/markdown-viewer";
import UserPrompt from "../../chats/components/user-prompt";
import PromptInput from "../../components/prompt-input";
import { useChatByReportIdQuery } from "../../hooks/use-chat-by-report-id-query";

export default function ReportDetailPage() {
  const params = useParams();

  const reportId = params.reportId as string;

  const {
    isPending,
    isError,
    data: chatHistory,
  } = useChatByReportIdQuery(reportId);

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

  return (
    <div className="h-full w-full py-4 flex flex-col">
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
      <div className="flex mb-4">
        <PromptInput />
      </div>
    </div>
  );
}
