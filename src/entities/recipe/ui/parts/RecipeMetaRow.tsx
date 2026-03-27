// Shared metadata row for recipe cards (time and difficulty with icons).
import { Text, View } from "react-native";

import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

interface RecipeMetaRowProps {
  cookTime?: string;
  difficulty?: string;
  variant: "banner" | "default";
}

const DEFAULT_COOK_TIME = "60분 이내";
const DEFAULT_DIFFICULTY = "아무나";

export function RecipeMetaRow({ cookTime, difficulty, variant }: RecipeMetaRowProps) {
  const isBanner = variant === "banner";
  const iconColor = isBanner ? tokens.color.white : tokens.color["content-secondary"];
  const textClassName = isBanner ? "text-white" : "text-content-secondary";
  const safeCookTime = cookTime || DEFAULT_COOK_TIME;
  const safeDifficulty = difficulty || DEFAULT_DIFFICULTY;

  return (
    <View className="mt-1 flex-row items-center gap-3">
      <View className="flex-row items-center gap-1">
        <IconSymbol name="clock" size={14} color={iconColor} />
        <Text className={`text-sm font-medium ${textClassName}`}>{safeCookTime}</Text>
      </View>
      <View className="flex-row items-center gap-1">
        <IconSymbol name="person.2" size={14} color={iconColor} />
        <Text className={`text-sm font-medium ${textClassName}`}>{safeDifficulty}</Text>
      </View>
    </View>
  );
}
