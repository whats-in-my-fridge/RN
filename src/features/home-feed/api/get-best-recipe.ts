// Mock API for today's best matching recipe. Replace with real endpoint when available.
import type { RecipeCardData } from "@/entities/recipe";

export async function getBestRecipe(): Promise<RecipeCardData> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return {
    recipeId: 1,
    title: "달걀 볶음밥",
    thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
    category: "한식",
    matchRate: 85,
    missingIngredients: ["밥", "계란", "간장"],
    cookTime: "15분",
    difficulty: "아무나",
    isLiked: false,
  };
}
