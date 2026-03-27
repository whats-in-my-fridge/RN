// Loading skeleton for best recipe card.
import { ActivityIndicator, View } from "react-native";
import { tokens } from "@/shared/config/tokens";

export function BestRecipeSkeleton() {
  return (
    <View className="h-56 items-center justify-center rounded-2xl bg-surface-card">
      <ActivityIndicator color={tokens.color.primary} />
    </View>
  );
}
