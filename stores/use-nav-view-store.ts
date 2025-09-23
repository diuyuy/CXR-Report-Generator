import { create } from "zustand";

type NavView = "Chat" | "Report";

type NavState = {
  activeView: NavView;
  setActiveView: (view: NavView) => void;
};

export const useNavViewStore = create<NavState>((set) => ({
  activeView: "Chat",
  setActiveView: (view) => set({ activeView: view }),
}));
