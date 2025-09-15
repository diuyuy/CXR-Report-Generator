import Link from "next/link";
import AppSidebar from "./app_sidebar";
import NavbarTrigger from "./navbar-trigger";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

export default function AppHeader() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center">
          <NavbarTrigger />
          <Link href={"#"}>DDDD</Link>
          <Link href={"#"}>DDDD</Link>
          <Link href={"#"}>DDDD</Link>
          <Link href={"#"}>DDDD</Link>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}

// export default function AppHeader() {
//   return (
//     <>
//       <div className="flex flex-row px-2 py-4">
//         <div className="flex-1 flex items-center gap-3">
//           <p>CP</p>
//           <Button variant={"ghost"} size={"icon"}>
//             <PanelRightIcon />
//           </Button>
//         </div>
//         <div className="flex-1 flex justify-between items-center">
//           <div className="flex gap-2">
//             <Link href={"#"}>PATIENTS</Link>
//             <Link href={"#"}>DASHBOARD</Link>
//             <Link href={"#"}>PRICING</Link>
//             <Link href={"#"}>HELP</Link>
//           </div>
//           <button type="button">LOG OUT</button>
//         </div>
//       </div>
//       <Separator className="mb-3" />
//     </>
//   );
// }
