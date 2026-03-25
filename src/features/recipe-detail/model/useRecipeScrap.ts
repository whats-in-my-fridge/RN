// 레시피 찜하기/취소 mutation 훅

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scrapRecipe, unscrapRecipe } from "../api/scrap-recipe";
import { RECIPE_DETAIL_QUERY_KEY } from "./useRecipeDetail";

export function useRecipeScrap(recipeId: number) {
  const queryClient = useQueryClient();

  const scrapMutation = useMutation({
    mutationFn: () => scrapRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
    },
  });

  const unscrapMutation = useMutation({
    mutationFn: () => unscrapRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
    },
  });

  function toggleScrap(isScrapped: boolean) {
    if (isScrapped) {
      unscrapMutation.mutate();
    } else {
      scrapMutation.mutate();
    }
  }

  return {
    toggleScrap,
    isPending: scrapMutation.isPending || unscrapMutation.isPending,
  };
}
