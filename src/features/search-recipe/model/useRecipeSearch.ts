// 레시피 검색 페이지용 React Query 훅 모음
// - 태그 없을 때: 냉장고 기반 추천 + 부족 재료 기반 추천
// - 태그 있을 때: 재료 키워드 검색 (include → keyword, exclude → excludeIngredients)

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { RecipeCardData } from "@/entities/recipe";
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

// 제외 재료 목록을 기준으로 부분 문자열 매칭 필터링 (백엔드 exact match 보완)
// allIngredients(보유)와 missingIngredients(미보유) 전체 대상으로 체크
// TODO: 백엔드 excludeIngredients가 부분 문자열 매칭을 지원하면 이 함수와 호출부 제거
function filterByExcluded(recipes: RecipeCardData[], excludeList: string[]): RecipeCardData[] {
  if (excludeList.length === 0) return recipes;
  return recipes.filter((recipe) => {
    const all = [...(recipe.allIngredients ?? []), ...(recipe.missingIngredients ?? [])];
    return !excludeList.some((excl) => all.some((ing) => ing.includes(excl)));
  });
}

export function useRecipeSearch({
  externalExcludeIngredients = [],
}: {
  externalExcludeIngredients?: string[];
} = {}) {
  const [tags, setTags] = useState<IngredientTag[]>([]);

  const includeTags = tags.filter((t) => t.type === "include");
  const excludeTags = tags.filter((t) => t.type === "exclude");
  const hasActiveTags = tags.length > 0;

  const keyword = includeTags.map((t) => t.label).join(",");
  const excludeIngredients = excludeTags.map((t) => t.label);
  const allExcludeIngredients = [...excludeIngredients, ...externalExcludeIngredients];

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
    fridgeIngredients: [
      ...new Map((fridgeIngredientsQuery.data ?? []).map((i) => [i.name, i])).values(),
    ],
    isFridgeIngredientsLoading: fridgeIngredientsQuery.isLoading,
    addFridgeIngredientTags,
    fridgeRecipes: filterByExcluded(fridgeQuery.data ?? [], allExcludeIngredients),
    missingRecipes: filterByExcluded(missingQuery.data ?? [], allExcludeIngredients),
    searchResults: filterByExcluded(searchQuery.data ?? [], allExcludeIngredients).map((recipe) => {
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
