import { createContext, type RefObject } from "react";

type PdfContextProps = {
  pdfRef: RefObject<HTMLDivElement | null> | null;
  handleDownloadPdf: () => Promise<void>;
};

export const PdfContext = createContext<PdfContextProps>({
  pdfRef: null,
  handleDownloadPdf: async () => {},
});
