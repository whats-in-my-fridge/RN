// Real API for fridge-based recipe recommendations. Fetches recipes from /recipes/recommend/fridge endpoint.
import type { RecipeCardData } from "@/entities/recipe";
import { apiGet } from "@/shared/api";

// BE RecipeDTO - raw response from /recipes/recommend/fridge
export interface RecipeDTO {
  recipeId: number;
  title: string;
  description: string;
  mainImage: string;
  cookTime: string;
  difficulty: string;
  servings: string;
  ingredients: Array<{
    name: string;
    amount?: string;
    bundle?: string;
  }>;
  missingIngredients: string[];
  isScrapped: boolean;
}

// BaseResponse wrapper
interface FridgeRecipesRes {
  isSuccess: boolean;
  code: string;
  message: string;
  result: RecipeDTO[];
}

// Mapper: RecipeDTO → RecipeCardData
export function toRecipeCardData(dto: RecipeDTO): RecipeCardData {
  return {
    recipeId: dto.recipeId,
    title: dto.title,
    mainImage: dto.mainImage,
    missingIngredients: dto.missingIngredients,
    cookTime: dto.cookTime,
    difficulty: dto.difficulty,
    isLiked: dto.isScrapped,
    // category, matchRate are unavailable in BE; left undefined
  };
}

// Shared query key
export const FRIDGE_RECIPES_QUERY_KEY = ["recipes", "recommend", "fridge"] as const;

// Main API function: GET /recipes/recommend/fridge
export async function getFridgeRecipes(): Promise<RecipeCardData[]> {
  const response = await apiGet<FridgeRecipesRes>("/recipes/recommend/fridge");

  if (process.env.NODE_ENV === "development") {
    console.log("[getFridgeRecipes] Response:", response);
  }

  return response.result.map(toRecipeCardData);
}
