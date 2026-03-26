// useQuery hook for fetching today's best matching recipe from fridge recommendations.
import { useQuery } from "@tanstack/react-query";
import { FRIDGE_RECIPES_QUERY_KEY, getFridgeRecipes } from "../api/get-fridge-recipes";

export function useBestRecipe() {
  return useQuery({
    queryKey: FRIDGE_RECIPES_QUERY_KEY,
    queryFn: getFridgeRecipes,
    select: (data) => data[0],
  });
}
