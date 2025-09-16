"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ChatsTab from "../chats/components/chats-tab";
import ReportsTab from "./reports-tab";

export default function NavbarTabs() {
  const pathname = usePathname();

  const isChat = pathname.startsWith("/chats");

  return (
    <div className="my-5 flex flex-col gap-3">
      <div className="flex justify-around items-center">
        <Button
          variant={isChat ? "tab" : "tab_disabled"}
          size={"tab"}
          className="font-medium text-lg"
          asChild
        >
          <Link href={"/chats"}>Chat</Link>
        </Button>
        <Button
          variant={isChat ? "tab_disabled" : "tab"}
          size={"tab"}
          className="font-medium text-lg"
          asChild
        >
          <Link href={"/reports"}>Report</Link>
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <PlusIcon className="size-8" color="white" />
        </Button>
      </div>
      {isChat ? <ChatsTab /> : <ReportsTab />}
    </div>
  );
}
