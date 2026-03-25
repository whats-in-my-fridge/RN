// BE IngredientRes → FE FridgeItem 변환 매퍼

import type { FridgeItem, FridgeSlot, IngredientRes, ShelfType } from "./types";

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
export function fridgeSlotToShelfType(slot: FridgeSlot | null): ShelfType | undefined {
  if (slot === null) return undefined;
  return SLOT_TO_SHELF[slot];
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
