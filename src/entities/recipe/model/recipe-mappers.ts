// BE RecipeDTO / RecipeInfoDTO → FE RecipeCardData / Recipe 변환 매퍼

import type { CookingStep, Ingredient, Recipe } from "./recipe.types";
import type { RecipeDTO, RecipeInfoDTO } from "./recipe-api.types";
import type { RecipeCardData } from "./types";

export function toRecipeCardData(dto: RecipeDTO): RecipeCardData {
  const missingSet = new Set(dto.missingIngredients);
  const _matched = dto.ingredients.map((i) => i.name).filter((name) => !missingSet.has(name));

  return {
    recipeId: dto.recipeId,
    title: dto.title,
    mainImage: dto.mainImage,
    category: "",
    matchRate:
      dto.ingredients.length > 0
        ? Math.round(
            (Math.max(0, dto.ingredients.length - dto.missingIngredients.length) /
              dto.ingredients.length) *
              100,
          )
        : 0,
    missingIngredients: dto.missingIngredients,
    cookTime: dto.cookTime,
    difficulty: dto.difficulty,
    isLiked: dto.isScrapped,
  };
}

function toDifficulty(val: string): "쉬움" | "보통" | "어려움" {
  if (val === "쉬움" || val === "보통" || val === "어려움") return val;
  return "보통";
}

export function toRecipe(dto: RecipeInfoDTO): Recipe {
  const ingredients: Ingredient[] = dto.ingredients.map((ing) => ({
    name: ing.name,
    // TODO: 냉장고 재료와 대조해 owned 구분 — 현재는 API에서 제공하지 않아 일괄 true 처리
    owned: true,
    amount: ing.amount ?? undefined,
  }));

  const steps: CookingStep[] = dto.steps.map((step) => ({
    step: step.order,
    description: step.content,
    duration: 0, // API 미제공
    imageUrl: step.image || undefined,
  }));

  return {
    id: String(dto.recipeId),
    title: dto.title,
    imageUrl: dto.mainImage,
    category: "",
    tags: [],
    cookingTime: Number.parseInt(dto.cookTime, 10) || 0,
    servings: Number.parseInt(dto.servings, 10) || 0,
    difficulty: toDifficulty(dto.difficulty),
    description: dto.description,
    ingredients,
    steps,
    isScrapped: dto.isScrapped,
  };
}
