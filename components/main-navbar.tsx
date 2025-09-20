"use client";

import type { ComponentProps } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import NavButtonList from "./nav-button-list";
import NavbarContents from "./navbar-contents";
import NavbarTrigger from "./navbar-trigger";
import ProfileAvartar from "./profile-avartar";

export default function MainSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div>
          {open && (
            <div className="hd-height flex items-center justify-between px-2">
              <ProfileAvartar />
              <NavbarTrigger />
            </div>
          )}
          {!open && (
            <div className="hd-height flex justify-center items-center">
              <NavbarTrigger />
            </div>
          )}
          <Separator />
        </div>
        <NavButtonList />
      </SidebarHeader>
      {open && (
        <SidebarContent>
          <NavbarContents />
        </SidebarContent>
      )}
    </Sidebar>
  );
}
