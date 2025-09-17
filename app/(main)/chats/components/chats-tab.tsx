"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { formatDate } from "@/lib/utils";
import type { ChatSummary } from "../../types/types";
import { useInfiniteChatsQuery } from "../hooks/use-infinite-chats-query";

export default function ChatsTab() {
  const params = useParams();
  const chatId = params.chatId;
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteChatsQuery();

  const groupChatsByDate = (chats: ChatSummary[]) => {
    const chatMap: { [key: string]: ChatSummary[] } = {};
    chats.forEach((chat) => {
      const date = formatDate(chat.createDate);
      if (!chatMap[date]) {
        chatMap[date] = [];
      }
      chatMap[date].push(chat);
    });

    return chatMap;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        console.log("Observer 호출");
        console.log("🚀 ~ ChatsTab ~ hasNextPage:", hasNextPage);
        console.log("🚀 ~ ChatsTab ~ isFetchingNextPage:", isFetchingNextPage);
        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <div className="flex justify-center">
        <ClipLoader color="gray" />
      </div>
    );
  }
  if (status === "error") {
    return (
      <p className="whitespace-pre-line text-center">
        {ERROR_MESSAGE.loadChatsError}
      </p>
    );
  }

  const chatMap = groupChatsByDate(data.pages.flat());

  const dates = Object.keys(chatMap).toSorted((a, b) => (a > b ? -1 : 1));

  return (
    <div>
      {dates.map((date) => {
        return (
          <SidebarGroup key={date} className="mt-2">
            <SidebarGroupLabel className="text-lg">{date}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chatMap[date].map((chat) => {
                  return (
                    <SidebarMenuItem key={chat.id}>
                      <SidebarMenuButton
                        size={"lg"}
                        asChild
                        isActive={chat.id === chatId}
                        className="rounded-3xl"
                      >
                        <Link href={`${ROUTE_PATHS.CHATS}/${chat.id}`}>
                          <span className="text-white text-lg">
                            {chat.contentSummary}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                <div ref={observerRef} className="h-1" />
                {isFetchingNextPage && <ClipLoader color="gray" />}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </div>
  );
}
