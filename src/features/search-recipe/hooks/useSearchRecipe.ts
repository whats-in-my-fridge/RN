// src/features/search-recipe/hooks/useSearchRecipe.ts
// 재료 태그 기반 레시피 검색 & 카테고리 필터링 훅.
// 포함 태그(include): 하나라도 매칭되는 레시피만 노출.
// 제외 태그(exclude): missingIngredients에 해당 재료가 있는 레시피 제외 (클라이언트 필터링).

import { useMemo, useState } from "react";

import type { RecipeCardData } from "@/entities/recipe";
import type { Category } from "@/shared/ui/CategoryFilter";
import type { IngredientTag } from "@/shared/ui/IngredientTagInput";

export function useSearchRecipe(recipes: RecipeCardData[]) {
  const [tags, setTags] = useState<IngredientTag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

  function addTag(tag: IngredientTag) {
    setTags((prev) =>
      prev.some((t) => t.label === tag.label && t.type === tag.type) ? prev : [...prev, tag],
    );
  }

  function removeTag(id: string) {
    setTags((prev) => prev.filter((t) => t.id !== id));
  }

  const filteredRecipes = useMemo(() => {
    const includeTags = tags.filter((t) => t.type === "include");
    const excludeTags = tags.filter((t) => t.type === "exclude");

    return recipes.filter((recipe) => {
      if (selectedCategory !== "전체" && recipe.category !== selectedCategory) return false;

      if (includeTags.length > 0) {
        const matched = includeTags.some(
          (t) =>
            recipe.title.includes(t.label) ||
            recipe.missingIngredients.some((i) => i.includes(t.label)),
        );
        if (!matched) return false;
      }

      if (excludeTags.length > 0) {
        const hasExcluded = excludeTags.some((t) =>
          recipe.missingIngredients.some((i) => i.includes(t.label)),
        );
        if (hasExcluded) return false;
      }

      return true;
    });
  }, [recipes, tags, selectedCategory]);

  return {
    tags,
    addTag,
    removeTag,
    selectedCategory,
    setSelectedCategory,
    filteredRecipes,
  };
}
