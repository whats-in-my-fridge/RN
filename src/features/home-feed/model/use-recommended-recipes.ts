// useQuery hook for fetching recommended recipes grid.
import { useQuery } from "@tanstack/react-query";
import { getRecommendedRecipes } from "../api/get-recommended-recipes";

export function useRecommendedRecipes() {
  return useQuery({
    queryKey: ["recommended-recipes"],
    queryFn: getRecommendedRecipes,
  });
}
