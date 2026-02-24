import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Pressable, ScrollView, Text } from "react-native";

import { useBottomSheetStore } from "@/shared/model/bottom-sheet";

export default function HomeScreen() {
  const openBottomSheet = useBottomSheetStore((s) => s.open);

  return (
    <ScrollView
      className="flex-1 bg-surface-app"
      contentContainerClassName="flex-1 items-center justify-center px-screen"
      showsVerticalScrollIndicator={false}
    >
      <Pressable
        className="rounded-button bg-primary px-8 py-4 active:opacity-90"
        onPress={() =>
          openBottomSheet(
            <BottomSheetView style={{ paddingHorizontal: 20, paddingVertical: 24 }}>
              <Text className="text-xl font-extrabold text-content-primary">바텀시트</Text>
              <Text className="mt-2 text-sm text-content-secondary">
                바깥 영역 탭 또는 아래로 스와이프하면 닫힙니다
              </Text>
            </BottomSheetView>,
          )
        }
      >
        <Text className="text-base font-bold text-white">바텀시트 열기</Text>
      </Pressable>
    </ScrollView>
  );
}
