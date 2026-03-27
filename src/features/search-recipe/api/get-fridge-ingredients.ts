// 냉장고 재료 목록 조회 API — GET /fridge
import { apiGet } from "@/shared/api";

export interface FridgeIngredient {
  id: number;
  name: string;
}

// TODO: taegeon2 냉장고 API 연동 완료 후 제거
const MOCK_FRIDGE_INGREDIENTS: FridgeIngredient[] = [
  { id: 1, name: "달걀" },
  { id: 2, name: "김치" },
  { id: 3, name: "두부" },
  { id: 4, name: "양파" },
  { id: 5, name: "마늘" },
  { id: 6, name: "대파" },
  { id: 7, name: "당근" },
  { id: 8, name: "돼지고기" },
  { id: 9, name: "간장" },
  { id: 10, name: "참기름" },
  { id: 11, name: "고추장" },
  { id: 12, name: "된장" },
  { id: 13, name: "소금" },
  { id: 14, name: "설탕" },
  { id: 15, name: "식용유" },
  { id: 16, name: "감자" },
  { id: 17, name: "고구마" },
  { id: 18, name: "버섯" },
  { id: 19, name: "시금치" },
  { id: 20, name: "애호박" },
  { id: 21, name: "오이" },
  { id: 22, name: "토마토" },
  { id: 23, name: "우유" },
];

export async function getFridgeIngredients(): Promise<FridgeIngredient[]> {
  const data = await apiGet<{ items: FridgeIngredient[] }>("/fridge");
  return data.items.length > 0 ? data.items : MOCK_FRIDGE_INGREDIENTS;
}
