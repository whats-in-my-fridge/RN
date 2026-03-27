// 사용자 선호도 Zustand 스토어 — 알레르기 및 기피 재료 목록과 UI 상태를 관리한다.

import { create } from "zustand";

// ─── 타입 ────────────────────────────────────────────────────────────────────

interface PreferencesStore {
  allergies: string[];
  dislikedIngredients: string[];
  isSheetOpen: boolean;

  setAllergies: (allergies: string[]) => void;
  setDislikedIngredients: (items: string[]) => void;

  openSheet: () => void;
  closeSheet: () => void;
}

// ─── 스토어 ───────────────────────────────────────────────────────────────────

export const usePreferencesStore = create<PreferencesStore>((set) => ({
  allergies: [],
  dislikedIngredients: [],
  isSheetOpen: false,

  setAllergies: (allergies) => set({ allergies }),

  setDislikedIngredients: (items) => set({ dislikedIngredients: items }),

  openSheet: () => set({ isSheetOpen: true }),
  closeSheet: () => set({ isSheetOpen: false }),
}));
