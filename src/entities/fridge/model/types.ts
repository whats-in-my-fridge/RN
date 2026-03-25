// 냉장고 도메인의 핵심 타입 정의 — FridgeItem, FridgeSection, ShelfType, IngredientRes

/**
 * 냉장고 선반/칸 구분
 * - fresh-storage   : 신선 보관 선반 (상단 전체 행)
 * - chilled-left    : 냉장 2단 (좌) — 주식·조리식품 등
 * - chilled-right   : 냉장 2단 (우) — 소스·음료 등
 * - vegetable-drawer: 과일·채소 서랍
 * - freezer         : 냉동 다목적칸
 *
 * BE fridgeSlot → FE ShelfType 매핑
 * - MAIN_SHELF_1          → fresh-storage
 * - MAIN_SHELF_2          → chilled-left
 * - MAIN_SHELF_3          → chilled-left  (가운데와 같은 섹션으로 묶음)
 * - DOOR_SHELF_1~4        → chilled-right
 * - CRISPER_DRAWER        → vegetable-drawer
 * - FREEZER_TOP           → freezer
 */
export type ShelfType =
  | "fresh-storage"
  | "chilled-left"
  | "chilled-right"
  | "vegetable-drawer"
  | "freezer";

/**
 * BE API의 fridgeSlot enum 값
 * - null: 아직 자동 배치 전 (auto-place 미실행 상태)
 */
export type FridgeSlot =
  | "MAIN_SHELF_1"
  | "MAIN_SHELF_2"
  | "MAIN_SHELF_3"
  | "DOOR_SHELF_1"
  | "DOOR_SHELF_2"
  | "DOOR_SHELF_3"
  | "DOOR_SHELF_4"
  | "CRISPER_DRAWER"
  | "FREEZER_TOP";

/** BE API 응답 원본 — GET /fridge 의 items 배열 요소 */
export type IngredientRes = {
  id: number;
  name: string;
  quantity: string | null;
  storageCategory: string;
  fridgeSlot: FridgeSlot | null;
  inputMethod: "MANUAL" | "OCR";
};

/** 냉장고에 보관 중인 개별 재료 (FE 내부 도메인 모델) */
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
