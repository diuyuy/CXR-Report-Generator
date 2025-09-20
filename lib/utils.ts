import { type ClassValue, clsx } from "clsx";
import { differenceInDays } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  const dt = new Date(date);
  const year = String(dt.getFullYear());
  const month = String(dt.getMonth() + 1).padStart(2, "0");
  const day = String(dt.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};

export const formatReportDate = (date: string) => {
  const today = new Date("2025-11-29");
  const dt = new Date(date);

  const diffDays = differenceInDays(today, dt);

  if (diffDays <= 1) {
    return diffDays === 0 ? "Today" : "Yesterday";
  }

  if (diffDays <= 7) return `${diffDays} days ago`;

  return date;
};

export const imageUrlMap = (img: string) => {
  const n = Number(img[5]);

  switch (n % 3) {
    case 0:
      return "/images/cxr_01.jpg";
    case 1:
      return "/images/cxr_02.jpeg";
    default:
      return "/images/cxr_03.jpeg";
  }
};
