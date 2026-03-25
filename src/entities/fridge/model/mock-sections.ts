// 냉장고 보드 Mock 데이터 — API 연동 전 임시 데이터
// TODO: API 연동 시 이 파일을 삭제하고 서버 데이터로 교체

import type { FridgeSection } from "@/entities/fridge";

export const MOCK_FRESH_STORAGE: FridgeSection = {
  type: "fresh-storage",
  label: "단백질 선반",
  description: "유제품 · 계란 · 두부",
  items: [
    { id: "1", name: "우유", shelfType: "fresh-storage" },
    { id: "2", name: "계란", shelfType: "fresh-storage" },
    { id: "3", name: "요거트", shelfType: "fresh-storage" },
    { id: "4", name: "치즈", shelfType: "fresh-storage" },
    { id: "5", name: "두부", shelfType: "fresh-storage" },
  ],
};

export const MOCK_CHILLED_LEFT: FridgeSection = {
  type: "chilled-left",
  label: "주식 · 조리식품",
  items: [
    { id: "6", name: "잡곡밥", shelfType: "chilled-left" },
    { id: "7", name: "김치", shelfType: "chilled-left" },
    { id: "8", name: "된장찌개", shelfType: "chilled-left" },
    { id: "9", name: "참치캔", shelfType: "chilled-left" },
  ],
};

export const MOCK_CHILLED_RIGHT: FridgeSection = {
  type: "chilled-right",
  label: "소스 · 음료",
  items: [
    { id: "10", name: "간장", shelfType: "chilled-right" },
    { id: "11", name: "고추장", shelfType: "chilled-right" },
    { id: "12", name: "마요네즈", shelfType: "chilled-right" },
    { id: "13", name: "맥주", shelfType: "chilled-right" },
    { id: "14", name: "오렌지주스", shelfType: "chilled-right" },
    { id: "14-1", name: "케첩", shelfType: "chilled-right" },
    { id: "14-2", name: "콜라", shelfType: "chilled-right" },
  ],
};

export const MOCK_VEGETABLE_DRAWER: FridgeSection = {
  type: "vegetable-drawer",
  label: "야채 서랍",
  description: "채소 · 과일",
  items: [
    { id: "15", name: "파프리카", shelfType: "vegetable-drawer" },
    { id: "16", name: "토마토", shelfType: "vegetable-drawer" },
    { id: "17", name: "당근", shelfType: "vegetable-drawer" },
    { id: "18", name: "사과", shelfType: "vegetable-drawer" },
    { id: "19", name: "오렌지", shelfType: "vegetable-drawer" },
  ],
};

export const MOCK_FREEZER: FridgeSection = {
  type: "freezer",
  label: "냉동 서랍",
  description: "육류 · 어패류",
  items: [
    { id: "20", name: "닭가슴살", shelfType: "freezer" },
    { id: "21", name: "돼지고기", shelfType: "freezer" },
    { id: "22", name: "냉동새우", shelfType: "freezer" },
    { id: "23", name: "만두", shelfType: "freezer" },
  ],
};
