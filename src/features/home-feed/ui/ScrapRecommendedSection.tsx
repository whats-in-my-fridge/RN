// Scrap-based recommended recipes section — displays remaining 4 recipes as recipe list.

import { router } from "expo-router";
import { Text, View } from "react-native";

import type { RecipeCardData } from "@/entities/recipe";
import { RecipeList } from "@/widgets/RecipeList";
import { useScrapRecommendedRecipes } from "../model/use-scrap-recommended-recipes";

export function ScrapRecommendedSection() {
  const recipes = useScrapRecommendedRecipes();

  if (!recipes || recipes.length <= 1) {
    return (
      <View className="h-56 items-center justify-center">
        <Text className="text-sm text-content-secondary">추천할 레시피가 없습니다</Text>
      </View>
    );
  }

  // 나머지 4개 (첫 번째 제외)
  const remainingRecipes = recipes.slice(1, 5);

  const handlePressRecipe = (recipe: RecipeCardData) => {
    router.push(`/(protected)/recipe/${recipe.recipeId}`);
  };

  return <RecipeList recipes={remainingRecipes} onPressRecipe={handlePressRecipe} />;
}
