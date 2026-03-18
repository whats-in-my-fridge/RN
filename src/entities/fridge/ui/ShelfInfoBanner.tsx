// 선반별 보관 가이드 배너 — 아이콘과 한 줄 설명을 표시하는 정보 배너

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native";

import type { ShelfType } from "@/entities/fridge/model/types";
import { tokens } from "@/shared/config/tokens";

// ─── 상수 ────────────────────────────────────────────────────────────────────

const SHELF_GUIDE: Record<ShelfType, string> = {
  "fresh-storage": "유제품, 계란, 두부 등 신선 식품을 보관하세요.",
  "chilled-left": "밥, 반찬, 조리식품 등 주식류를 보관하세요.",
  "chilled-right": "소스, 음료, 조미료 등을 보관하세요.",
  "vegetable-drawer": "채소, 과일 등 신선 농산물을 보관하세요.",
  freezer: "육류, 어패류, 냉동 채소 등 장기 보관 식품을 보관하세요.",
};

// ─── ShelfInfoBanner ──────────────────────────────────────────────────────────

type Props = {
  shelfType: ShelfType;
};

export function ShelfInfoBanner({ shelfType }: Props) {
  return (
    <View
      className="flex-row items-center gap-[10px] mx-5 px-3 py-[10px] rounded-[14px] border"
      style={{
        backgroundColor: tokens.color["status-warn-bg"],
        borderColor: tokens.color["status-warn-border"],
      }}
    >
      <MaterialIcons name="info-outline" size={14} color={tokens.color["content-secondary"]} />
      <Text className="flex-1 text-xs text-content-secondary">{SHELF_GUIDE[shelfType]}</Text>
    </View>
  );
}
