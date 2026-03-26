// useQuery hook for fetching recommended recipes grid from fridge recommendations.
import { useQuery } from "@tanstack/react-query";
import { FRIDGE_RECIPES_QUERY_KEY, getFridgeRecipes } from "../api/get-fridge-recipes";

export function useRecommendedRecipes() {
  return useQuery({
    queryKey: FRIDGE_RECIPES_QUERY_KEY,
    queryFn: getFridgeRecipes,
    select: (data) => data,
  });
}
