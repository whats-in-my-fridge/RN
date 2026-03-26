// useSuspenseQuery hook for fetching recommended recipes grid from fridge recommendations.
import { useSuspenseQuery } from "@tanstack/react-query";
import { FRIDGE_RECIPES_QUERY_KEY, getFridgeRecipes } from "../api/get-fridge-recipes";

export function useRecommendedRecipes() {
  const { data } = useSuspenseQuery({
    queryKey: FRIDGE_RECIPES_QUERY_KEY,
    queryFn: getFridgeRecipes,
  });
  return data;
}
