// src/shared/model/toast/store.ts
// Zustand 스토어: 토스트 메시지 상태 관리
// 단일 토스트를 관리하며, 정해진 시간 후 자동으로 사라집니다.

import { create } from "zustand";

export interface ToastItem {
  message: string;
}

interface ToastStore {
  toast: ToastItem | null;
  show: (message: string, duration?: number) => void;
  hide: () => void;
}

export const useToastStore = create<ToastStore>((set) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return {
    toast: null,

    show: (message, duration = 3000) => {
      // Clear existing timeout if any
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      set({ toast: { message } });

      // Auto-hide after duration
      timeoutId = setTimeout(() => {
        set({ toast: null });
        timeoutId = null;
      }, duration);
    },

    hide: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      set({ toast: null });
    },
  };
});
