// FridgeStatusBar widget: 냉장고 통계(총 재료·찜레시피·알레르기)를 한 줄로 표시하는 위젯

import { Text, View } from "react-native";
import { useFridgeItems } from "@/features/fridge-items";
import { useScraps } from "@/features/liked-recipes";
import { useUserProfile } from "@/features/user-profile";
import { tokens } from "@/shared/config/tokens";

export function FridgeStatusBar() {
  const { data: items = [] } = useFridgeItems();
  const { data: userProfile } = useUserProfile();
  const { data: scraps = [] } = useScraps();

  const scrapsCount = scraps.length;
  const allergiesCount = userProfile?.allergies.length ?? 0;
  const uniqueItemsCount = new Set(items.map((i) => i.name)).size;

  const STATUS_ITEMS = [
    { label: "찜레시피", value: `${scrapsCount}개` },
    { label: "알레르기", value: `${allergiesCount}개` },
  ];

  const STATUS_ITEMS_WITH_TOTAL = [
    { label: "총 재료", value: `${uniqueItemsCount}개` },
    ...STATUS_ITEMS,
  ];

  return (
    <View className="mx-screen mb-6 flex-row rounded-2xl bg-surface-card px-2 py-3">
      {STATUS_ITEMS_WITH_TOTAL.map((item, index) => (
        <View
          key={item.label}
          className="flex-1 items-center"
          style={
            index < STATUS_ITEMS_WITH_TOTAL.length - 1
              ? {
                  borderRightWidth: 1,
                  borderRightColor: tokens.color["stroke-default"],
                }
              : undefined
          }
        >
          <Text className="text-base font-extrabold text-content-primary">{item.value}</Text>
          <Text className="mt-0.5 text-xs text-content-secondary">{item.label}</Text>
        </View>
      ))}
    </View>
  );
}
