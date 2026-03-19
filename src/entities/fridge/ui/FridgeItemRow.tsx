// 냉장고 재료 한 줄 행 — 이름, 수량·유통기한, 신선도 뱃지, 삭제 버튼

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";

import type { FreshnessStatus, FridgeItem } from "@/entities/fridge/model/types";
import { tokens } from "@/shared/config/tokens";

// ─── 상수 ────────────────────────────────────────────────────────────────────

const STATUS_LABEL: Record<FreshnessStatus, string> = {
  fresh: "신선",
  caution: "주의",
  expiring: "임박",
};

const DELETE_ICON_SIZE = 12;

// ─── FridgeItemRow ────────────────────────────────────────────────────────────

type Props = {
  item: FridgeItem;
  onDelete: () => void;
};

export function FridgeItemRow({ item, onDelete }: Props) {
  const badge = tokens.component.statusBadge[item.freshnessStatus];
  const label = STATUS_LABEL[item.freshnessStatus];
  const subText = [item.quantity, `D-${item.daysUntilExpiry}일`].filter(Boolean).join(" · ");

  return (
    <View className="flex-row items-center gap-3 bg-surface-card border border-stroke-default rounded-card px-md py-card">
      {/* 이름 + 부가 정보 */}
      <View className="flex-1 gap-[2px]">
        <Text className="text-md text-content-primary">{item.name}</Text>
        <Text className="text-xs text-content-muted">{subText}</Text>
      </View>

      {/* 신선도 뱃지 */}
      <View
        className="rounded-full px-2.5 h-6 items-center justify-center border"
        style={{ backgroundColor: badge.bg, borderColor: badge.border }}
      >
        <Text className="text-2xs font-semibold" style={{ color: badge.text }}>
          {label}
        </Text>
      </View>

      {/* 삭제 버튼 */}
      <Pressable
        onPress={onDelete}
        className="w-6 h-6 rounded-full bg-surface-section items-center justify-center"
      >
        <MaterialIcons
          name="close"
          size={DELETE_ICON_SIZE}
          color={tokens.color["content-secondary"]}
        />
      </Pressable>
    </View>
  );
}
