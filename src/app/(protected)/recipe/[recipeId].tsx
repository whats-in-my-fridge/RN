// src/app/(protected)/recipe/[recipeId].tsx
// 레시피 상세 화면 라우트. stack push로 진입.

import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

import { RecipeDetailPage } from "@/pages/recipe-detail/ui/RecipeDetailPage";

export default function RecipeDetailRoute() {
  const { recipeId } = useLocalSearchParams<{ recipeId: string }>();

  if (!recipeId || Array.isArray(recipeId)) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <Text className="text-base text-content-secondary">잘못된 접근입니다.</Text>
      </View>
    );
  }

  return <RecipeDetailPage recipeId={recipeId} />;
}
