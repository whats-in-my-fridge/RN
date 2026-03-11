import { Image, Text, View } from "react-native";

import type { Recipe } from "@/entities/recipe/model/recipe.types";

interface RecipeHeroProps {
  recipe: Recipe;
}

/** 레시피 상세 히어로 이미지 + 태그 오버레이 */
export function RecipeHero({ recipe }: RecipeHeroProps) {
  return (
    <View className="relative aspect-[4/3]">
      <Image source={{ uri: recipe.imageUrl }} className="h-full w-full" resizeMode="cover" />
      <View className="absolute bottom-4 left-4">
        <Text className="text-xs text-white">{recipe.tags.map((t) => `#${t}`).join("  ")}</Text>
        <Text className="mt-1 text-2xl font-extrabold text-white">{recipe.title}</Text>
      </View>
    </View>
  );
}
