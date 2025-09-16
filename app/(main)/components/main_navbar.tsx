import type { ComponentProps } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import NavbarTabs from "./navbar-tabs";
import ProfileAvartar from "./profile-avartar";

export default function MainSidebar({
  ...props
}: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div>
          <div className="hd-height flex items-center px-2">
            <ProfileAvartar />
          </div>
          <Separator />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavbarTabs />
      </SidebarContent>
    </Sidebar>
  );
}
