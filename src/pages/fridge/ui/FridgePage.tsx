// 냉장고 탭의 최상위 페이지 컴포넌트

import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FridgeBoard } from "@/widgets/fridge-board";
import { FridgePageHeader } from "./FridgePageHeader";

export function FridgePage() {
  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface-app">
      <FridgePageHeader totalCount={23} />
      <View className="flex-1 mt-2">
        <FridgeBoard />
      </View>
      <View style={{ height: 92 }} />
    </SafeAreaView>
  );
}
