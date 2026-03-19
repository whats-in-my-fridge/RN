// 냉장고 탭의 최상위 페이지 컴포넌트

import { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddItemSheet } from "@/features/add-fridge-item";
import { ShelfDetailSheet, useShelfDetailStore } from "@/features/view-shelf-detail";
import { FridgeBoard } from "@/widgets/fridge-board";
import { FridgePageHeader } from "./FridgePageHeader";

// TODO: API 연동 시 서버 응답의 총 아이템 수로 교체
const MOCK_FRIDGE_ITEM_COUNT = 23;

// 하단 탭바 높이만큼 콘텐츠 하단에 여백을 확보하는 스페이서
const BOTTOM_TAB_BAR_HEIGHT = 92;

export function FridgePage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const openShelfDetail = useShelfDetailStore((s) => s.open);

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface-app">
      <FridgePageHeader totalCount={MOCK_FRIDGE_ITEM_COUNT} onAddPress={() => setIsAddOpen(true)} />
      <View className="flex-1 mt-2">
        <FridgeBoard onSectionPress={openShelfDetail} />
      </View>
      <View style={{ height: BOTTOM_TAB_BAR_HEIGHT }} />

      <AddItemSheet isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <ShelfDetailSheet />
    </SafeAreaView>
  );
}
