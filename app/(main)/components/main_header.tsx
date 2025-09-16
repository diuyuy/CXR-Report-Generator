import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MainHeader() {
  return (
    <header className="flex-1 flex justify-between items-center">
      <nav>
        <ul className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 hd-text-props mr-3">
          <li>
            <Link href={"#"}>PATIENTS</Link>
          </li>
          <li>
            <Link href={"#"}>DASHBOARD</Link>
          </li>
          <li>
            <Link href={"#"}>PRICING</Link>
          </li>
          <li>
            <Link href={"#"}>HELP</Link>
          </li>
        </ul>
      </nav>
      <Button variant={"ghost"} className="hd-text-props">
        LOG OUT
      </Button>
    </header>
  );
}
