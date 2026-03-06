// FridgeStatusBar widget: displays 4 fridge statistics (total, expiring, recipes, recommended).
import { Text, View } from "react-native";
import { tokens } from "@/shared/config/tokens";

const STATUS_ITEMS = [
  { label: "총 재료", value: "23개", color: tokens.color["content-primary"] },
  { label: "임박", value: "5개", color: tokens.color["status-expiring"] },
  { label: "찐레시피", value: "12개", color: tokens.color["content-primary"] },
  { label: "추천", value: "4개", color: tokens.color["content-primary"] },
] as const;

export function FridgeStatusBar() {
  return (
    <View className="mx-screen mb-6 flex-row rounded-2xl bg-surface-card px-2 py-3">
      {STATUS_ITEMS.map((item, index) => (
        <View
          key={item.label}
          className="flex-1 items-center"
          style={
            index < STATUS_ITEMS.length - 1
              ? { borderRightWidth: 1, borderRightColor: tokens.color["stroke-default"] }
              : undefined
          }
        >
          <Text className="text-base font-extrabold" style={{ color: item.color }}>
            {item.value}
          </Text>
          <Text className="mt-0.5 text-xs text-content-secondary">{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
