"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ClipLoader } from "react-spinners";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ERROR_MESSAGE } from "@/constants/error-messages";
import { ROUTE_PATHS } from "@/constants/route-paths";
import { formatReportDate } from "@/lib/utils";
import type { ReportTitle } from "../../types/types";
import { useInfiniteReportQuery } from "../hooks/use-infinite-reports-query";

export default function ReportsList() {
  const { status, data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteReportQuery();

  const observerRef = useRef<HTMLDivElement>(null);

  const groupReportsByDate = (reports: ReportTitle[]) => {
    const reportMap: { [key: string]: ReportTitle[] } = {};

    reports.forEach((report) => {
      if (!reportMap[report.shootingDate]) {
        reportMap[report.shootingDate] = [];
      }
      reportMap[report.shootingDate].push(report);
    });

    return reportMap;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <div className="flex justify-center">
        <ClipLoader color="gray" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="whitespace-pre-line text-center">
        {ERROR_MESSAGE.loadChatsError}
      </p>
    );
  }

  const reportMap = groupReportsByDate(data.pages.flat());

  const dates = Object.keys(reportMap).sort((a, b) => (a > b ? -1 : 1));

  return (
    <>
      {dates.map((date) => (
        <SidebarGroup key={date}>
          <SidebarGroupLabel className="text-lg">
            {formatReportDate(date)}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {reportMap[date].map((report) => (
                <SidebarMenuItem key={report.patientPid}>
                  <SidebarMenuButton asChild className="rounded-3xl text-lg">
                    <Link href={`${ROUTE_PATHS.REPORT}/${report.reportId}`}>
                      <span className="text-white text-lg">{`${report.patientPid} ${report.patientName}`}</span>
                      {`(${report.shootingDate})`}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
      <div ref={observerRef} className="h-4" />
      {isFetchingNextPage && <ClipLoader color="gray" />}
    </>
  );
}
