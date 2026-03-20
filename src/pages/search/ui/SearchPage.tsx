// src/pages/search/ui/SearchPage.tsx
// 레시피 검색 페이지. 재료 태그 입력으로 포함/제외 필터링 지원.
// 매칭률 기준으로 "냉장고 재료로 만들 수 있어요" 섹션과 "다른 레시피" 섹션을 분리해서 표시.

import { useRouter } from "expo-router";
import { ScrollView, Text, View } from "react-native";

import { MOCK_SEARCH_RECIPES } from "@/entities/recipe/model/mockSearchRecipes";
import { useSearchRecipe } from "@/features/search-recipe";
import { tokens } from "@/shared/config/tokens";
import { CategoryFilter } from "@/shared/ui/CategoryFilter";
import { IngredientTagInput } from "@/shared/ui/IngredientTagInput";
import { IconSymbol } from "@/shared/ui/icon-symbol";
import { RecipeList } from "@/widgets/RecipeList";
import { OthersSection, RecommendedSection } from "@/widgets/RecipeSearch";

const MATCH_RATE_THRESHOLD = 60;

export function SearchPage() {
  const router = useRouter();
  const { tags, addTag, removeTag, selectedCategory, setSelectedCategory, filteredRecipes } =
    useSearchRecipe(MOCK_SEARCH_RECIPES);

  const hasActiveTags = tags.length > 0;
  const recommended = filteredRecipes.filter((r) => (r.matchRate ?? 0) >= MATCH_RATE_THRESHOLD);
  const others = filteredRecipes.filter((r) => (r.matchRate ?? 0) < MATCH_RATE_THRESHOLD);

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

      {/* 카테고리 필터 */}
      <View className="mt-4">
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </View>

      {/* 태그 검색 중: 결과 카운트 */}
      {hasActiveTags && (
        <Text className="mb-2 mt-4 text-xs text-content-secondary">
          검색 결과 {filteredRecipes.length}개
        </Text>
      )}

      {/* 검색 결과 없음 */}
      {filteredRecipes.length === 0 && (
        <View className="mt-20 items-center gap-3">
          <View className="h-14 w-14 items-center justify-center rounded-2xl bg-surface-section">
            <IconSymbol name="magnifyingglass" size={24} color={tokens.color["content-muted"]} />
          </View>
          <Text className="text-sm text-content-muted">검색 결과가 없습니다</Text>
        </View>
      )}

      {/* 태그 검색 결과 */}
      {hasActiveTags && filteredRecipes.length > 0 && (
        <View className="mt-4">
          <RecipeList recipes={filteredRecipes} onPressRecipe={handlePressRecipe} />
        </View>
      )}

      {/* 태그 없을 때: 냉장고 재료 추천 섹션 */}
      {!hasActiveTags && recommended.length > 0 && (
        <RecommendedSection recipes={recommended} onPressRecipe={handlePressRecipe} />
      )}

      {/* 태그 없을 때: 다른 레시피 섹션 */}
      {!hasActiveTags && others.length > 0 && (
        <OthersSection recipes={others} onPressRecipe={handlePressRecipe} />
      )}
    </ScrollView>
  );
}
