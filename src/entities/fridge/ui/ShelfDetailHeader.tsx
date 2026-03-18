// 냉장고 선반 상세 시트 헤더 — 선반 아이콘, 이름, 아이템 수 뱃지, 카테고리 설명, 닫기 버튼

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type React from "react";
import { Pressable, Text, View } from "react-native";

import type { FridgeSection, ShelfType } from "@/entities/fridge/model/types";
import { tokens } from "@/shared/config/tokens";

// ─── 상수 ────────────────────────────────────────────────────────────────────

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

const SHELF_ICONS: Record<ShelfType, MaterialIconName> = {
  "fresh-storage": "kitchen",
  "chilled-left": "restaurant",
  "chilled-right": "local-bar",
  "vegetable-drawer": "eco",
  freezer: "ac-unit",
};

// ─── ShelfDetailHeader ────────────────────────────────────────────────────────

type Props = {
  section: FridgeSection;
  onClose: () => void;
};

export function ShelfDetailHeader({ section, onClose }: Props) {
  const iconName = SHELF_ICONS[section.type];

  return (
    <View className="flex-row items-center gap-3 px-5 py-4">
      {/* 선반 아이콘 */}
      <View className="w-9 h-9 rounded-full bg-surface-section border border-stroke-default items-center justify-center">
        <MaterialIcons name={iconName} size={16} color={tokens.color["content-secondary"]} />
      </View>

      {/* 제목 + 아이템 수 뱃지 + 카테고리 설명 */}
      <View className="flex-1 gap-[2px]">
        <View className="flex-row items-center gap-2">
          <Text className="text-[17px] font-bold leading-[25.5px] text-content-primary">
            {section.label}
          </Text>
          <View
            className="rounded-full px-[7px] h-[22px] items-center justify-center"
            style={{ backgroundColor: tokens.color.primary }}
          >
            <Text className="text-[11px] font-semibold text-white">{section.items.length}개</Text>
          </View>
        </View>
        {section.description && (
          <Text className="text-xs text-content-muted">{section.description}</Text>
        )}
      </View>

      {/* 닫기 버튼 */}
      <Pressable
        onPress={onClose}
        className="w-8 h-8 rounded-full bg-surface-section items-center justify-center"
      >
        <MaterialIcons name="close" size={16} color={tokens.color["content-secondary"]} />
      </Pressable>
    </View>
  );
}
