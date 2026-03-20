// 선반 헤더(이름·카테고리·개수)와 ItemChip 목록을 담는 단일 행 선반 컴포넌트

import { Pressable, Text, View } from "react-native";
import type { FridgeSection } from "@/entities/fridge/model/types";
import { CHIPS_AREA_HEIGHT, ItemChip } from "./ItemChip";

type Props = {
  section: FridgeSection;
  onPress?: () => void;
};

const frozenClasses = {
  container: "bg-frozen-bg",
  label: "text-frozen-text font-semibold",
  description: "text-frozen-text-muted font-normal",
  count: "text-frozen-text font-normal",
} as const;

const normalClasses = {
  container: "",
  label: "text-content-secondary font-semibold",
  description: "text-content-muted font-normal",
  count: "text-content-muted font-normal",
} as const;

export function ShelfRow({ section, onPress }: Props) {
  const isFrozen = section.type === "freezer";
  const cls = isFrozen ? frozenClasses : normalClasses;
  const hasExpiring = section.items.some((i) => i.freshnessStatus === "expiring");
  return (
    <Pressable
      className={`flex-1 pt-3 px-4 pb-2 gap-2 overflow-hidden ${cls.container}`}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-shrink">
          <Text className={`text-[11px] leading-4 ${cls.label}`}>{section.label}</Text>
          {section.description && (
            <Text className={`text-[11px] leading-4 ${cls.description}`}>
              {` — ${section.description}`}
            </Text>
          )}
        </View>
        <View className="flex-row items-center gap-1.5">
          {hasExpiring && (
            <View className="flex-row items-center bg-status-expiring-bg border border-status-expiring-border rounded-full px-[6px] py-[1px]">
              <Text className="text-[9px] font-bold text-status-expiring">D-임박</Text>
            </View>
          )}
          <Text className={`text-[11px] leading-4 ${cls.count}`}>{section.items.length}개</Text>
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
