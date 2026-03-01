import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import type { RecipeCardData } from "@/entities/recipe";
import type { Category } from "@/shared/ui/CategoryFilter";
import { CategoryFilter } from "@/shared/ui/CategoryFilter";
import { SearchBar } from "@/shared/ui/SearchBar";
import { RecipeList } from "@/widgets/RecipeList";

// ────────────────────────────────────────────────────────
// 더미 데이터 (API 연동 전 UI 확인용)
// RecipeCardData 타입 기준으로 변환
// ────────────────────────────────────────────────────────
const DUMMY_RECIPES: (RecipeCardData & { category: string })[] = [
  {
    recipeId: 1,
    title: "김치찌개",
    thumbnail: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400",
    category: "한식",
    matchRate: 80,
    missingIngredients: ["대파", "고추장"],
    cookTime: "20분",
    difficulty: "쉬움",
    isLiked: false,
  },
  {
    recipeId: 2,
    title: "비빔밥",
    thumbnail: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400",
    category: "한식",
    matchRate: 60,
    missingIngredients: ["계란", "고추장", "참기름"],
    cookTime: "25분",
    difficulty: "보통",
    isLiked: true,
  },
  {
    recipeId: 3,
    title: "라멘",
    thumbnail: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400",
    category: "일식",
    matchRate: 90,
    missingIngredients: [],
    cookTime: "30분",
    difficulty: "보통",
    isLiked: false,
  },
];

export function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

  // 간단한 클라이언트 사이드 필터링
  const filteredRecipes = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();

    return DUMMY_RECIPES.filter((recipe) => {
      const matchesCategory = selectedCategory === "전체" || recipe.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        recipe.title.toLowerCase().includes(lowercasedQuery) ||
        recipe.missingIngredients.some((i) => i.toLowerCase().includes(lowercasedQuery));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const recipeCount = filteredRecipes.length;

  return (
    <ScrollView
      className="flex-1 bg-surface-app"
      contentContainerClassName="pb-24 px-screen pt-14"
      showsVerticalScrollIndicator={false}
    >
      {/* 헤더 */}
      <Text className="mb-4 text-3xl font-extrabold text-content-primary">레시피</Text>

      {/* 검색바 */}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {/* 카테고리 필터 */}
      <View className="mt-4">
        <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
      </View>

      {/* 섹션 타이틀 */}
      <View className="mt-6 mb-3 flex-row items-center gap-2">
        <Text className="text-base font-bold text-content-primary">
          냉장고 재료로 만들 수 있어요
        </Text>
        <View className="rounded-tag bg-stroke-default px-2 py-0.5">
          <Text className="text-xs text-content-secondary">{recipeCount}개</Text>
        </View>
      </View>

      {/* 레시피 리스트 */}
      <RecipeList
        recipes={filteredRecipes}
        onPressRecipe={(recipe) =>
          router.push({
            pathname: "/recipe/[recipeId]",
            params: { recipeId: String(recipe.recipeId) },
          })
        }
      />
    </ScrollView>
  );
}
