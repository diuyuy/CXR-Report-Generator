"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { type PropsWithChildren, useCallback, useMemo, useRef } from "react";
import { PdfContext } from "./pdf-context";

export default function PdfProvider({ children }: PropsWithChildren) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = useCallback(async () => {
    const element = pdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      width: element.scrollWidth,
      height: element.scrollHeight,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.setFillColor("#070718");

    pdf.rect(0, 0, pdfWidth, pdfHeight, "F");

    const margin = 15;
    const imgWidth = pdfWidth - margin * 2;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const ratio = canvasWidth / canvasHeight;
    const imgHeight = imgWidth / ratio;

    pdf.addImage(imgData, "PNG", margin, 0, imgWidth, imgHeight);
    pdf.save("download-report.pdf");
  }, []);

  const value = useMemo(
    () => ({
      pdfRef,
      handleDownloadPdf,
    }),
    [handleDownloadPdf]
  );

  return <PdfContext.Provider value={value}>{children}</PdfContext.Provider>;
}
