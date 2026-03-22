// FridgeStatusBar widget: 냉장고 통계(총 재료·찐레시피·추천)를 한 줄로 표시하는 위젯
import { Text, View } from "react-native";
import { useFridgeItems } from "@/features/fridge-items";
import { tokens } from "@/shared/config/tokens";

const MOCK_ITEMS = [
  { label: "찐레시피", value: "12개" },
  { label: "추천", value: "4개" },
] as const;

export function FridgeStatusBar() {
  const { data: items = [] } = useFridgeItems();

  const STATUS_ITEMS = [{ label: "총 재료", value: `${items.length}개` }, ...MOCK_ITEMS];

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
