// 아이템 이름을 표시하는 최소 UI 단위 칩 컴포넌트

import { Text, View } from "react-native";

// 칩 레이아웃 상수 — ShelfRow/DualShelfRow에서 overflow 클리핑 영역 계산에 사용
// py-[3px](6px) + leading-[17px](17px) = 23px, 행 간 gap-1.5 = 6px
export const CHIP_HEIGHT = 23;
export const CHIP_ROW_GAP = 6;
export const CHIPS_AREA_HEIGHT = CHIP_HEIGHT * 2 + CHIP_ROW_GAP; // 2줄 고정 = 52px

type Props = {
  name: string;
};

export function ItemChip({ name }: Props) {
  return (
    <View className="flex-row items-center rounded-full pl-[7px] pr-[8px] py-[3px] bg-surface-section">
      <Text className="text-[11px] leading-[17px] text-primary">{name}</Text>
    </View>
  );
}
