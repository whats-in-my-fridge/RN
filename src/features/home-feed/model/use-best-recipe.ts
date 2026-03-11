// useQuery hook for fetching today's best matching recipe.
import { useQuery } from "@tanstack/react-query";
import { getBestRecipe } from "../api/get-best-recipe";

export function useBestRecipe() {
  return useQuery({
    queryKey: ["best-recipe"],
    queryFn: getBestRecipe,
  });
}
