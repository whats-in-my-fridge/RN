// 냉장고 재료 기반 레시피 추천 조회 API — GET /recipes/recommend/fridge

import type { RecipeDTO } from "@/entities/recipe";
import type { BaseResponse } from "@/entities/recipe/model/recipe-api.types";
import { apiGet } from "@/shared/api";

export async function getFridgeRecipes(): Promise<RecipeDTO[]> {
  const data = await apiGet<BaseResponse<RecipeDTO[]>>("/recipes/recommend/fridge");
  return data.result;
}
