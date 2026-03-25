// 냉장고 재료 목록 조회 API 함수

import type { IngredientRes } from "@/entities/fridge";
import { apiGet } from "@/shared/api";

type FridgeListRes = {
  items: IngredientRes[];
};

export async function getFridgeItems(): Promise<IngredientRes[]> {
  const data = await apiGet<FridgeListRes>("/fridge");
  return data.items;
}
