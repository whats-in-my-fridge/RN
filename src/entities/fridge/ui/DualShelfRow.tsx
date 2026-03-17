// 냉장 2단 좌/우 두 선반 섹션을 나란히 배치하는 분할 행 컴포넌트

import { Text, View } from "react-native";
import type { FridgeSection } from "@/entities/fridge/model/types";
import { ItemChip } from "./ItemChip";

type Props = {
  left: FridgeSection;
  right: FridgeSection;
};

export function DualShelfRow({ left, right }: Props) {
  return (
    <View className="flex-row">
      <View className="flex-1 pt-3 px-4 pb-2 gap-2 border-r border-stroke-default">
        <View className="flex-row items-center justify-between">
          <Text className="text-[11px] leading-4 text-content-secondary font-semibold">
            {left.label}
          </Text>
          <Text className="text-[11px] leading-4 text-stroke-default font-normal">
            {left.items.length}개
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-1.5">
          {left.items.map((item) => (
            <ItemChip key={item.id} name={item.name} status={item.freshnessStatus} />
          ))}
        </View>
      </View>

      <View className="flex-1 pt-3 px-4 pb-2 gap-2">
        <View className="flex-row items-center justify-between">
          <Text className="text-[11px] leading-4 text-content-secondary font-semibold">
            {right.label}
          </Text>
          <Text className="text-[11px] leading-4 text-stroke-default font-normal">
            {right.items.length}개
          </Text>
        </View>
        <View className="flex-row flex-wrap gap-1.5">
          {right.items.map((item) => (
            <ItemChip key={item.id} name={item.name} status={item.freshnessStatus} />
          ))}
        </View>
      </View>
    </View>
  );
}
