import { Image, Pressable, Text, View } from "react-native";

import type { Recipe } from "@/entities/recipe/model/recipe.types";
import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

interface RecipeHeroProps {
  recipe: Recipe;
  onToggleScrap?: () => void;
  isScrapPending?: boolean;
}

/** 레시피 상세 히어로 이미지 + 태그 오버레이 */
export function RecipeHero({ recipe, onToggleScrap, isScrapPending }: RecipeHeroProps) {
  return (
    <View className="relative aspect-[4/3]">
      <Image source={{ uri: recipe.imageUrl }} className="h-full w-full" resizeMode="cover" />
      <View
        className="absolute bottom-0 left-0 right-0 px-5 pb-5"
        style={{ backgroundColor: "rgba(0,0,0,0.38)" }}
      >
        <Text className="text-xs font-semibold text-white/80">
          {recipe.tags.map((t) => `#${t}`).join("  ")}
        </Text>
        <Text className="text-2xl font-extrabold text-white">{recipe.title}</Text>
      </View>
      {onToggleScrap && (
        <Pressable
          className="absolute right-4 top-4 h-10 w-10 items-center justify-center rounded-full bg-black/30"
          onPress={onToggleScrap}
          disabled={isScrapPending}
        >
          <IconSymbol
            name={recipe.isScrapped ? "heart.fill" : "heart"}
            size={22}
            color={
              recipe.isScrapped ? tokens.color["heart-active"] : tokens.color["heart-inactive"]
            }
          />
        </Pressable>
      )}
    </View>
  );
}
