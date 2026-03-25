// BE IngredientRes → FE FridgeItem 변환 및 선반별 섹션 그룹핑 매퍼

import type {
  FridgeItem,
  FridgeSection,
  FridgeSlot,
  IngredientRes,
  ShelfType,
} from "./types";

const SLOT_TO_SHELF: Record<FridgeSlot, ShelfType> = {
  MAIN_SHELF_1: "fresh-storage",
  MAIN_SHELF_2: "chilled-left",
  MAIN_SHELF_3: "chilled-left",
  DOOR_SHELF_1: "chilled-right",
  DOOR_SHELF_2: "chilled-right",
  DOOR_SHELF_3: "chilled-right",
  DOOR_SHELF_4: "chilled-right",
  CRISPER_DRAWER: "vegetable-drawer",
  FREEZER_TOP: "freezer",
};

/**
 * BE fridgeSlot 값을 FE ShelfType으로 변환한다.
 * fridgeSlot이 null이면 (auto-place 미실행 상태) undefined를 반환한다.
 */
export function fridgeSlotToShelfType(
  slot: FridgeSlot | null,
): ShelfType | undefined {
  if (slot === null) return undefined;
  return SLOT_TO_SHELF[slot];
}

/** 선반별 화면 표시 메타데이터 */
const SHELF_METADATA: Record<
  ShelfType,
  { label: string; description?: string }
> = {
  "fresh-storage": {
    label: "단백질 선반",
    description: "유제품 · 계란 · 두부",
  },
  "chilled-left": { label: "주식 · 조리식품" },
  "chilled-right": { label: "소스 · 음료" },
  "vegetable-drawer": { label: "야채 서랍", description: "채소 · 과일" },
  freezer: { label: "냉동 서랍", description: "육류 · 어패류" },
};

const SHELF_ORDER: ShelfType[] = [
  "fresh-storage",
  "chilled-left",
  "chilled-right",
  "vegetable-drawer",
  "freezer",
];

/**
 * FridgeItem 배열을 ShelfType 기준으로 그룹핑한 Record.
 * 항상 5개 ShelfType 키를 모두 포함하며, 아이템 없는 섹션은 items: []
 */
export function groupItemsToSections(
  items: FridgeItem[],
): Record<ShelfType, FridgeSection> {
  const grouped = new Map<ShelfType, FridgeItem[]>();

  for (const item of items) {
    const existing = grouped.get(item.shelfType);
    if (existing) {
      existing.push(item);
    } else {
      grouped.set(item.shelfType, [item]);
    }
  }

  return Object.fromEntries(
    SHELF_ORDER.map((type) => [
      type,
      { type, ...SHELF_METADATA[type], items: grouped.get(type) ?? [] },
    ]),
  ) as Record<ShelfType, FridgeSection>;
}

/**
 * BE IngredientRes 배열을 FE FridgeItem 배열로 변환한다.
 * fridgeSlot이 null인 항목(auto-place 미실행 상태)은 제외한다.
 */
export function toFridgeItems(items: IngredientRes[]): FridgeItem[] {
  return items.flatMap((item) => {
    const shelfType = fridgeSlotToShelfType(item.fridgeSlot);
    if (shelfType === undefined) return [];
    return [
      {
        id: String(item.id),
        name: item.name,
        shelfType,
        quantity: item.quantity,
      },
    ];
  });
}
