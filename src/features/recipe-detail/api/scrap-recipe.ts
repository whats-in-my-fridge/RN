// 레시피 찜하기/취소 API — POST/DELETE /recipes/{recipeId}/scrap

import type { BaseResponse, RecipeScrapDTO } from "@/entities/recipe/model/recipe-api.types";
import { apiDelete, apiPost } from "@/shared/api";

export async function scrapRecipe(recipeId: number): Promise<RecipeScrapDTO> {
  const data = await apiPost<BaseResponse<RecipeScrapDTO>>(`/recipes/${recipeId}/scrap`);
  return data.result;
}

export async function unscrapRecipe(recipeId: number): Promise<void> {
  await apiDelete<BaseResponse<null>>(`/recipes/${recipeId}/scrap`);
}
