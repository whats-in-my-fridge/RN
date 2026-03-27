// src/features/chat/model/store.ts
// 채팅 패널의 열림/닫힘 상태와 메시지 목록을 관리하는 Zustand 스토어

import { create } from "zustand";

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}

interface ChatStore {
  isOpen: boolean;
  isPresented: boolean;
  messages: ChatMessage[];
  open: () => void;
  close: () => void;
  setPresented: (value: boolean) => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "안녕하세요! 냉장고 재료 기반 요리 도우미입니다. 무엇을 도와드릴까요?",
};

export const useChatStore = create<ChatStore>((set) => ({
  isOpen: false,
  isPresented: false,
  messages: [INITIAL_MESSAGE],
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  setPresented: (value) => set({ isPresented: value }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [INITIAL_MESSAGE] }),
}));
