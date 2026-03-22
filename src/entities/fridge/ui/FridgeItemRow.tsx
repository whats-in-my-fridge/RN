// 냉장고 재료 한 줄 행 — 이름, 수량, 삭제 버튼

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Pressable, Text, View } from "react-native";

import type { FridgeItem } from "@/entities/fridge/model/types";
import { tokens } from "@/shared/config/tokens";

// ─── 상수 ────────────────────────────────────────────────────────────────────

const DELETE_ICON_SIZE = 12;

// ─── FridgeItemRow ────────────────────────────────────────────────────────────

type Props = {
  item: FridgeItem;
  onDelete: () => void;
};

export function FridgeItemRow({ item, onDelete }: Props) {
  return (
    <View className="flex-row items-center gap-3 bg-surface-card border border-stroke-default rounded-card px-md py-card">
      {/* 이름 + 수량 */}
      <View className="flex-1 gap-[2px]">
        <Text className="text-md text-content-primary">{item.name}</Text>
        {item.quantity && <Text className="text-xs text-content-muted">{item.quantity}</Text>}
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
