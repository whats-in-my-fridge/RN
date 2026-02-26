import { Image, Pressable, Text, View } from "react-native";

import type { Recipe } from "@/entities/recipe/model/recipe.types";

interface RecipeCardProps {
  recipe: Recipe;
  onPress?: () => void;
}

export function RecipeCard({ recipe, onPress }: RecipeCardProps) {
  /** 보유 재료만 표시, 최대 3개 + 나머지 개수 */
  const ownedIngredients = recipe.ingredients.filter((i) => i.owned);
  const visibleTags = ownedIngredients.slice(0, 3);
  const remainingCount = ownedIngredients.length - visibleTags.length;

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 overflow-hidden rounded-card bg-surface-card active:opacity-90"
    >
      {/* 썸네일 */}
      <View className="relative aspect-[4/3]">
        <Image source={{ uri: recipe.imageUrl }} className="h-full w-full" resizeMode="cover" />
        {/* 재료 태그 오버레이 */}
        <View className="absolute bottom-2 left-2 flex-row gap-1">
          {visibleTags.map((ing) => (
            <View key={ing.name} className="rounded-tag bg-tag-bg px-2 py-1">
              <Text className="text-2xs text-tag-text">{ing.name}</Text>
            </View>
          ))}
          {remainingCount > 0 && (
            <View className="rounded-tag bg-tag-bg px-2 py-1">
              <Text className="text-2xs text-tag-text">+{remainingCount}</Text>
            </View>
          )}
        </View>
      </View>

      {/* 정보 영역 */}
      <View className="p-card">
        <Text className="text-base font-bold text-content-primary" numberOfLines={1}>
          {recipe.title}
        </Text>
        <View className="mt-1 flex-row items-center gap-2">
          <Text className="text-xs text-content-secondary">⏱ {recipe.cookingTime}분</Text>
          <Text className="text-xs text-content-secondary">👤 {recipe.difficulty}</Text>
        </View>
      </View>
    </Pressable>
  );
}
