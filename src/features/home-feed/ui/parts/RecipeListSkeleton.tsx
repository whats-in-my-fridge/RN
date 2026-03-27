// Loading skeleton for recipe list.
import { ActivityIndicator, View } from "react-native";
import { tokens } from "@/shared/config/tokens";

export function RecipeListSkeleton() {
  return (
    <View className="h-56 items-center justify-center">
      <ActivityIndicator color={tokens.color.primary} />
    </View>
  );
}
