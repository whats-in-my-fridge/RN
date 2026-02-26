// Shared metadata row for recipe cards (time and difficulty with icons).
import { Text, View } from "react-native";

import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

interface RecipeMetaRowProps {
  cookTime: string;
  difficulty: string;
  variant: "banner" | "default";
}

export function RecipeMetaRow({ cookTime, difficulty, variant }: RecipeMetaRowProps) {
  const isBanner = variant === "banner";
  const iconColor = isBanner ? tokens.color.white : tokens.color["content-secondary"];
  const textClassName = isBanner ? "text-white" : "text-content-secondary";

  return (
    <View className="mt-1 flex-row items-center gap-3">
      <View className="flex-row items-center gap-1">
        <IconSymbol name="clock" size={14} color={iconColor} />
        <Text className={`text-sm font-medium ${textClassName}`}>{cookTime}</Text>
      </View>
      <View className="flex-row items-center gap-1">
        <IconSymbol name="person.2" size={14} color={iconColor} />
        <Text className={`text-sm font-medium ${textClassName}`}>{difficulty}</Text>
      </View>
    </View>
  );
}
