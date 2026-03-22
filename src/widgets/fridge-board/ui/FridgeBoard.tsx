// 냉장고 카드 전체 위젯 — 선반 섹션들과 범례를 카드 컨테이너로 조립하는 UI 블록

import { ActivityIndicator, Text, View } from "react-native";
import type { ShelfType } from "@/entities/fridge";
import { DualShelfRow, groupItemsToSections, ShelfRow } from "@/entities/fridge";
import { useFridgeItems } from "@/features/fridge-items";
import { tokens } from "@/shared/config/tokens";

// ─── 상수 ────────────────────────────────────────────────────────────────────

const FROZEN_DIVIDER_BORDER_WIDTH = 0.8;
const FROZEN_LABEL_LETTER_SPACING = 1;

// ─── FridgeBoard ────────────────────────────────────────────────────────────────

type Props = {
  onSectionPress: (type: ShelfType) => void;
};

export function FridgeBoard({ onSectionPress }: Props) {
  const { data: items = [], isLoading } = useFridgeItems();
  const s = groupItemsToSections(items);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="flex-1 gap-3">
      {/* 냉장고 카드 */}
      <View
        className="flex-1 mx-3 rounded-[22px] bg-surface-card border border-stroke-default overflow-hidden"
        style={tokens.component.card.shadow}
      >
        <ShelfRow section={s["fresh-storage"]} onPress={() => onSectionPress("fresh-storage")} />
        <View className="h-px bg-stroke-default" />
        <DualShelfRow
          left={s["chilled-left"]}
          right={s["chilled-right"]}
          onPress={(section) => onSectionPress(section.type)}
        />
        <View className="h-px bg-stroke-default" />
        <ShelfRow
          section={s["vegetable-drawer"]}
          onPress={() => onSectionPress("vegetable-drawer")}
        />

        {/* 냉동 구분선 */}
        <View
          className="items-center justify-center py-1.5 bg-frozen-divider-bg border-y border-frozen-divider-border"
          style={{
            borderTopWidth: FROZEN_DIVIDER_BORDER_WIDTH,
            borderBottomWidth: FROZEN_DIVIDER_BORDER_WIDTH,
          }}
        >
          <Text
            className="text-frozen-text text-2xs font-bold"
            style={{ letterSpacing: FROZEN_LABEL_LETTER_SPACING }}
          >
            ❄ 냉동
          </Text>
        </View>

        <ShelfRow section={s.freezer} onPress={() => onSectionPress("freezer")} />
      </View>

      {/* 안내 */}
      <View className="flex-row items-center justify-end px-5">
        <Text className="text-[11px] leading-4 text-content-muted">탭하면 상세보기</Text>
      </View>
    </View>
  );
}
