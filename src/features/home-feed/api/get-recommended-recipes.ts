// Mock API for recommended recipes grid. Replace with real endpoint when available.
import type { RecipeCardData } from "@/entities/recipe";

export async function getRecommendedRecipes(): Promise<RecipeCardData[]> {
  await new Promise((resolve) => setTimeout(resolve, 250));

  return [
    {
      recipeId: 2,
      title: "김치찌개",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
      category: "한식",
      matchRate: 92,
      missingIngredients: ["김치", "돼지고기"],
      cookTime: "25분",
      difficulty: "아무나",
      isLiked: true,
    },
    {
      recipeId: 3,
      title: "된장찌개",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
      category: "한식",
      matchRate: 78,
      missingIngredients: ["된장", "두부", "호박"],
      cookTime: "20분",
      difficulty: "아무나",
      isLiked: false,
    },
    {
      recipeId: 4,
      title: "계란국",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
      category: "한식",
      matchRate: 95,
      missingIngredients: ["계란", "대파"],
      cookTime: "10분",
      difficulty: "아무나",
      isLiked: false,
    },
    {
      recipeId: 5,
      title: "오므라이스",
      thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
      category: "양식",
      matchRate: 70,
      missingIngredients: ["밥", "계란", "케찹"],
      cookTime: "20분",
      difficulty: "초보",
      isLiked: false,
    },
  ];
}
