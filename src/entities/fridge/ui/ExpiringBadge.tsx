// 유통기한 임박 항목이 있을 때 선반 헤더에 표시하는 뱃지 컴포넌트

import { Text, View } from "react-native";

export function ExpiringBadge() {
  return (
    <View className="flex-row items-center bg-status-expiring-bg border border-status-expiring-border rounded-full px-[6px] py-[1px]">
      <Text className="text-[9px] font-bold text-status-expiring">D-임박</Text>
    </View>
  );
}
