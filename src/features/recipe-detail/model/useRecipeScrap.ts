// 레시피 찜하기/취소 mutation 훅 (낙관적 업데이트 적용)

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Recipe } from "@/entities/recipe";
import { scrapRecipe, unscrapRecipe } from "@/entities/recipe";
import { RECIPE_DETAIL_QUERY_KEY } from "./useRecipeDetail";

export function useRecipeScrap(recipeId: number) {
  const queryClient = useQueryClient();

  const onSettled = () => {
    queryClient.invalidateQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
  };

  const scrapMutation = useMutation({
    mutationFn: () => scrapRecipe(recipeId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
      const previous = queryClient.getQueryData<Recipe>(RECIPE_DETAIL_QUERY_KEY(recipeId));
      if (previous) {
        queryClient.setQueryData(RECIPE_DETAIL_QUERY_KEY(recipeId), {
          ...previous,
          isScrapped: true,
        });
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(RECIPE_DETAIL_QUERY_KEY(recipeId), context.previous);
      }
    },
    onSettled,
  });

  const unscrapMutation = useMutation({
    mutationFn: () => unscrapRecipe(recipeId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: RECIPE_DETAIL_QUERY_KEY(recipeId) });
      const previous = queryClient.getQueryData<Recipe>(RECIPE_DETAIL_QUERY_KEY(recipeId));
      if (previous) {
        queryClient.setQueryData(RECIPE_DETAIL_QUERY_KEY(recipeId), {
          ...previous,
          isScrapped: false,
        });
      }
      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(RECIPE_DETAIL_QUERY_KEY(recipeId), context.previous);
      }
    },
    onSettled,
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
