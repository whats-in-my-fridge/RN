// 냉장고 재료 단건 수동 추가 API 함수

import type { IngredientRes } from "@/entities/fridge";
import { apiPost } from "@/shared/api";

export type AddIngredientReq = {
  name: string;
  quantity: string;
};

export async function postFridgeItem(body: AddIngredientReq): Promise<IngredientRes> {
  return apiPost<IngredientRes>("/fridge", body);
}
