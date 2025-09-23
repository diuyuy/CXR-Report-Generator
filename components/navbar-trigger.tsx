"use client";

import { PanelRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export default function NavbarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant={"ghost"} size={"icon_lg"} onClick={toggleSidebar}>
      <PanelRightIcon color="white" className="size-8" />
    </Button>
  );
}
