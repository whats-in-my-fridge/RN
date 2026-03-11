import { useMemo, useState } from "react";

import type { RecipeCardData } from "@/entities/recipe";
import type { Category } from "@/shared/ui/CategoryFilter";

/**
 * 레시피 검색 & 카테고리 필터링 로직을 캡슐화하는 훅.
 * 페이지에서 비즈니스 로직을 분리하여 features 레이어에서 관리합니다.
 */
export function useSearchRecipe(recipes: RecipeCardData[]) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

  const filteredRecipes = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    return recipes.filter((recipe) => {
      const matchesCategory = selectedCategory === "전체" || recipe.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        recipe.title.toLowerCase().includes(lowercasedQuery) ||
        recipe.missingIngredients.some((i) => i.toLowerCase().includes(lowercasedQuery));
      return matchesCategory && matchesSearch;
    });
  }, [recipes, searchQuery, selectedCategory]);

  return {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    filteredRecipes,
  };
}
