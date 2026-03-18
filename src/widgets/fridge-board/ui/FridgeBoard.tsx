// 냉장고 카드 전체 위젯 — 선반 섹션들과 범례를 카드 컨테이너로 조립하는 UI 블록

import { Text, View } from "react-native";
import type { FridgeSection } from "@/entities/fridge";
import { DualShelfRow, ShelfRow } from "@/entities/fridge";
// FSD: mock 데이터는 barrel에서 export되지 않으므로 내부 경로 직접 참조.
// TODO: API 연동 시 이 import 전체를 삭제하고 props/React Query로 교체.
import {
  MOCK_CHILLED_LEFT,
  MOCK_CHILLED_RIGHT,
  MOCK_FREEZER,
  MOCK_FRESH_STORAGE,
  MOCK_VEGETABLE_DRAWER,
} from "@/entities/fridge/model/mock-sections";

// ─── Legend 아이템 ──────────────────────────────────────────────────────────────

function LegendItem({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <View className="flex-row items-center gap-1">
      <View className={`w-[7px] h-[7px] rounded-full ${dotClass}`} />
      <Text className="text-[11px] leading-4 text-content-secondary">{label}</Text>
    </View>
  );
}

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
        style={{
          elevation: 4,
          shadowColor: "#2c1a0e",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.08,
          shadowRadius: 24,
        }}
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
          className="items-center justify-center py-[6px] bg-frozen-divider-bg border-y border-frozen-divider-border"
          style={{ borderTopWidth: 0.8, borderBottomWidth: 0.8 }}
        >
          <Text className="text-frozen-text text-[10px] font-bold" style={{ letterSpacing: 1 }}>
            ❄ 냉동
          </Text>
        </View>

        <ShelfRow section={MOCK_FREEZER} onPress={() => onSectionPress(MOCK_FREEZER)} />
      </View>

      {/* 범례 */}
      <View className="flex-row items-center justify-between px-5">
        <View className="flex-row gap-4">
          <LegendItem dotClass="bg-status-fresh" label="신선" />
          <LegendItem dotClass="bg-status-caution" label="주의" />
          <LegendItem dotClass="bg-status-expiring" label="임박" />
        </View>
        <Text className="text-[11px] leading-4 text-content-muted">탭하면 상세보기</Text>
      </View>
    </View>
  );
}
