import { Image, ScrollView, Text, View } from "react-native";

import type { Recipe } from "@/entities/recipe/model/recipe.types";

// ────────────────────────────────────────────────────────
// 더미 데이터 (API 연동 전 UI 확인용)
// ────────────────────────────────────────────────────────
const DUMMY_RECIPES: Record<string, Recipe> = {
  "1": {
    id: "1",
    title: "김치찌개",
    imageUrl: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600",
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
  "2": {
    id: "2",
    title: "비빔밥",
    imageUrl: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=600",
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
  "3": {
    id: "3",
    title: "라멘",
    imageUrl: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600",
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
};

interface RecipeDetailPageProps {
  recipeId: string;
}

export function RecipeDetailPage({ recipeId }: RecipeDetailPageProps) {
  const recipe = DUMMY_RECIPES[recipeId];

  if (!recipe) {
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
      {/* 히어로 이미지 */}
      <View className="relative aspect-[4/3]">
        <Image source={{ uri: recipe.imageUrl }} className="h-full w-full" resizeMode="cover" />
        {/* 태그 오버레이 */}
        <View className="absolute bottom-4 left-4">
          <Text className="text-xs text-white">{recipe.tags.map((t) => `#${t}`).join("  ")}</Text>
          <Text className="mt-1 text-2xl font-extrabold text-white">{recipe.title}</Text>
        </View>
      </View>

      <View className="px-screen py-6">
        {/* 메타 정보 */}
        <View className="flex-row items-center gap-4">
          <Text className="text-sm text-content-secondary">⏱ {recipe.cookingTime}분</Text>
          <Text className="text-sm text-content-secondary">👤 {recipe.servings}인분</Text>
          <Text className="text-sm text-content-secondary">🔥 {recipe.difficulty}</Text>
        </View>

        {/* 설명 */}
        <Text className="mt-4 text-sm leading-5 text-content-dark">{recipe.description}</Text>

        {/* 구분선 */}
        <View className="my-6 h-px bg-stroke-default" />

        {/* 재료 */}
        <Text className="text-lg font-bold text-content-primary">재료</Text>

        {/* 보유 재료 */}
        <View className="mt-3">
          <Text className="text-sm font-semibold text-status-fresh">
            ✓ 보유 재료 ({ownedIngredients.length})
          </Text>
          <View className="mt-2 flex-row flex-wrap gap-2">
            {ownedIngredients.map((ing) => (
              <View
                key={ing.name}
                className="rounded-tag border border-status-fresh-border bg-status-fresh-bg px-3 py-1"
              >
                <Text className="text-xs text-status-fresh">{ing.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 부족한 재료 */}
        {missingIngredients.length > 0 && (
          <View className="mt-4">
            <Text className="text-sm font-semibold text-status-expiring">
              ✕ 부족한 재료 ({missingIngredients.length})
            </Text>
            <View className="mt-2 flex-row flex-wrap gap-2">
              {missingIngredients.map((ing) => (
                <View
                  key={ing.name}
                  className="rounded-tag border border-status-expiring-border bg-status-expiring-bg px-3 py-1"
                >
                  <Text className="text-xs text-status-expiring">{ing.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 구분선 */}
        <View className="my-6 h-px bg-stroke-default" />

        {/* 조리 순서 */}
        <Text className="text-lg font-bold text-content-primary">조리 순서</Text>
        <View className="mt-4 gap-6">
          {recipe.steps.map((s) => (
            <View key={s.step} className="flex-row gap-3">
              {/* 스텝 번호 */}
              <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Text className="text-sm font-bold text-white">{s.step}</Text>
              </View>
              {/* 스텝 설명 */}
              <View className="flex-1">
                <Text className="text-sm leading-5 text-content-primary">{s.description}</Text>
                <Text className="mt-1 text-xs text-content-secondary">⏱ {s.duration}분</Text>
                {s.imageUrl && (
                  <Image
                    source={{ uri: s.imageUrl }}
                    className="mt-3 aspect-video w-full rounded-card"
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
