// src/pages/search/ui/SearchPage.tsx
// 레시피 검색 페이지. 재료 태그 입력으로 포함/제외 필터링 지원.
// 매칭률 기준으로 "냉장고 재료로 만들 수 있어요" 섹션과 "다른 레시피" 섹션을 분리해서 표시.

import { useState } from "react";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native";

import type { RecipeCardData } from "@/entities/recipe";
import { useSearchRecipe } from "@/features/search-recipe";
import { tokens } from "@/shared/config/tokens";
import { CategoryFilter } from "@/shared/ui/CategoryFilter";
import { IngredientTagInput } from "@/shared/ui/IngredientTagInput";
import { IconSymbol } from "@/shared/ui/icon-symbol";
import { RecipeList } from "@/widgets/RecipeList";

const MATCH_RATE_THRESHOLD = 60; // 이 값 이상이면 "냉장고 재료로 만들 수 있어요" 섹션
const PAGE_SIZE = 6; // 한 번에 보여줄 레시피 수

// ────────────────────────────────────────────────────────
// 더미 데이터 (Figma Make 데이터 기반, recipeId는 상세 페이지 id와 일치)
// category·matchRate는 API에 없는 임시 필드 — 연동 시 제거 필요.
// ────────────────────────────────────────────────────────
const DUMMY_RECIPES: RecipeCardData[] = [
  {
    recipeId: 1,
    title: '김치찌개',
    thumbnail: 'https://images.unsplash.com/photo-1760228865341-675704c22a5b?w=400',
    category: '한식',
    matchRate: 80,
    missingIngredients: ['대파', '간장'],
    cookTime: '20분',
    difficulty: '쉬움',
  },
  {
    recipeId: 2,
    title: '안심 스테이크',
    thumbnail: 'https://images.unsplash.com/photo-1708615017161-2eff302d0389?w=400',
    category: '양식',
    matchRate: 40,
    missingIngredients: ['안심', '마늘', '버터'],
    cookTime: '35분',
    difficulty: '보통',
  },
  {
    recipeId: 3,
    title: '비빔밥',
    thumbnail: 'https://images.unsplash.com/photo-1741295017668-c8132acd6fc0?w=400',
    category: '한식',
    matchRate: 60,
    missingIngredients: ['밥', '시금치', '고추장'],
    cookTime: '25분',
    difficulty: '보통',
  },
  {
    recipeId: 4,
    title: '잡채',
    thumbnail: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?w=400',
    category: '한식',
    matchRate: 55,
    missingIngredients: ['당면', '소고기', '시금치'],
    cookTime: '35분',
    difficulty: '보통',
  },
  {
    recipeId: 5,
    title: '토마토 파스타',
    thumbnail: 'https://images.unsplash.com/photo-1712746785116-4a901521fe8b?w=400',
    category: '양식',
    matchRate: 65,
    missingIngredients: ['파스타', '마늘'],
    cookTime: '25분',
    difficulty: '쉬움',
  },
  {
    recipeId: 6,
    title: '라멘',
    thumbnail: 'https://images.unsplash.com/photo-1731460202531-bf8389d565f7?w=400',
    category: '일식',
    matchRate: 50,
    missingIngredients: ['라멘면', '대파'],
    cookTime: '30분',
    difficulty: '어려움',
  },
  {
    recipeId: 7,
    title: '오이냉국',
    thumbnail: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?w=400',
    category: '한식',
    matchRate: 70,
    missingIngredients: ['식초', '설탕'],
    cookTime: '10분',
    difficulty: '쉬움',
  },
  {
    recipeId: 8,
    title: '오이소박이',
    thumbnail: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    category: '한식',
    matchRate: 45,
    missingIngredients: ['부추', '고춧가루', '새우젓'],
    cookTime: '40분',
    difficulty: '보통',
  },
  {
    recipeId: 9,
    title: '된장찌개',
    thumbnail: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
    category: '한식',
    matchRate: 75,
    missingIngredients: ['된장', '호박'],
    cookTime: '20분',
    difficulty: '쉬움',
  },
  {
    recipeId: 10,
    title: '파전',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
    category: '한식',
    matchRate: 80,
    missingIngredients: ['밀가루'],
    cookTime: '20분',
    difficulty: '쉬움',
  },
  {
    recipeId: 11,
    title: '순두부찌개',
    thumbnail: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400',
    category: '한식',
    matchRate: 65,
    missingIngredients: ['순두부', '고춧가루'],
    cookTime: '20분',
    difficulty: '쉬움',
  },
  {
    recipeId: 12,
    title: '불고기',
    thumbnail: 'https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=400',
    category: '한식',
    matchRate: 50,
    missingIngredients: ['소고기', '배', '설탕'],
    cookTime: '30분',
    difficulty: '보통',
  },
  {
    recipeId: 13,
    title: '제육볶음',
    thumbnail: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400',
    category: '한식',
    matchRate: 55,
    missingIngredients: ['고추장'],
    cookTime: '20분',
    difficulty: '쉬움',
  },
  {
    recipeId: 14,
    title: '크림 파스타',
    thumbnail: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400',
    category: '양식',
    matchRate: 30,
    missingIngredients: ['파스타', '베이컨', '생크림', '파마산치즈'],
    cookTime: '25분',
    difficulty: '보통',
  },
  {
    recipeId: 15,
    title: '마르게리타 피자',
    thumbnail: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    category: '양식',
    matchRate: 25,
    missingIngredients: ['밀가루', '토마토소스', '모차렐라'],
    cookTime: '40분',
    difficulty: '어려움',
  },
  {
    recipeId: 16,
    title: '마파두부',
    thumbnail: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400',
    category: '중식',
    matchRate: 55,
    missingIngredients: ['두반장', '고추기름'],
    cookTime: '20분',
    difficulty: '보통',
  },
  {
    recipeId: 17,
    title: '짜장면',
    thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    category: '중식',
    matchRate: 35,
    missingIngredients: ['중면', '춘장', '소고기'],
    cookTime: '30분',
    difficulty: '보통',
  },
  {
    recipeId: 18,
    title: '월남쌈',
    thumbnail: 'https://images.unsplash.com/photo-1562802378-063ec186a863?w=400',
    category: '양식',
    matchRate: 40,
    missingIngredients: ['라이스페이퍼', '새우', '민트'],
    cookTime: '20분',
    difficulty: '쉬움',
  },
  {
    recipeId: 19,
    title: '규동',
    thumbnail: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
    category: '일식',
    matchRate: 50,
    missingIngredients: ['소고기', '미림'],
    cookTime: '20분',
    difficulty: '쉬움',
  },
  {
    recipeId: 20,
    title: '카레라이스',
    thumbnail: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    category: '일식',
    matchRate: 60,
    missingIngredients: ['카레가루', '감자'],
    cookTime: '40분',
    difficulty: '쉬움',
  },
  {
    recipeId: 21,
    title: '계란말이',
    thumbnail: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400',
    category: '한식',
    matchRate: 90,
    missingIngredients: [],
    cookTime: '10분',
    difficulty: '쉬움',
  },
  {
    recipeId: 22,
    title: '감자볶음',
    thumbnail: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    category: '한식',
    matchRate: 85,
    missingIngredients: ['감자'],
    cookTime: '15분',
    difficulty: '쉬움',
  },
];

// ── 더보기 버튼 ───────────────────────────────────────
interface LoadMoreButtonProps {
  remaining: number;
  onPress: () => void;
}

function LoadMoreButton({ remaining, onPress }: LoadMoreButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="mt-4 flex-row items-center justify-center gap-2 rounded-2xl border border-stroke-default bg-surface-section py-3.5"
    >
      <IconSymbol name="chevron.down" size={15} color={tokens.color["content-secondary"]} />
      <Text className="text-sm font-semibold text-content-secondary">더보기</Text>
      <View className="rounded-full bg-stroke-default px-2 py-0.5">
        <Text className="text-xs text-content-muted">{remaining}개</Text>
      </View>
    </Pressable>
  );
}

// ── 냉장고 재료 추천 섹션 (LoadMore 포함) ─────────────
function RecommendedSection({
  recipes,
  onPressRecipe,
}: {
  recipes: RecipeCardData[];
  onPressRecipe: (r: RecipeCardData) => void;
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = recipes.slice(0, visible);
  const remaining = recipes.length - visible;

  return (
    <View className="mt-6">
      <View className="mb-3 flex-row items-center gap-2">
        <Text className="text-base font-bold text-content-primary">
          냉장고 재료로 만들 수 있어요
        </Text>
        <View className="rounded-tag bg-stroke-default px-2 py-0.5">
          <Text className="text-xs text-content-secondary">{recipes.length}개</Text>
        </View>
      </View>
      <RecipeList recipes={shown} onPressRecipe={onPressRecipe} />
      {remaining > 0 && (
        <LoadMoreButton remaining={remaining} onPress={() => setVisible((v) => v + PAGE_SIZE)} />
      )}
    </View>
  );
}

// ── 다른 레시피 섹션 (LoadMore 포함) ──────────────────
function OthersSection({
  recipes,
  onPressRecipe,
}: {
  recipes: RecipeCardData[];
  onPressRecipe: (r: RecipeCardData) => void;
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = recipes.slice(0, visible);
  const remaining = recipes.length - visible;

  return (
    <View className="mt-6">
      <Text className="mb-3 text-base font-bold text-content-primary">다른 레시피</Text>
      <RecipeList recipes={shown} onPressRecipe={onPressRecipe} />
      {remaining > 0 && (
        <LoadMoreButton remaining={remaining} onPress={() => setVisible((v) => v + PAGE_SIZE)} />
      )}
    </View>
  );
}

// ── 메인 페이지 ───────────────────────────────────────
export function SearchPage() {
  const router = useRouter();
  const { tags, addTag, removeTag, selectedCategory, setSelectedCategory, filteredRecipes } =
    useSearchRecipe(DUMMY_RECIPES);

  const hasActiveTags = tags.length > 0;
  const recommended = filteredRecipes.filter((r) => (r.matchRate ?? 0) >= MATCH_RATE_THRESHOLD);
  const others = filteredRecipes.filter((r) => (r.matchRate ?? 0) < MATCH_RATE_THRESHOLD);

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
      {hasActiveTags && filteredRecipes.length > 0 && (
        <View className="mt-4">
          <RecipeList
            recipes={filteredRecipes}
            onPressRecipe={(recipe) => router.push(`/recipe/${recipe.recipeId}`)}
          />
        </View>
      )}

      {/* 태그 없을 때: 냉장고 재료 추천 섹션 */}
      {!hasActiveTags && recommended.length > 0 && (
        <RecommendedSection
          recipes={recommended}
          onPressRecipe={(recipe) => router.push(`/recipe/${recipe.recipeId}`)}
        />
      )}

      {/* 태그 없을 때: 다른 레시피 섹션 */}
      {!hasActiveTags && others.length > 0 && (
        <OthersSection
          recipes={others}
          onPressRecipe={(recipe) => router.push(`/recipe/${recipe.recipeId}`)}
        />
      )}
    </ScrollView>
  );
}
