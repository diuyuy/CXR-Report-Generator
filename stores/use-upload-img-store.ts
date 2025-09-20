import { create } from "zustand";

type UploadedImagesState = {
  imgs: string[];
  setUploadImgs: (imgs: string[]) => void;
};

export const useUploadImgStore = create<UploadedImagesState>((set) => ({
  imgs: [],
  setUploadImgs: (imgs: string[]) => set({ imgs }),
}));
