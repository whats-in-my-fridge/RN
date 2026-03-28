// 레시피 검색 페이지용 React Query 훅 모음
// - 태그 없을 때: 냉장고 기반 추천 + 부족 재료 기반 추천
// - 태그 있을 때: 재료 키워드 검색 (include → keyword, exclude → excludeIngredients)

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toRecipeCardData } from "@/entities/recipe";
import type { IngredientTag } from "@/shared/ui/IngredientTagInput";
import { getFridgeIngredients } from "../api/get-fridge-ingredients";
import { getFridgeRecipes } from "../api/get-fridge-recipes";
import { getMissingRecipes } from "../api/get-missing-recipes";
import { searchRecipes } from "../api/search-recipes";

export const FRIDGE_INGREDIENTS_QUERY_KEY = ["fridge", "ingredients"] as const;
export const FRIDGE_RECIPES_QUERY_KEY = ["recipes", "fridge"] as const;
export const MISSING_RECIPES_QUERY_KEY = ["recipes", "fridge", "missing"] as const;
export const SEARCH_RECIPES_QUERY_KEY = (keyword: string, excludeIngredients: string[]) =>
  ["recipes", "search", keyword, excludeIngredients] as const;

export function useRecipeSearch() {
  const [tags, setTags] = useState<IngredientTag[]>([]);

  const includeTags = tags.filter((t) => t.type === "include");
  const excludeTags = tags.filter((t) => t.type === "exclude");
  const hasActiveTags = tags.length > 0;

  const keyword = includeTags.map((t) => t.label).join(",");
  const excludeIngredients = excludeTags.map((t) => t.label);

  function addTag(tag: IngredientTag) {
    setTags((prev) =>
      prev.some((t) => t.label === tag.label && t.type === tag.type) ? prev : [...prev, tag],
    );
  }

  function removeTag(id: string) {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  function clearTags() {
    setTags([]);
  }

  const fridgeIngredientsQuery = useQuery({
    queryKey: FRIDGE_INGREDIENTS_QUERY_KEY,
    queryFn: getFridgeIngredients,
  });

  function addFridgeIngredientTags() {
    const items = fridgeIngredientsQuery.data ?? [];
    for (const item of items) {
      addTag({ id: `fridge-${item.id}`, label: item.name, type: "include" });
    }
  }

  const fridgeQuery = useQuery({
    queryKey: FRIDGE_RECIPES_QUERY_KEY,
    queryFn: () => getFridgeRecipes().then((items) => items.map(toRecipeCardData)),
    enabled: !hasActiveTags,
  });

  const missingQuery = useQuery({
    queryKey: MISSING_RECIPES_QUERY_KEY,
    queryFn: () => getMissingRecipes().then((items) => items.map(toRecipeCardData)),
    enabled: !hasActiveTags,
  });

  const searchQuery = useQuery({
    queryKey: SEARCH_RECIPES_QUERY_KEY(keyword, excludeIngredients),
    queryFn: () =>
      searchRecipes({ keyword, excludeIngredients }).then((items) => items.map(toRecipeCardData)),
    enabled: hasActiveTags,
  });

  return {
    tags,
    addTag,
    removeTag,
    clearTags,
    hasActiveTags,
    fridgeIngredients: fridgeIngredientsQuery.data ?? [],
    isFridgeIngredientsLoading: fridgeIngredientsQuery.isLoading,
    addFridgeIngredientTags,
    fridgeRecipes: fridgeQuery.data ?? [],
    missingRecipes: missingQuery.data ?? [],
    searchResults: (searchQuery.data ?? []).map((recipe) => {
      const includeSet = new Set(includeTags.map((t) => t.label));
      const allIngredients = recipe.allIngredients ?? [];
      return {
        ...recipe,
        allIngredients: [
          ...allIngredients.filter((i) => includeSet.has(i)),
          ...allIngredients.filter((i) => !includeSet.has(i)),
        ],
      };
    }),
    isLoading: hasActiveTags
      ? searchQuery.isLoading
      : fridgeQuery.isLoading || missingQuery.isLoading,
    isError: hasActiveTags ? searchQuery.isError : fridgeQuery.isError || missingQuery.isError,
  };
}
