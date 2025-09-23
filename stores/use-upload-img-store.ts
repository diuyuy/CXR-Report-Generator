import { create } from "zustand";

type UploadedImagesState = {
  patientId: string | null;
  imgs: string[];
  setUploadImgs: (patientId: string | null, imgs: string[]) => void;
};

export const useUploadImgStore = create<UploadedImagesState>((set) => ({
  patientId: null,
  imgs: [],
  setUploadImgs: (patientId: string | null, imgs: string[]) =>
    set({ patientId, imgs }),
}));
