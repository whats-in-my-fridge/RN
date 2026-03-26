// useSuspenseQuery hook for fetching today's best matching recipe from fridge recommendations.
import { useSuspenseQuery } from "@tanstack/react-query";
import { FRIDGE_RECIPES_QUERY_KEY, getFridgeRecipes } from "../api/get-fridge-recipes";

export function useBestRecipe() {
  const { data } = useSuspenseQuery({
    queryKey: FRIDGE_RECIPES_QUERY_KEY,
    queryFn: getFridgeRecipes,
    select: (recipes) => recipes[0],
  });
  return data;
}
