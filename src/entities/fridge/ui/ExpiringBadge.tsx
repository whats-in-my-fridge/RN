// D-임박 배지 — 만료 임박 상태를 나타내는 재사용 가능한 배지 컴포넌트

import { Text, View } from "react-native";

export function ExpiringBadge() {
  return (
    <View className="flex-row items-center bg-status-expiring-bg border border-status-expiring-border rounded-full px-[6px] py-[1px]">
      <Text className="text-2xs font-bold text-status-expiring">D-임박</Text>
    </View>
  );
}
