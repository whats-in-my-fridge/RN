// 부족 재료 기반 레시피 추천 조회 API — GET /recipes/recommend/fridge/missing

import type { RecipeDTO } from "@/entities/recipe";
import type { BaseResponse } from "@/entities/recipe/model/recipe-api.types";
import { apiGet } from "@/shared/api";

export async function getMissingRecipes(): Promise<RecipeDTO[]> {
  const data = await apiGet<BaseResponse<RecipeDTO[]>>("/recipes/recommend/fridge/missing");
  return data.result;
}
