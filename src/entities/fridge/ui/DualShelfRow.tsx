// 냉장 2단 좌/우 두 선반 섹션을 나란히 배치하는 분할 행 컴포넌트

import { Pressable, Text, View } from "react-native";
import type { FridgeSection } from "@/entities/fridge/model/types";
import { CHIPS_AREA_HEIGHT, ItemChip } from "./ItemChip";

type Props = {
  left: FridgeSection;
  right: FridgeSection;
  onPress?: (section: FridgeSection) => void;
};

type DualShelfSectionProps = {
  section: FridgeSection;
  isLeft?: boolean;
  onPress?: () => void;
};

function DualShelfSection({ section, isLeft, onPress }: DualShelfSectionProps) {
  const hasExpiring = section.items.some((i) => i.freshnessStatus === "expiring");
  return (
    <Pressable
      className={`flex-1 pt-3 px-4 pb-2 gap-2 overflow-hidden ${isLeft ? "border-r border-stroke-default" : ""}`}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-[11px] leading-4 text-content-secondary font-semibold">
          {section.label}
        </Text>
        <View className="flex-row items-center gap-1.5">
          {hasExpiring && (
            <View className="flex-row items-center bg-status-expiring-bg border border-status-expiring-border rounded-full px-[6px] py-[1px]">
              <Text className="text-[9px] font-bold text-status-expiring">D-임박</Text>
            </View>
          )}
          <Text className="text-[11px] leading-4 text-content-muted font-normal">
            {section.items.length}개
          </Text>
        </View>
      </View>
      <View
        className="flex-row flex-wrap gap-1.5"
        style={{ height: CHIPS_AREA_HEIGHT, overflow: "hidden" }}
      >
        {section.items.map((item) => (
          <ItemChip key={item.id} name={item.name} status={item.freshnessStatus} />
        ))}
      </View>
    </Pressable>
  );
}

export function DualShelfRow({ left, right, onPress }: Props) {
  return (
    <View className="flex-1 flex-row">
      <DualShelfSection section={left} isLeft onPress={() => onPress?.(left)} />
      <DualShelfSection section={right} onPress={() => onPress?.(right)} />
    </View>
  );
}
