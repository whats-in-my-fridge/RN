// src/shared/ui/toast/toast-message.tsx
// 토스트 메시지 공용 컴포넌트

import { useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";
import { tokens } from "@/shared/config/tokens";
import { type ToastItem, useToastStore } from "@/shared/model/toast";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { primitiveTypography } = require("@/shared/config/token-primitives.js");

export function ToastMessage() {
  const toast = useToastStore((s) => s.toast);
  const [localToast, setLocalToast] = useState<ToastItem | null>(toast);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (toast) {
      setLocalToast(toast);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => setLocalToast(null));
    }
  }, [toast, opacity]);

  if (!localToast) return null;

  return (
    <Animated.View
      style={{
        opacity,
        position: "absolute",
        // 하단 위치: lg(24) + lg(24) + xl(32) + md(16) = 96px
        bottom: tokens.spacing.lg + tokens.spacing.lg + tokens.spacing.xl + tokens.spacing.md,
        alignSelf: "center",
        width: "66%",
        // 배경색: 검정색 60% 투명도
        backgroundColor: `${tokens.color.black}99`,
        // 테두리 반경: 2xl 토큰
        borderRadius: tokens.radius["2xl"],
        // 좌우 패딩: md(16px)
        paddingHorizontal: tokens.spacing.md,
        // 상하 패딩: sm(8px)
        paddingVertical: tokens.spacing.sm,
      }}
      pointerEvents="none"
    >
      <Text
        style={{
          // 텍스트 색: white 토큰
          color: tokens.color.white,
          // 폰트 크기: 토큰 기반 (14px)
          fontSize: primitiveTypography.sm.size,
          // 폰트 가중치: 토큰 기반 (600)
          fontWeight: primitiveTypography.sm.weight,
          textAlign: "center",
        }}
      >
        {localToast.message}
      </Text>
    </Animated.View>
  );
}
