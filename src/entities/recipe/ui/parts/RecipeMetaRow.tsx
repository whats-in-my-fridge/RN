// Shared metadata row for recipe cards (time and difficulty with icons).
// Hidden entirely when both cookTime and difficulty are absent.
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
  if (!cookTime && !difficulty) return null;

  const isBanner = variant === "banner";
  const iconColor = isBanner ? tokens.color.white : tokens.color["content-secondary"];
  const textClassName = isBanner ? "text-white" : "text-content-secondary";
  const safeCookTime = cookTime || DEFAULT_COOK_TIME;
  const safeDifficulty = difficulty || DEFAULT_DIFFICULTY;

  return (
    <View className="mt-1 flex-row items-center gap-1">
      {cookTime ? (
        <View className="flex-row items-center gap-1">
          <IconSymbol name="clock" size={14} color={iconColor} />
          <Text className={`text-sm font-medium ${textClassName}`}>{cookTime}</Text>
        </View>
      ) : null}
      {cookTime && difficulty ? <Text className={`text-sm ${textClassName}`}> · </Text> : null}
      {difficulty ? (
        <View className="flex-row items-center gap-1">
          <IconSymbol name="flame" size={14} color={iconColor} />
          <Text className={`text-sm font-medium ${textClassName}`}>{difficulty}</Text>
        </View>
      ) : null}
    </View>
  );
}
