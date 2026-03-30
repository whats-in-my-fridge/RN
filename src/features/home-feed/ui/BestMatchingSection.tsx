// Best matching recipe section — displays first recipe from scrap recommendations as banner.

import { router } from "expo-router";
import { Text, View } from "react-native";

import { BannerFoodCard } from "@/entities/recipe";
import { RecipeLikedButton } from "@/features/recipe-liked-button";
import { useScrapRecommendedRecipes } from "../model/use-scrap-recommended-recipes";

export function BestMatchingSection() {
  const recipes = useScrapRecommendedRecipes();
  const bestRecipe = recipes?.[0];

  if (!bestRecipe) {
    return (
      <View className="h-56 items-center justify-center rounded-2xl bg-surface-card">
        <Text className="text-sm text-content-secondary">오늘 추천할 레시피가 없습니다</Text>
      </View>
    );
  }

  return (
    <BannerFoodCard
      recipe={bestRecipe}
      onPress={() => router.push(`/(protected)/recipe/${bestRecipe.recipeId}`)}
      likeButton={
        <RecipeLikedButton recipeId={bestRecipe.recipeId} initialLiked={bestRecipe.isLiked} />
      }
    />
  );
}
