import type { Ingredient, Recipe } from "@/entities/recipe/model/recipe.types";

/**
 * 레시피 상세 데이터를 조회하고 재료를 분류하는 훅.
 * 나중에 API 호출로 교체할 수 있도록 entities 레이어에서 관리합니다.
 */
export function useRecipeDetail(recipeId: string, recipesMap: Record<string, Recipe>) {
  const recipe = recipesMap[recipeId] ?? null;

  const ownedIngredients: Ingredient[] = recipe?.ingredients.filter((i) => i.owned) ?? [];
  const missingIngredients: Ingredient[] = recipe?.ingredients.filter((i) => !i.owned) ?? [];

  return { recipe, ownedIngredients, missingIngredients };
}
