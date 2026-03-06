// Home page screen: assembles header, status bar, best-match banner, and recipe grid.
import { router } from "expo-router";
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";

import { BannerFoodCard, DefaultFoodCard } from "@/entities/recipe";
import { useBestRecipe, useRecommendedRecipes } from "@/features/home-feed";
import { RecipeLikedButton } from "@/features/recipe-liked-button";
import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

const STATUS_ITEMS = [
  { label: "총 재료", value: "23개", color: tokens.color["content-primary"] },
  { label: "임박", value: "5개", color: tokens.color["status-expiring"] },
  { label: "찐레시피", value: "12개", color: tokens.color["content-primary"] },
  { label: "추천", value: "4개", color: tokens.color["content-primary"] },
] as const;

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
        {/* Header */}
        <View className="flex-row items-center justify-between px-screen pb-4 pt-4">
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

        {/* Status bar */}
        <View className="mx-screen mb-6 flex-row rounded-2xl bg-surface-card px-2 py-3">
          {STATUS_ITEMS.map((item, index) => (
            <View
              key={item.label}
              className="flex-1 items-center"
              style={
                index < STATUS_ITEMS.length - 1
                  ? { borderRightWidth: 1, borderRightColor: tokens.color["stroke-default"] }
                  : undefined
              }
            >
              <Text className="text-base font-extrabold" style={{ color: item.color }}>
                {item.value}
              </Text>
              <Text className="mt-0.5 text-xs text-content-secondary">{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Section: 오늘의 베스트 매칭 */}
        <View className="mb-3 flex-row items-center justify-between px-screen">
          <View className="flex-row items-center gap-1">
            <Text className="text-lg font-extrabold text-content-primary">오늘의 베스트 매칭</Text>
          </View>
          <Pressable onPress={() => alert("준비중입니다")}>
            <Text className="text-sm font-medium text-content-secondary">더보기 &gt;</Text>
          </Pressable>
        </View>

        <View className="mb-6 px-screen">
          {isBestLoading || !bestRecipe ? (
            <View className="h-56 items-center justify-center rounded-2xl bg-surface-card">
              <ActivityIndicator color={tokens.color.primary} />
            </View>
          ) : (
            <BannerFoodCard
              recipe={bestRecipe}
              onPress={() => alert("준비중입니다")}
              likeButton={
                <RecipeLikedButton
                  recipeId={bestRecipe.recipeId}
                  initialLiked={bestRecipe.isLiked}
                />
              }
            />
          )}
        </View>

        {/* Section: 지금 바로 만들 수 있어요 */}
        <View className="mb-3 flex-row items-center justify-between px-screen">
          <Text className="text-lg font-extrabold text-content-primary">
            지금 바로 만들 수 있어요
          </Text>
          <Pressable onPress={() => alert("준비중입니다")}>
            <Text className="text-sm font-medium text-content-secondary">더보기 &gt;</Text>
          </Pressable>
        </View>

        <View className="mb-6 px-screen">
          {isRecommendedLoading || !recommendedRecipes ? (
            <View className="h-56 items-center justify-center">
              <ActivityIndicator color={tokens.color.primary} />
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-3">
              {recommendedRecipes.map((recipe) => (
                <View key={recipe.recipeId} style={{ width: "47.5%" }}>
                  <DefaultFoodCard
                    recipe={recipe}
                    onPress={() => alert("준비중입니다")}
                    likeButton={
                      <RecipeLikedButton recipeId={recipe.recipeId} initialLiked={recipe.isLiked} />
                    }
                  />
                </View>
              ))}
            </View>
          )}
        </View>

        {/* 레시피 더보기 버튼 */}
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
