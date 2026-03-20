// 선반 상세 시트 상태 관리 — 선택된 섹션 열기/닫기/아이템 삭제(mock)

import { create } from "zustand";

import type { FridgeSection } from "@/entities/fridge";

type ShelfDetailState = {
  selectedSection: FridgeSection | null;
  open: (section: FridgeSection) => void;
  close: () => void;
  deleteItem: (itemId: string) => void;
};

export const useShelfDetailStore = create<ShelfDetailState>((set) => ({
  selectedSection: null,

  open: (section) => set({ selectedSection: section }),

  close: () => set({ selectedSection: null }),

  // TODO: API 연동 시 mutation 호출로 교체
  deleteItem: (itemId) =>
    set((state) => ({
      selectedSection: state.selectedSection
        ? {
            ...state.selectedSection,
            items: state.selectedSection.items.filter((item) => item.id !== itemId),
          }
        : null,
    })),
}));
