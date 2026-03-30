// src/pages/recipe-detail/ui/RecipeDetailPage.tsx
// 레시피 상세 페이지. 히어로 이미지, 메타 정보, 재료, 조리 순서를 순서대로 표시.

import { router } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRecipeDetailQuery, useRecipeScrap } from "@/features/recipe-detail";
import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";
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
      <SafeAreaView className="flex-1 items-center justify-center bg-surface-app">
        <ActivityIndicator color={tokens.color["content-primary"]} />
      </SafeAreaView>
    );
  }

  if (isError || !recipe) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-surface-app">
        <Text className="text-base text-content-secondary">레시피를 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  const ownedIngredients = recipe.ingredients.filter((i) => i.owned);
  const missingIngredients = recipe.ingredients.filter((i) => !i.owned);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface-app">
      {/* 헤더 */}
      <View className="flex-row items-center justify-between px-5 py-4">
        <Pressable onPress={() => router.back()}>
          <IconSymbol name="chevron.left" size={24} color={tokens.color["content-primary"]} />
        </Pressable>
        <Text className="flex-1 text-center text-xl font-semibold text-content-primary">
          레시피 상세
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
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
    </SafeAreaView>
  );
}
