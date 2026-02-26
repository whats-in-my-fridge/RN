import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";

import type { Recipe } from "@/entities/recipe/model/recipe.types";
import type { Category } from "@/shared/ui/CategoryFilter";
import { CategoryFilter } from "@/shared/ui/CategoryFilter";
import { SearchBar } from "@/shared/ui/SearchBar";
import { RecipeList } from "@/widgets/RecipeList";

// ────────────────────────────────────────────────────────
// 더미 데이터 (API 연동 전 UI 확인용)
// ────────────────────────────────────────────────────────
const DUMMY_RECIPES: Recipe[] = [
  {
    id: "1",
    title: "김치찌개",
    imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400",
    category: "한식",
    tags: ["한식", "찌개", "얼큰"],
    cookingTime: 20,
    servings: 2,
    difficulty: "쉬움",
    description:
      "냉장고에 남은 김치로 만드는 칼칼하고 시원한 찌개. 돼지고기와 두부가 들어가 더욱 든든합니다.",
    ingredients: [
      { name: "김치", owned: true },
      { name: "돼지고기", owned: true },
      { name: "두부", owned: true },
      { name: "대파", owned: false },
      { name: "고추장", owned: false },
    ],
    steps: [
      {
        step: 1,
        description: "김치를 먹기 좋게 썰고, 돼지고기는 얇게 슬라이스합니다.",
        duration: 5,
      },
      {
        step: 2,
        description: "냄비에 참기름을 두르고 돼지고기와 김치를 함께 볶습니다.",
        duration: 8,
      },
      {
        step: 3,
        description: "물 2컵을 붓고 끓기 시작하면 고추장과 간장으로 간을 맞춥니다.",
        duration: 10,
        imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400",
      },
      { step: 4, description: "두부를 큼직하게 썰어 넣고 5분 더 끓입니다.", duration: 5 },
      { step: 5, description: "대파를 송송 썰어 얹고 불을 끄면 완성입니다.", duration: 2 },
    ],
  },
  {
    id: "2",
    title: "비빔밥",
    imageUrl: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400",
    category: "한식",
    tags: ["한식", "밥", "건강"],
    cookingTime: 25,
    servings: 1,
    difficulty: "보통",
    description: "형형색색 나물과 고추장의 매콤한 하모니. 영양 가득한 한 그릇입니다.",
    ingredients: [
      { name: "밥", owned: true },
      { name: "당근", owned: true },
      { name: "시금치", owned: true },
      { name: "계란", owned: false },
      { name: "고추장", owned: false },
      { name: "참기름", owned: false },
    ],
    steps: [
      { step: 1, description: "각종 나물을 준비하고 데칩니다.", duration: 10 },
      {
        step: 2,
        description: "밥 위에 나물을 올리고 고추장, 참기름을 넣어 비빕니다.",
        duration: 5,
      },
    ],
  },
  {
    id: "3",
    title: "라멘",
    imageUrl: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=400",
    category: "일식",
    tags: ["일식", "면", "따뜻한"],
    cookingTime: 30,
    servings: 1,
    difficulty: "보통",
    description: "진한 돈코츠 육수와 쫄깃한 면발의 조화.",
    ingredients: [
      { name: "라멘면", owned: true },
      { name: "돼지고기", owned: true },
      { name: "계란", owned: true },
    ],
    steps: [
      { step: 1, description: "육수를 끓입니다.", duration: 15 },
      { step: 2, description: "면을 삶고 토핑을 올립니다.", duration: 10 },
    ],
  },
];

export function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");

  // 간단한 클라이언트 사이드 필터링
  const filteredRecipes = DUMMY_RECIPES.filter((recipe) => {
    const matchesCategory = selectedCategory === "전체" || recipe.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      recipe.title.includes(searchQuery) ||
      recipe.ingredients.some((i) => i.name.includes(searchQuery));
    return matchesCategory && matchesSearch;
  });

  const ownedCount = filteredRecipes.length;

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
          <Text className="text-xs text-content-secondary">{ownedCount}개</Text>
        </View>
      </View>

      {/* 레시피 리스트 */}
      <RecipeList
        recipes={filteredRecipes}
        onPressRecipe={(recipe) => router.push(`/recipe/${recipe.id}` as any)}
      />
    </ScrollView>
  );
}
