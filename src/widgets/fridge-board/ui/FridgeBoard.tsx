// 냉장고 카드 전체 위젯 — 선반 섹션들과 범례를 카드 컨테이너로 조립하는 UI 블록

import { Text, View } from "react-native";
import type { FridgeSection } from "@/entities/fridge";
import { DualShelfRow, ShelfRow } from "@/entities/fridge";
// TODO: API 연동 시 이 import 전체를 삭제하고 props/React Query로 교체.
import {
  MOCK_CHILLED_LEFT,
  MOCK_CHILLED_RIGHT,
  MOCK_FREEZER,
  MOCK_FRESH_STORAGE,
  MOCK_VEGETABLE_DRAWER,
} from "@/entities/fridge/model/mock-sections";
import { tokens } from "@/shared/config/tokens";

// ─── 상수 ────────────────────────────────────────────────────────────────────

const FROZEN_DIVIDER_BORDER_WIDTH = 0.8;
const FROZEN_LABEL_LETTER_SPACING = 1;

// ─── FridgeBoard ────────────────────────────────────────────────────────────────

type Props = {
  onSectionPress: (section: FridgeSection) => void;
};

export function FridgeBoard({ onSectionPress }: Props) {
  return (
    <View className="flex-1 gap-3">
      {/* 냉장고 카드 */}
      <View
        className="flex-1 mx-3 rounded-[22px] bg-surface-card border border-stroke-default overflow-hidden"
        style={tokens.component.card.shadow}
      >
        <ShelfRow section={MOCK_FRESH_STORAGE} onPress={() => onSectionPress(MOCK_FRESH_STORAGE)} />
        <View className="h-px bg-stroke-default" />
        <DualShelfRow
          left={MOCK_CHILLED_LEFT}
          right={MOCK_CHILLED_RIGHT}
          onPress={onSectionPress}
        />
        <View className="h-px bg-stroke-default" />
        <ShelfRow
          section={MOCK_VEGETABLE_DRAWER}
          onPress={() => onSectionPress(MOCK_VEGETABLE_DRAWER)}
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

        <ShelfRow section={MOCK_FREEZER} onPress={() => onSectionPress(MOCK_FREEZER)} />
      </View>

      {/* 안내 */}
      <View className="flex-row items-center justify-end px-5">
        <Text className="text-[11px] leading-4 text-content-muted">탭하면 상세보기</Text>
      </View>
    </View>
  );
}
