// 냉장고 도메인의 핵심 타입 정의 — FridgeItem, FridgeSection, ShelfType

/**
 * 냉장고 선반/칸 구분
 * - fresh-storage   : 신선 보관 선반 (상단 전체 행)
 * - chilled-left    : 냉장 2단 (좌) — 주식·조리식품 등
 * - chilled-right   : 냉장 2단 (우) — 소스·음료 등
 * - vegetable-drawer: 과일·채소 서랍
 * - freezer         : 냉동 다목적칸
 */
export type ShelfType =
  | "fresh-storage"
  | "chilled-left"
  | "chilled-right"
  | "vegetable-drawer"
  | "freezer";

/** 냉장고에 보관 중인 개별 재료 */
export type FridgeItem = {
  /** 서버 발급 고유 ID */
  id: string;
  /** 재료 이름 (예: "우유", "닭가슴살") */
  name: string;
  /** 이 재료가 위치한 선반/칸 */
  shelfType: ShelfType;
  /** 수량 (예: "300g", "1개") */
  quantity?: string;
};

/** 하나의 선반/칸 섹션 — 헤더 메타 + 재료 목록 */
export type FridgeSection = {
  type: ShelfType;
  /** 화면에 표시할 선반 이름 (예: "신선 보관 선반") */
  label: string;
  /** 선반 부제 (예: "유제품 · 계란 · 두부"). 없으면 생략 */
  description?: string;
  items: FridgeItem[];
};
