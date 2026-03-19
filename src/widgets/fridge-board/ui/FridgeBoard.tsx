// 냉장고 카드 전체 위젯 — 선반 섹션들과 범례를 카드 컨테이너로 조립하는 UI 블록

import type { FridgeSection } from "@/entities/fridge";
import { DualShelfRow, ShelfRow } from "@/entities/fridge";
import { Text, View } from "react-native";

// ─── Mock 데이터 (API 연동 전 임시) ────────────────────────────────────────────

const MOCK_FRESH_STORAGE: FridgeSection = {
  type: "fresh-storage",
  label: "단백질 선반",
  description: "유제품 · 계란 · 두부",
  items: [
    {
      id: "1",
      name: "우유",
      shelfType: "fresh-storage",
      daysUntilExpiry: 5,
      freshnessStatus: "caution",
    },
    {
      id: "2",
      name: "계란",
      shelfType: "fresh-storage",
      daysUntilExpiry: 10,
      freshnessStatus: "fresh",
    },
    {
      id: "3",
      name: "요거트",
      shelfType: "fresh-storage",
      daysUntilExpiry: 14,
      freshnessStatus: "fresh",
    },
    {
      id: "4",
      name: "치즈",
      shelfType: "fresh-storage",
      daysUntilExpiry: 20,
      freshnessStatus: "fresh",
    },
    {
      id: "5",
      name: "두부",
      shelfType: "fresh-storage",
      daysUntilExpiry: 6,
      freshnessStatus: "caution",
    },
  ],
};

const MOCK_CHILLED_LEFT: FridgeSection = {
  type: "chilled-left",
  label: "주식 · 조리식품",
  items: [
    {
      id: "6",
      name: "잡곡밥",
      shelfType: "chilled-left",
      daysUntilExpiry: 1,
      freshnessStatus: "expiring",
    },
    {
      id: "7",
      name: "김치",
      shelfType: "chilled-left",
      daysUntilExpiry: 30,
      freshnessStatus: "fresh",
    },
    {
      id: "8",
      name: "된장찌개",
      shelfType: "chilled-left",
      daysUntilExpiry: 2,
      freshnessStatus: "expiring",
    },
    {
      id: "9",
      name: "참치캔",
      shelfType: "chilled-left",
      daysUntilExpiry: 365,
      freshnessStatus: "fresh",
    },
  ],
};

const MOCK_CHILLED_RIGHT: FridgeSection = {
  type: "chilled-right",
  label: "소스 · 음료",
  items: [
    {
      id: "10",
      name: "간장",
      shelfType: "chilled-right",
      daysUntilExpiry: 180,
      freshnessStatus: "fresh",
    },
    {
      id: "11",
      name: "고추장",
      shelfType: "chilled-right",
      daysUntilExpiry: 60,
      freshnessStatus: "fresh",
    },
    {
      id: "12",
      name: "마요네즈",
      shelfType: "chilled-right",
      daysUntilExpiry: 30,
      freshnessStatus: "fresh",
    },
    {
      id: "13",
      name: "맥주",
      shelfType: "chilled-right",
      daysUntilExpiry: 90,
      freshnessStatus: "fresh",
    },
    {
      id: "14",
      name: "오렌지주스",
      shelfType: "chilled-right",
      daysUntilExpiry: 7,
      freshnessStatus: "caution",
    },
  ],
};

const MOCK_VEGETABLE_DRAWER: FridgeSection = {
  type: "vegetable-drawer",
  label: "야채 서랍",
  description: "채소 · 과일",
  items: [
    {
      id: "15",
      name: "파프리카",
      shelfType: "vegetable-drawer",
      daysUntilExpiry: 10,
      freshnessStatus: "fresh",
    },
    {
      id: "16",
      name: "토마토",
      shelfType: "vegetable-drawer",
      daysUntilExpiry: 5,
      freshnessStatus: "caution",
    },
    {
      id: "17",
      name: "당근",
      shelfType: "vegetable-drawer",
      daysUntilExpiry: 14,
      freshnessStatus: "fresh",
    },
    {
      id: "18",
      name: "사과",
      shelfType: "vegetable-drawer",
      daysUntilExpiry: 12,
      freshnessStatus: "fresh",
    },
    {
      id: "19",
      name: "오렌지",
      shelfType: "vegetable-drawer",
      daysUntilExpiry: 6,
      freshnessStatus: "caution",
    },
  ],
};

const MOCK_FREEZER: FridgeSection = {
  type: "freezer",
  label: "냉동 서랍",
  description: "육류 · 어패류",
  items: [
    {
      id: "20",
      name: "닭가슴살",
      shelfType: "freezer",
      daysUntilExpiry: 1,
      freshnessStatus: "expiring",
    },
    {
      id: "21",
      name: "돼지고기",
      shelfType: "freezer",
      daysUntilExpiry: 5,
      freshnessStatus: "caution",
    },
    {
      id: "22",
      name: "냉동새우",
      shelfType: "freezer",
      daysUntilExpiry: 60,
      freshnessStatus: "fresh",
    },
    {
      id: "23",
      name: "만두",
      shelfType: "freezer",
      daysUntilExpiry: 30,
      freshnessStatus: "fresh",
    },
  ],
};

// ─── Legend 아이템 ──────────────────────────────────────────────────────────────

function LegendItem({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <View className="flex-row items-center gap-1">
      <View className={`w-[7px] h-[7px] rounded-full ${dotClass}`} />
      <Text className="text-[11px] leading-4 text-content-secondary">
        {label}
      </Text>
    </View>
  );
}

// ─── FridgeBoard ────────────────────────────────────────────────────────────────

export function FridgeBoard() {
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
        <ShelfRow section={MOCK_FRESH_STORAGE} />
        <View className="h-px bg-stroke-default" />
        <DualShelfRow left={MOCK_CHILLED_LEFT} right={MOCK_CHILLED_RIGHT} />
        <View className="h-px bg-stroke-default" />
        <ShelfRow section={MOCK_VEGETABLE_DRAWER} />

        {/* 냉동 구분선 */}
        <View
          className="items-center justify-center py-[6px] bg-frozen-divider-bg border-y border-frozen-divider-border"
          style={{ borderTopWidth: 0.8, borderBottomWidth: 0.8 }}
        >
          <Text
            className="text-frozen-text text-[10px] font-bold"
            style={{ letterSpacing: 1 }}
          >
            ❄ 냉동
          </Text>
        </View>

        <ShelfRow section={MOCK_FREEZER} />
      </View>

      {/* 범례 */}
      <View className="flex-row items-center justify-between px-5">
        <View className="flex-row gap-4">
          <LegendItem dotClass="bg-status-fresh" label="신선" />
          <LegendItem dotClass="bg-status-caution" label="주의" />
          <LegendItem dotClass="bg-status-expiring" label="임박" />
        </View>
        <Text className="text-[11px] leading-4 text-content-muted">
          탭하면 상세보기
        </Text>
      </View>
    </View>
  );
}
