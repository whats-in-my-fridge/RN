// src/widgets/RecipeSearch/OthersSection.tsx
// 매칭률 기준 미달인 "다른 레시피" 섹션. LoadMore 페이지네이션 포함.

import { useState } from "react";
import { Text, View } from "react-native";

import type { RecipeCardData } from "@/entities/recipe";
import { LoadMoreButton } from "@/shared/ui/LoadMoreButton";
import { RecipeList } from "@/widgets/RecipeList";

const PAGE_SIZE = 6;

interface OthersSectionProps {
  recipes: RecipeCardData[];
  onPressRecipe: (recipe: RecipeCardData) => void;
}

export function OthersSection({ recipes, onPressRecipe }: OthersSectionProps) {
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
