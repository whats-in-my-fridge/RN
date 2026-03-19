// 냉장고 탭의 최상위 페이지 컴포넌트

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FridgeBoard } from "@/widgets/fridge-board";

export function FridgePage() {
  return (
    <SafeAreaView className="flex-1 bg-surface-app">
      <View className="flex-1 justify-end pb-20">
        <FridgeBoard />
      </View>
    </SafeAreaView>
  );
}
