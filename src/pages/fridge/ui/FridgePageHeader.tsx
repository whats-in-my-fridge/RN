// 냉장고 페이지 헤더 — 타이틀, 총 재료 수, 재료 추가 버튼을 표시하는 페이지 헤더 컴포넌트

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";
import { tokens } from "@/shared/config/tokens";

const HEADER_TOP_PADDING = 52;
const TITLE_GAP = 2;

type Props = {
  totalCount: number;
  onAddPress?: () => void;
};

export function FridgePageHeader({ totalCount, onAddPress }: Props) {
  return (
    <View
      className="flex-row items-center justify-between px-5 pb-4"
      style={{ paddingTop: HEADER_TOP_PADDING }}
    >
      <View style={{ gap: TITLE_GAP }}>
        <Text className="text-6xl text-content-primary">나의 냉장고</Text>
        <Text className="text-sm text-content-secondary">총 {totalCount}가지 재료 보관 중</Text>
      </View>

      <Pressable
        onPress={onAddPress}
        className="w-9 h-9 rounded-full bg-content-primary items-center justify-center"
      >
        <MaterialIcons name="add" size={16} color={tokens.color.white} />
      </Pressable>
    </View>
  );
}
