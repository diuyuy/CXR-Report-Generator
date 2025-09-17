"use client";

import type { ComponentProps } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import NavbarTabs from "./navbar-tabs";
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
          <div className="hd-height flex items-center justify-between px-2">
            {open && <ProfileAvartar />}
            <NavbarTrigger />
          </div>
          <Separator />
        </div>
      </SidebarHeader>
      {open && (
        <SidebarContent>
          <NavbarTabs />
        </SidebarContent>
      )}
    </Sidebar>
  );
}
