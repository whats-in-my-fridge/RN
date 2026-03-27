// 재료 키워드 기반 레시피 검색 API — GET /recipes/recommend/search

import type { RecipeDTO } from "@/entities/recipe";
import type { BaseResponse } from "@/entities/recipe/model/recipe-api.types";
import { apiGet } from "@/shared/api";

export type SearchParams = {
  keyword?: string;
  excludeIngredients?: string[];
  sort?: string;
};

export async function searchRecipes(params: SearchParams): Promise<RecipeDTO[]> {
  const data = await apiGet<BaseResponse<RecipeDTO[]>>("/recipes/recommend/search", { params });
  return data.result;
}
