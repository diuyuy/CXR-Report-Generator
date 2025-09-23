import { usePathname } from "next/navigation";
import { ROUTE_PATHS } from "@/constants/route-paths";

export const useIsReportDetail = () => {
  const pathname = usePathname();

  return (
    pathname.startsWith(ROUTE_PATHS.REPORT) &&
    pathname.length > ROUTE_PATHS.REPORT.length + 1
  );
};
