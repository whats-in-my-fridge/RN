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
      {/* 하단 그라디언트 오버레이 */}
      <View
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "60%", backgroundColor: "rgba(0,0,0,0.38)" }}
      />
      <View className="absolute bottom-5 left-5">
        <Text className="mb-1 text-xs font-semibold text-white/80">
          {recipe.tags.map((t) => `#${t}`).join("  ")}
        </Text>
        <Text className="text-2xl font-extrabold text-white">{recipe.title}</Text>
      </View>
    </View>
  );
}
