// src/widgets/RecipeSearch/RecommendedSection.tsx
// 냉장고 재료 매칭률이 높은 레시피 섹션. LoadMore 페이지네이션 포함.

import { useState } from "react";
import { Text, View } from "react-native";

import type { RecipeCardData } from "@/entities/recipe";
import { LoadMoreButton } from "@/shared/ui/LoadMoreButton";
import { RecipeList } from "@/widgets/RecipeList";

const PAGE_SIZE = 6;

interface RecommendedSectionProps {
  recipes: RecipeCardData[];
  onPressRecipe: (recipe: RecipeCardData) => void;
}

export function RecommendedSection({ recipes, onPressRecipe }: RecommendedSectionProps) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = recipes.slice(0, visible);
  const remaining = recipes.length - visible;

  return (
    <View className="mt-6">
      <View className="mb-3 flex-row items-center gap-2">
        <Text className="text-base font-bold text-content-primary">입력 재료로 만들 수 있어요</Text>
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
