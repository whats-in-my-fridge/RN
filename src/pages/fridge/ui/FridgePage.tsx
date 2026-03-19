// 냉장고 탭의 최상위 페이지 컴포넌트

import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddItemSheet } from "@/features/add-fridge-item";
import { FridgeBoard } from "@/widgets/fridge-board";
import { FridgePageHeader } from "./FridgePageHeader";

const BOTTOM_TAB_BAR_HEIGHT = 92;

export function FridgePage() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface-app">
      <FridgePageHeader totalCount={23} onAddPress={() => setIsAddOpen(true)} />
      <View className="flex-1 mt-2">
        <FridgeBoard />
      </View>
      <View style={{ height: BOTTOM_TAB_BAR_HEIGHT }} />

      <AddItemSheet isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
    </SafeAreaView>
  );
}
