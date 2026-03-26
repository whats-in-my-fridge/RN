// API for today's best matching recipe. Returns first recipe from fridge recommendations.
import type { RecipeCardData } from "@/entities/recipe";
import { getFridgeRecipes } from "./get-fridge-recipes";

export async function getBestRecipe(): Promise<RecipeCardData | undefined> {
  const recipes = await getFridgeRecipes();
  return recipes[0];
}
