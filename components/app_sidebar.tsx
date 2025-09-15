"use client";

import { type ComponentProps, useReducer } from "react";
import { Button } from "./ui/button";
import { Sidebar, SidebarContent, SidebarHeader } from "./ui/sidebar";

export default function AppSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const [isChat, toggleSidebarOption] = useReducer((prev) => !prev, true);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex gap-3">
          <Button onClick={toggleSidebarOption}>Chat</Button>
          <Button onClick={toggleSidebarOption}>Report</Button>
        </div>
      </SidebarHeader>
      {isChat ? (
        <SidebarContent>This is Chat</SidebarContent>
      ) : (
        <SidebarContent>This is Report</SidebarContent>
      )}
    </Sidebar>
  );
}
