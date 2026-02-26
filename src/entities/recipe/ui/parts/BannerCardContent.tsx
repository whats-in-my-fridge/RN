// Banner-only content block for recipe card image overlay.
import { Text, View } from "react-native";

import type { BannerChipDisplay } from "../../model/chip-display";
import type { RecipeCardData } from "../../model/types";
import { IngredientChipsRow } from "./IngredientChipsRow";
import { RecipeMetaRow } from "./RecipeMetaRow";

interface BannerCardContentProps {
  recipe: RecipeCardData;
  chipDisplay: BannerChipDisplay;
  chipsVisible?: boolean;
}

export function BannerCardContent({
  recipe,
  chipDisplay,
  chipsVisible = true,
}: BannerCardContentProps) {
  return (
    <>
      <View className="absolute bottom-4 left-4 right-[44%]">
        <Text className="text-3xl font-extrabold text-white">{recipe.title}</Text>
        <RecipeMetaRow cookTime={recipe.cookTime} difficulty={recipe.difficulty} variant="banner" />
      </View>

      <View
        className="absolute bottom-4 right-4 max-w-[40%] flex-row items-center justify-end gap-2 overflow-hidden"
        style={{ opacity: chipsVisible ? 1 : 0 }}
      >
        <IngredientChipsRow
          labels={chipDisplay.visibleLabels}
          overflowCount={chipDisplay.totalOverflow}
          showEnoughChip={chipDisplay.showEnoughChip}
          variant="banner"
        />
      </View>
    </>
  );
}
