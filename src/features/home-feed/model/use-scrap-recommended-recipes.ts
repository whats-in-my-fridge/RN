// React Query hook for scrap-based recommended recipes.

import { useSuspenseQuery } from "@tanstack/react-query";
import type { RecipeCardData } from "@/entities/recipe";
import { getScrapRecommendedRecipes } from "../api/get-scrap-recommended-recipes";

export function useScrapRecommendedRecipes(): RecipeCardData[] {
  const { data } = useSuspenseQuery({
    queryKey: ["scrap-recommended-recipes"],
    queryFn: getScrapRecommendedRecipes,
  });

  return data;
}
