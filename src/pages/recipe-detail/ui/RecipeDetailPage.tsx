// src/pages/recipe-detail/ui/RecipeDetailPage.tsx
// 레시피 상세 페이지. 히어로 이미지, 메타 정보, 재료, 조리 순서를 순서대로 표시.

import { ActivityIndicator, ScrollView, Text, View } from "react-native";

import { useRecipeDetailQuery, useRecipeScrap } from "@/features/recipe-detail";
import { tokens } from "@/shared/config/tokens";
import { RecipeHero, RecipeIngredients, RecipeMeta, RecipeSteps } from "@/widgets/RecipeDetail";

interface RecipeDetailPageProps {
  recipeId: string;
}

export function RecipeDetailPage({ recipeId }: RecipeDetailPageProps) {
  const numericId = Number(recipeId);
  const { data: recipe, isLoading, isError } = useRecipeDetailQuery(numericId);
  const { toggleScrap, isPending: isScrapPending } = useRecipeScrap(numericId);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <ActivityIndicator color={tokens.color["content-primary"]} />
      </View>
    );
  }

  if (isError || !recipe) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <Text className="text-base text-content-secondary">레시피를 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const ownedIngredients = recipe.ingredients.filter((i) => i.owned);
  const missingIngredients = recipe.ingredients.filter((i) => !i.owned);

  return (
    <ScrollView className="flex-1 bg-surface-app" showsVerticalScrollIndicator={false}>
      <RecipeHero
        recipe={recipe}
        onToggleScrap={() => toggleScrap(recipe.isScrapped)}
        isScrapPending={isScrapPending}
      />

      <View className="px-screen py-6">
        <RecipeMeta recipe={recipe} />

        <View className="my-6 h-px bg-stroke-default" />

        <RecipeIngredients owned={ownedIngredients} missing={missingIngredients} />

        <View className="my-6 h-px bg-stroke-default" />

        <RecipeSteps steps={recipe.steps} />
      </View>
    </ScrollView>
  );
}
