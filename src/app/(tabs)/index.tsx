import { Image, Pressable, ScrollView, Text, View } from "react-native";

import type { RecipeCardData } from "@/entities/recipe";
import { BannerFoodCard, DefaultFoodCard } from "@/entities/recipe";
import { RecipeLikedButton } from "@/features/recipe-liked-button";

interface SummaryStat {
  label: string;
  value: string;
  unit: string;
}

interface RecentItem {
  title: string;
  meta: string;
}

interface RecommendedCard {
  variant: "banner" | "default";
  recipe: RecipeCardData;
  onPressMessage: string;
}

const SUMMARY_STATS: SummaryStat[] = [
  { label: "냉장고", value: "12", unit: "아이템" },
  { label: "임박", value: "3", unit: "유통기한" },
  { label: "추천", value: "7", unit: "레시피" },
];

const RECENT_ITEMS: RecentItem[] = [
  { title: "계란", meta: "유통기한 2일 남음" },
  { title: "우유", meta: "유통기한 5일 남음" },
  { title: "양파", meta: "상온 보관" },
];

const BANNER_RECIPE: RecipeCardData = {
  recipeId: 501,
  title: "비빔밥",
  thumbnail:
    "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=80",
  matchRate: 98.5,
  missingIngredients: ["대파", "참기름", "고추장", "콩나물"],
  cookTime: "25분",
  difficulty: "중급",
};

const DEFAULT_RECIPE: RecipeCardData = {
  recipeId: 502,
  title: "달걀 볶음밥",
  thumbnail:
    "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=80",
  matchRate: 93.2,
  missingIngredients: ["굴소스", "굴소스2", "굴소스3", "굴소스4"],
  cookTime: "15분",
  difficulty: "초급",
};

const RECOMMENDED_CARDS: RecommendedCard[] = [
  {
    variant: "banner",
    recipe: BANNER_RECIPE,
    onPressMessage: "비빔밥 상세로 이동",
  },
  {
    variant: "default",
    recipe: DEFAULT_RECIPE,
    onPressMessage: "달걀 볶음밥 상세로 이동",
  },
];

function SectionHeader({ title, actionLabel }: { title: string; actionLabel: string }) {
  return (
    <View className="mb-3 flex-row items-end justify-between">
      <Text className="text-lg font-extrabold text-zinc-900 dark:text-white">{title}</Text>
      <Text className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">{actionLabel}</Text>
    </View>
  );
}

function SummaryStatCard({ label, value, unit }: SummaryStat) {
  return (
    <View className="flex-1 rounded-3xl bg-zinc-100 p-4 dark:bg-zinc-900">
      <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{label}</Text>
      <Text className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-white">{value}</Text>
      <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{unit}</Text>
    </View>
  );
}

function renderRecommendedCard({ variant, recipe, onPressMessage }: RecommendedCard) {
  const likeButton = (
    <RecipeLikedButton
      recipeId={recipe.recipeId}
      initialLiked={recipe.isLiked}
      onLikeError={(error) => alert(error.message)}
    />
  );

  if (variant === "banner") {
    return (
      <BannerFoodCard
        key={recipe.recipeId}
        recipe={recipe}
        onPress={() => alert(onPressMessage)}
        likeButton={likeButton}
      />
    );
  }

  return (
    <DefaultFoodCard
      key={recipe.recipeId}
      recipe={recipe}
      onPress={() => alert(onPressMessage)}
      likeButton={likeButton}
    />
  );
}

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-zinc-950"
      contentContainerClassName="px-5 pt-6 pb-10"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-5 overflow-hidden rounded-3xl bg-zinc-900 px-5 py-6 dark:bg-zinc-900">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-sm font-medium text-zinc-300">오늘 뭐 먹지?</Text>
            <Text className="mt-1 text-3xl font-extrabold tracking-tight text-white">
              What&apos;s in my fridge
            </Text>
            <Text className="mt-2 text-sm leading-5 text-zinc-300">
              냉장고 속 재료로 만들 수 있는 레시피를 빠르게 찾아보세요.
            </Text>
          </View>

          <Image
            source={require("@assets/images/partial-react-logo.png")}
            className="h-20 w-20 opacity-90"
            resizeMode="contain"
          />
        </View>

        <View className="mt-5 flex-row gap-3">
          <Pressable
            className="flex-1 rounded-2xl bg-white px-4 py-3 active:opacity-90"
            onPress={() => alert("준비중입니다")}
          >
            <Text className="text-center text-sm font-bold text-zinc-900">빠른 추가</Text>
          </Pressable>

          <Pressable
            className="flex-1 rounded-2xl bg-zinc-800 px-4 py-3 active:opacity-90"
            onPress={() => alert("준비중입니다")}
          >
            <Text className="text-center text-sm font-semibold text-white">탐색</Text>
          </Pressable>
        </View>
      </View>

      {/* Summary cards */}
      <View className="mb-6 flex-row gap-3">
        {SUMMARY_STATS.map((stat) => (
          <SummaryStatCard key={stat.label} {...stat} />
        ))}
      </View>

      <SectionHeader title="오늘의 추천" actionLabel="새로고침" />

      <View className="mb-7 gap-4">{RECOMMENDED_CARDS.map(renderRecommendedCard)}</View>

      {/* Section: Recent items (placeholder UI) */}
      <SectionHeader title="최근 추가" actionLabel="전체보기" />

      <View className="gap-3">
        {RECENT_ITEMS.map((item) => (
          <View
            key={item.title}
            className="flex-row items-center justify-between rounded-3xl bg-white p-4 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-800"
          >
            <View className="flex-1 pr-3">
              <Text className="text-base font-bold text-zinc-900 dark:text-white">
                {item.title}
              </Text>
              <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{item.meta}</Text>
            </View>
            <View className="h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
              <Text className="text-base font-black text-zinc-700 dark:text-zinc-200">+</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
