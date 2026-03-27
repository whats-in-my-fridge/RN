// API for recommended recipes grid. Returns all recipes from fridge recommendations.
import type { RecipeCardData } from "@/entities/recipe";
import { getFridgeRecipes } from "./get-fridge-recipes";

export async function getRecommendedRecipes(): Promise<RecipeCardData[]> {
  const recipes = await getFridgeRecipes();
  return recipes;
}
