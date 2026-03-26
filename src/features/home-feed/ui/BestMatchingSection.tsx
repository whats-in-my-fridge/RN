// Best matching recipe section with direct data fetching (Suspense-ready).

import { Text, View } from "react-native";
import { BannerFoodCard } from "@/entities/recipe";
import { RecipeLikedButton } from "@/features/recipe-liked-button";
import { useBestRecipe } from "../model/use-best-recipe";

const ALERT_STUB = () => alert("준비중입니다");

export function BestMatchingSection() {
  const bestRecipe = useBestRecipe();

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
      onPress={ALERT_STUB}
      likeButton={
        <RecipeLikedButton recipeId={bestRecipe.recipeId} initialLiked={bestRecipe.isLiked} />
      }
    />
  );
}
