// src/pages/recipe-detail/ui/RecipeDetailPage.tsx
// 레시피 상세 페이지. 히어로 이미지, 메타 정보, 재료, 조리 순서를 순서대로 표시.

import { ScrollView, Text, View } from "react-native";

import { MOCK_DETAIL_RECIPES } from "@/entities/recipe/model/mockDetailRecipes";
import { useRecipeDetail } from "@/entities/recipe/model/useRecipeDetail";
import { RecipeHero, RecipeIngredients, RecipeMeta, RecipeSteps } from "@/widgets/RecipeDetail";

interface RecipeDetailPageProps {
  recipeId: string;
}

export function RecipeDetailPage({ recipeId }: RecipeDetailPageProps) {
  const { recipe, ownedIngredients, missingIngredients } = useRecipeDetail(
    recipeId,
    MOCK_DETAIL_RECIPES,
  );

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <Text className="text-base text-content-secondary">레시피를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-surface-app" showsVerticalScrollIndicator={false}>
      {/* 히어로 이미지 */}
      <RecipeHero recipe={recipe} />

      <View className="px-screen py-6">
        {/* 메타 정보 + 설명 */}
        <RecipeMeta recipe={recipe} />

        {/* 구분선 */}
        <View className="my-6 h-px bg-stroke-default" />

        {/* 재료 */}
        <RecipeIngredients owned={ownedIngredients} missing={missingIngredients} />

        {/* 구분선 */}
        <View className="my-6 h-px bg-stroke-default" />

        {/* 조리 순서 */}
        <RecipeSteps steps={recipe.steps} />
      </View>
    </ScrollView>
  );
}
