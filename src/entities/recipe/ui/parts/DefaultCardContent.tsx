// Default-card content blocks for chips on image and text metadata below image.
import { Text, View } from "react-native";

import type { RecipeCardData } from "../../model/types";
import { IngredientChipsRow } from "./IngredientChipsRow";
import { RecipeMetaRow } from "./RecipeMetaRow";

interface DefaultCardContentProps {
  section: "overlay" | "bottom";
  recipe?: RecipeCardData;
  labels?: string[];
  overflowCount?: number;
}

export function DefaultCardContent({
  section,
  recipe,
  labels,
  overflowCount,
}: DefaultCardContentProps) {
  if (section === "overlay") {
    const safeLabels = labels ?? [];
    const safeOverflowCount = overflowCount ?? 0;
    return (
      <View className="absolute bottom-3 left-3 right-3 flex-row items-center gap-2 overflow-hidden">
        <IngredientChipsRow
          labels={safeLabels}
          overflowCount={safeOverflowCount}
          showEnoughChip={safeLabels.length === 0}
          variant="default"
        />
      </View>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <View className="px-4 pb-4 pt-3">
      <Text className="text-3xl font-extrabold text-content-primary">{recipe.title}</Text>
      <RecipeMetaRow cookTime={recipe.cookTime} difficulty={recipe.difficulty} variant="default" />
    </View>
  );
}
