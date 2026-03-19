// 냉장 2단 좌/우 두 선반 섹션을 나란히 배치하는 분할 행 컴포넌트

import { Text, View } from "react-native";
import type { FridgeSection } from "@/entities/fridge/model/types";
import { ExpiringBadge } from "./ExpiringBadge";
import { ItemChip } from "./ItemChip";

type Props = {
  left: FridgeSection;
  right: FridgeSection;
};

type DualShelfSectionProps = {
  section: FridgeSection;
  isLeft?: boolean;
};

function DualShelfSection({ section, isLeft }: DualShelfSectionProps) {
  const hasExpiring = section.items.some((i) => i.freshnessStatus === "expiring");

  return (
    <View
      className={`flex-1 pt-3 px-4 pb-2 gap-2 ${isLeft ? "border-r border-stroke-default" : ""}`}
    >
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-content-secondary font-semibold">{section.label}</Text>
        <View className="flex-row items-center gap-1.5">
          {hasExpiring && <ExpiringBadge />}
          <Text className="text-xs text-content-muted font-normal">{section.items.length}개</Text>
        </View>
      </View>
      <View className="flex-row flex-wrap gap-1.5">
        {section.items.map((item) => (
          <ItemChip key={item.id} name={item.name} status={item.freshnessStatus} />
        ))}
      </View>
    </View>
  );
}

export function DualShelfRow({ left, right }: Props) {
  return (
    <View className="flex-1 flex-row">
      <DualShelfSection section={left} isLeft />
      <DualShelfSection section={right} />
    </View>
  );
}
