// 레시피 상세 조회 API — GET /recipes/{recipeId}

import type { RecipeInfoDTO } from "@/entities/recipe";
import type { BaseResponse } from "@/entities/recipe/model/recipe-api.types";
import { apiGet } from "@/shared/api";

export async function getRecipeDetail(recipeId: number): Promise<RecipeInfoDTO> {
  const data = await apiGet<BaseResponse<RecipeInfoDTO>>(`/recipes/${recipeId}`);
  return data.result;
}
