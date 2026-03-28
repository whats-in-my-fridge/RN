// Match-rate badge shown on recipe card image.
// Tiered color: ≥80% green, ≥50% orange, <50% gray. Hidden when 0%.
import { Text, View } from "react-native";

const HIGH_MATCH_THRESHOLD = 80;
const MID_MATCH_THRESHOLD = 50;

interface MatchRateBadgeProps {
  matchRate?: number;
}

function getMatchRateStyle(rate: number): string {
  if (rate >= HIGH_MATCH_THRESHOLD) return "bg-status-fresh";
  if (rate >= MID_MATCH_THRESHOLD) return "bg-status-soon";
  return "bg-black/70";
}

export function MatchRateBadge({ matchRate }: MatchRateBadgeProps) {
  if (!matchRate) return null;

  return (
    <View className={`rounded-full ${getMatchRateStyle(matchRate)} px-2.5 py-1`}>
      <Text className="text-xs font-bold text-white">{Math.round(matchRate)}%</Text>
    </View>
  );
}
