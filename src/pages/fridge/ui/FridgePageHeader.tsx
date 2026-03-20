// 냉장고 페이지 헤더 — 타이틀, 총 재료 수, 재료 추가 버튼을 표시하는 페이지 헤더 컴포넌트

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";
import { tokens } from "@/shared/config/tokens";

type Props = {
  totalCount: number;
  onAddPress?: () => void;
};

export function FridgePageHeader({ totalCount, onAddPress }: Props) {
  return (
    <View className="flex-row items-center justify-between px-5 pt-[52px] pb-4">
      <View className="gap-[2px]">
        <Text className="text-[24px] font-bold leading-[36px] text-content-primary">
          나의 냉장고
        </Text>
        <Text className="text-[12px] leading-[18px] text-content-secondary">
          총 {totalCount}가지 재료 보관 중
        </Text>
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
