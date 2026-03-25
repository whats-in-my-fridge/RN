// 선반 상세 시트 상태 관리 — 선택된 선반 타입 열기/닫기

import { create } from "zustand";

import type { ShelfType } from "@/entities/fridge";

type ShelfDetailState = {
  selectedType: ShelfType | null;
  open: (type: ShelfType) => void;
  close: () => void;
};

export const useShelfDetailStore = create<ShelfDetailState>((set) => ({
  selectedType: null,
  open: (type) => set({ selectedType: type }),
  close: () => set({ selectedType: null }),
}));
