// Match-rate badge shown on recipe card image.
import { Text, View } from "react-native";

interface MatchRateBadgeProps {
  matchRate: number;
}

export function MatchRateBadge({ matchRate }: MatchRateBadgeProps) {
  return (
    <View className="rounded-full bg-black/70 px-2.5 py-1">
      <Text className="text-xs font-bold text-white">{matchRate.toFixed(1)}%</Text>
    </View>
  );
}
