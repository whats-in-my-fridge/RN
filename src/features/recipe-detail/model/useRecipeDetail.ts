// 레시피 상세 조회 React Query 훅

import { useQuery } from "@tanstack/react-query";
import { toRecipe } from "@/entities/recipe";
import { getRecipeDetail } from "../api/get-recipe-detail";

export const RECIPE_DETAIL_QUERY_KEY = (recipeId: number) =>
  ["recipes", "detail", recipeId] as const;

export function useRecipeDetailQuery(recipeId: number) {
  return useQuery({
    queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId),
    queryFn: () => getRecipeDetail(recipeId).then(toRecipe),
    enabled: recipeId > 0,
  });
}
