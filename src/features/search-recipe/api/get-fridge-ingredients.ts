// 냉장고 재료 목록 조회 API — GET /fridge
import { apiGet } from "@/shared/api";

export interface FridgeIngredient {
  id: number;
  name: string;
}

export async function getFridgeIngredients(): Promise<FridgeIngredient[]> {
  const data = await apiGet<{ items: FridgeIngredient[] }>("/fridge");
  return data.items;
}
