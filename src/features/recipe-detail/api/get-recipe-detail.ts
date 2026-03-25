// 레시피 상세 조회 API — GET /recipes/{recipeId}

import type { BaseResponse, RecipeInfoDTO } from "@/entities/recipe";
import { apiGet } from "@/shared/api";

export async function getRecipeDetail(recipeId: number): Promise<RecipeInfoDTO> {
  const data = await apiGet<BaseResponse<RecipeInfoDTO>>(`/recipes/${recipeId}`);
  return data.result;
}
