"use client";

import { PanelRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useSidebar } from "./ui/sidebar";

export default function NavbarTrigger() {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant={"ghost"} size={"icon_lg"} onClick={toggleSidebar}>
      <PanelRightIcon className="size-8" />
    </Button>
  );
}
