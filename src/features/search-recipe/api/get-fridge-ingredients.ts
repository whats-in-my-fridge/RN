// 냉장고 재료 목록 조회 API — GET /fridge
import { apiGet } from "@/shared/api";

export interface FridgeIngredient {
  id: number;
  name: string;
}

// TODO: 이태건 냉장고 API 연동 완료 후 제거
const MOCK_FRIDGE_INGREDIENTS: FridgeIngredient[] = [
  { id: 1, name: "달걀" },
  { id: 2, name: "김치" },
  { id: 3, name: "두부" },
  { id: 4, name: "양파" },
  { id: 5, name: "마늘" },
];

export async function getFridgeIngredients(): Promise<FridgeIngredient[]> {
  const data = await apiGet<{ items: FridgeIngredient[] }>("/fridge");
  return data.items.length > 0 ? data.items : MOCK_FRIDGE_INGREDIENTS;
}
