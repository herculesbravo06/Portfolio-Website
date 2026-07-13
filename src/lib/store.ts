import { create } from "zustand";

interface AppState {
  bootState: "booting" | "terminal" | "exploding" | "world";
  setBootState: (state: "booting" | "terminal" | "exploding" | "world") => void;
}

export const useAppStore = create<AppState>((set) => ({
  bootState: "booting",
  setBootState: (state) => set({ bootState: state }),
}));
