"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
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
import { useChatsQuery } from "../hooks/useChatsQuery";

export default function ChatsTab() {
  const params = useParams();
  const chatId = params.chatId;
  const { isPending, isError, data: chats } = useChatsQuery();
  if (isPending) {
    return (
      <div className="flex justify-center">
        <ClipLoader color="gray" />
      </div>
    );
  }
  if (isError) {
    return (
      <p className="whitespace-pre-line text-center">
        {ERROR_MESSAGE.loadChatsError}
      </p>
    );
  }

  const dates = Object.keys(chats).toSorted((a, b) => (a > b ? -1 : 1));

  return (
    <div>
      {dates.map((date) => {
        return (
          <SidebarGroup key={date} className="mt-2">
            <SidebarGroupLabel className="text-lg">{date}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {chats[date].map((chat) => {
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
                            {chat.summary}
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        );
      })}
    </div>
  );
}
