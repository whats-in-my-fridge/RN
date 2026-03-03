/**
 * src/app/(tabs)/fridge.tsx
 *
 * 냉장고 탭 화면
 */

import { Text, View } from "react-native";

export default function FridgeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-surface-app">
      <Text className="text-content-primary text-lg">냉장고</Text>
    </View>
  );
}
