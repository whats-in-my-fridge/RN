// GET /recipes/recommend/scraps — 찜한 레시피 기반 추천 레시피 5개를 반환한다.

import type { RecipeCardData } from "@/entities/recipe";
import { apiGet } from "@/shared/api";

type ScrapRecipeData = {
  recipeId: number;
  title: string;
  mainImage: string;
  category?: string;
  matchRate?: number;
  missingIngredients: string[];
  cookTime: string;
  difficulty: string;
  isLiked?: boolean;
};

type GetScrapRecommendedRes = {
  message: string;
  result: ScrapRecipeData[];
};

export async function getScrapRecommendedRecipes(): Promise<RecipeCardData[]> {
  if (__DEV__) console.log("[GET /recipes/recommend/scraps] request");
  const data = await apiGet<GetScrapRecommendedRes>("/recipes/recommend/scraps");
  if (__DEV__)
    console.log("[GET /recipes/recommend/scraps] response", JSON.stringify(data, null, 2));

  // 응답 데이터를 RecipeCardData로 매핑
  return data.result.map((recipe) => ({
    recipeId: recipe.recipeId,
    title: recipe.title,
    mainImage: recipe.mainImage,
    category: recipe.category,
    matchRate: recipe.matchRate,
    missingIngredients: recipe.missingIngredients,
    cookTime: recipe.cookTime,
    difficulty: recipe.difficulty,
    isLiked: recipe.isLiked,
  }));
}
