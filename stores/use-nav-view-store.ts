import { create } from "zustand";

type NavView = "Chat" | "Report";

type NavState = {
  activeView: "Chat" | "Report";
  setActiveView: (view: NavView) => void;
};

export const useNavViewStore = create<NavState>((set) => ({
  activeView: "Chat",
  setActiveView: (view) => set({ activeView: view }),
}));
