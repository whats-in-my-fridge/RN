import { router } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { RecipeCardData } from "@/entities/recipe";
import { useScraps } from "@/features/liked-recipes";
import { tokens } from "@/shared/config/tokens";
import { BackButton } from "@/shared/ui/back-button";
import { RecipeList } from "@/widgets/RecipeList";

export function LikedRecipesPage() {
  const { data: recipes, isLoading } = useScraps();

  const handlePressRecipe = (recipe: RecipeCardData) => {
    router.push(`/recipe/${recipe.recipeId}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-app" edges={["top"]}>
      {/* 헤더 */}
      <View className="flex-row items-center px-screen py-4">
        <BackButton onPress={() => router.back()} variant="light" />
        <View className="ml-4 flex-1">
          <Text className="text-xl font-extrabold text-content-primary">좋아요한 레시피</Text>
          <Text className="mt-0.5 text-sm text-content-secondary">
            {recipes ? `${recipes.length}개의 레시피` : "0개의 레시피"}
          </Text>
        </View>
      </View>

      {/* 레시피 그리드 */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: tokens.spacing.screen, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View className="min-h-48 items-center justify-center py-12">
            <ActivityIndicator color={tokens.color.primary} size="large" />
          </View>
        ) : recipes && recipes.length > 0 ? (
          <RecipeList recipes={recipes} onPressRecipe={handlePressRecipe} />
        ) : (
          <View className="min-h-48 items-center justify-center py-12">
            <Text className="text-base text-content-secondary">저장한 레시피가 없어요</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
