import type { ReactNode } from "react";
import { create } from "zustand";

interface BottomSheetStore {
  content: ReactNode | null;
  open: (content: ReactNode) => void;
  close: () => void;
}

export const useBottomSheetStore = create<BottomSheetStore>((set) => ({
  content: null,
  open: (content) => set({ content }),
  close: () => set({ content: null }),
}));
