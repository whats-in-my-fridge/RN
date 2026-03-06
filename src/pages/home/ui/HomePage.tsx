// Home page screen: assembles header, status bar, best-match banner, and recipe grid.
import { router } from "expo-router";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { BannerFoodCard } from "@/entities/recipe";
import { useBestRecipe, useRecommendedRecipes } from "@/features/home-feed";
import { RecipeLikedButton } from "@/features/recipe-liked-button";
import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";
import { SectionHeader } from "@/shared/ui/section-header";
import { FridgeStatusBar } from "@/widgets/fridge-status-bar";
import { RecipeList } from "@/widgets/RecipeList";

const ALERT_STUB = () => alert("준비중입니다");

export function HomePage() {
  const { data: bestRecipe, isLoading: isBestLoading } = useBestRecipe();
  const { data: recommendedRecipes, isLoading: isRecommendedLoading } = useRecommendedRecipes();

  return (
    <SafeAreaView className="flex-1 bg-surface-app">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 */}
        <View className="flex-row items-center justify-between px-screen py-4">
          <Text className="text-xl font-extrabold text-content-primary">민지님의 냉장고</Text>
          <View>
            <IconSymbol name="bell" size={24} color={tokens.color["content-primary"]} />
            <View
              className="absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full"
              style={{ backgroundColor: tokens.color["status-expiring"] }}
            >
              <Text className="text-[9px] font-bold text-white">3</Text>
            </View>
          </View>
        </View>

        {/* 냉장고 현황 */}
        <FridgeStatusBar />

        {/* 오늘의 베스트 매칭 */}
        <SectionHeader title="오늘의 베스트 매칭" onMore={ALERT_STUB} />
        <View className="mb-6 px-screen">
          {isBestLoading || !bestRecipe ? (
            <View className="h-56 items-center justify-center rounded-2xl bg-surface-card">
              <ActivityIndicator color={tokens.color.primary} />
            </View>
          ) : (
            <BannerFoodCard
              recipe={bestRecipe}
              onPress={ALERT_STUB}
              likeButton={
                <RecipeLikedButton
                  recipeId={bestRecipe.recipeId}
                  initialLiked={bestRecipe.isLiked}
                />
              }
            />
          )}
        </View>

        {/* 지금 바로 만들 수 있어요 */}
        <SectionHeader title="지금 바로 만들 수 있어요" onMore={ALERT_STUB} />
        <View className="mb-6 px-screen">
          {isRecommendedLoading || !recommendedRecipes ? (
            <View className="h-56 items-center justify-center">
              <ActivityIndicator color={tokens.color.primary} />
            </View>
          ) : (
            <RecipeList recipes={recommendedRecipes} />
          )}
        </View>

        {/* 레시피 더보기 */}
        <View className="px-screen">
          <Pressable
            className="w-full items-center rounded-2xl border py-3 active:opacity-70"
            style={{
              borderColor: tokens.color["stroke-default"],
              backgroundColor: tokens.color["surface-card"],
            }}
            onPress={() => router.push("/(tabs)/search")}
          >
            <Text className="text-sm font-semibold text-content-secondary">레시피 더보기 &gt;</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
