// src/shared/ui/back-button/back-button.tsx
//
// BackButton — 레시피 세부 화면 등에서 이전 화면으로 돌아갈 때 사용하는 공통 버튼 컴포넌트.
// 두 가지 색상 변형을 디자인 토큰 기반으로 지원합니다.
//
//   light: 흰 배경(surface-card / #FFFFFF) + 갈색 꺽새(primary / #605856)
//   dark : 갈색 배경(primary / #605856) + 흰 꺽새(white / #FFFFFF)
//
// 크기: 48×48px (primitiveSpacing["12"] — 터치 타겟 최소 크기)
// 반경: 12px (rounded-sm — primitiveRadius.sm)

import { TouchableOpacity } from "react-native";

import { tokens } from "@/shared/config/tokens";
import { IconSymbol } from "@/shared/ui/icon-symbol";

export type BackButtonVariant = "light" | "dark";

interface BackButtonProps {
  onPress?: () => void;
  variant?: BackButtonVariant;
}

export function BackButton({ onPress, variant = "light" }: BackButtonProps) {
  const isLight = variant === "light";

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={
        isLight
          ? "w-12 h-12 items-center justify-center rounded-sm border border-stroke-default bg-white"
          : "w-12 h-12 items-center justify-center rounded-sm bg-primary"
      }
    >
      <IconSymbol
        name="chevron.left"
        size={20}
        color={isLight ? tokens.color.primary : tokens.color.white}
      />
    </TouchableOpacity>
  );
}
