import { Text, View } from "react-native";

import type { Recipe } from "@/entities/recipe/model/recipe.types";
import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

interface RecipeMetaProps {
  recipe: Recipe;
}

/** 조리시간 · 인분 · 난이도 메타 정보 + 설명 */
export function RecipeMeta({ recipe }: RecipeMetaProps) {
  return (
    <View>
      {/* 메타 정보 */}
      <View className="flex-row items-center gap-4">
        <View className="flex-row items-center gap-1">
          <IconSymbol name="clock" size={14} color={tokens.color["content-secondary"]} />
          <Text className="text-sm text-content-secondary">{recipe.cookingTime}분</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <IconSymbol name="person.2" size={14} color={tokens.color["content-secondary"]} />
          <Text className="text-sm text-content-secondary">{recipe.servings}인분</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <IconSymbol name="flame" size={14} color={tokens.color["content-secondary"]} />
          <Text className="text-sm text-content-secondary">{recipe.difficulty}</Text>
        </View>
      </View>

      {/* 설명 */}
      <Text className="mt-4 text-sm leading-5 text-content-dark">{recipe.description}</Text>
    </View>
  );
}
