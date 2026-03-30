// src/pages/search/ui/SearchPage.tsx
// 레시피 검색 페이지. 재료 태그 입력으로 포함/제외 필터링 지원.
// 태그 없을 때: 냉장고 재료 기반 추천 + 부족 재료 기반 다른 레시피 섹션.
// 태그 있을 때: 재료 키워드로 검색한 결과 목록.

import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";

import { useRecipeSearch } from "@/features/search-recipe";
import { usePreferencesStore } from "@/features/user-preferences";
import { tokens } from "@/shared/config/tokens";
import { IngredientTagInput } from "@/shared/ui/IngredientTagInput";
import { IconSymbol } from "@/shared/ui/icon-symbol";
import { RecipeList } from "@/widgets/RecipeList";
import { OthersSection, RecommendedSection } from "@/widgets/RecipeSearch";

export function SearchPage() {
  const router = useRouter();
  const { allergies } = usePreferencesStore();
  const {
    tags,
    addTag,
    removeTag,
    clearTags,
    hasActiveTags,
    fridgeIngredients,
    isFridgeIngredientsLoading,
    addFridgeIngredientTags,
    fridgeRecipes,
    missingRecipes,
    searchResults,
    isLoading,
    isError,
  } = useRecipeSearch({ externalExcludeIngredients: allergies });

  const handlePressRecipe = (recipe: { recipeId: number }) =>
    router.push(`/recipe/${recipe.recipeId}`);

  return (
    <ScrollView
      className="flex-1 bg-surface-app"
      contentContainerClassName="pb-24 px-screen pt-14"
      showsVerticalScrollIndicator={false}
    >
      {/* 헤더 */}
      <Text className="mb-4 text-3xl font-extrabold text-content-primary">레시피</Text>

      {/* 재료 태그 입력 */}
      <IngredientTagInput tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />

      {/* 전체 지우기 버튼 */}
      {hasActiveTags && (
        <Pressable className="mt-2 self-end active:opacity-70" onPress={clearTags}>
          <Text className="text-xs text-content-muted">전체 지우기</Text>
        </Pressable>
      )}

      {/* 냉장고 재료로 검색 버튼 */}
      {!isFridgeIngredientsLoading && !hasActiveTags && (
        <Pressable
          className="mt-2 w-full flex-row items-center gap-3 rounded-2xl bg-surface-card px-4 py-3 active:opacity-70"
          onPress={fridgeIngredients.length > 0 ? addFridgeIngredientTags : undefined}
          disabled={fridgeIngredients.length === 0}
        >
          <IconSymbol name="square.stack.fill" size={22} color={tokens.color.primary} />
          <View className="flex-1">
            <Text className="text-sm font-semibold text-content-primary">냉장고 재료로 검색</Text>
            <Text className="mt-0.5 text-xs text-content-muted">
              {fridgeIngredients.length > 0
                ? `내 냉장고 재료 ${fridgeIngredients.length}개로 검색하기`
                : "냉장고에 재료가 없어요"}
            </Text>
          </View>
          {fridgeIngredients.length > 0 && (
            <IconSymbol name="chevron.right" size={16} color={tokens.color["content-muted"]} />
          )}
        </Pressable>
      )}

      {/* 로딩 */}
      {isLoading && (
        <View className="mt-20 items-center">
          <ActivityIndicator color={tokens.color["content-primary"]} />
        </View>
      )}

      {/* 에러 */}
      {isError && !isLoading && (
        <View className="mt-20 items-center gap-3">
          <Text className="text-sm text-content-muted">레시피를 불러오지 못했습니다.</Text>
        </View>
      )}

      {!isLoading && !isError && (
        <>
          {/* 태그 검색 중: 결과 카운트 */}
          {hasActiveTags && (
            <Text className="mb-2 mt-4 text-xs text-content-secondary">
              검색 결과 {searchResults.length}개
            </Text>
          )}

          {/* 검색 결과 없음 */}
          {hasActiveTags && searchResults.length === 0 && (
            <View className="mt-20 items-center gap-3">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-surface-section">
                <IconSymbol
                  name="magnifyingglass"
                  size={24}
                  color={tokens.color["content-muted"]}
                />
              </View>
              <Text className="text-sm text-content-muted">검색 결과가 없습니다</Text>
            </View>
          )}

          {/* 태그 검색 결과 */}
          {hasActiveTags && searchResults.length > 0 && (
            <View className="mt-4">
              <RecipeList recipes={searchResults} onPressRecipe={handlePressRecipe} />
            </View>
          )}

          {/* 태그 없을 때: 냉장고 재료 추천 섹션 */}
          {!hasActiveTags && fridgeRecipes.length > 0 && (
            <RecommendedSection recipes={fridgeRecipes} onPressRecipe={handlePressRecipe} />
          )}

          {/* 태그 없을 때: 다른 레시피 섹션 */}
          {!hasActiveTags && missingRecipes.length > 0 && (
            <OthersSection recipes={missingRecipes} onPressRecipe={handlePressRecipe} />
          )}

          {/* 태그 없을 때: 추천 레시피 없음 */}
          {!hasActiveTags && fridgeRecipes.length === 0 && missingRecipes.length === 0 && (
            <View className="mt-20 items-center gap-3">
              <View className="h-14 w-14 items-center justify-center rounded-2xl bg-surface-section">
                <IconSymbol name="fork.knife" size={24} color={tokens.color["content-muted"]} />
              </View>
              <Text className="text-sm text-content-muted">추천 레시피가 없습니다</Text>
              <Text className="text-xs text-content-muted">냉장고에 재료를 추가해 보세요</Text>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}
