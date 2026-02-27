// src/shared/ui/toast/toast-message.tsx
// 토스트 메시지 공용 컴포넌트

import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Text } from "react-native";
import { tokens } from "@/shared/config/tokens";
import { type ToastItem, useToastStore } from "@/shared/model/toast";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { primitiveTypography } = require("@/shared/config/token-primitives.js");

const TOAST_BOTTOM_OFFSET = 96; // lg(24) + lg(24) + xl(32) + md(16)

export function ToastMessage() {
  const toast = useToastStore((s) => s.toast);
  const [localToast, setLocalToast] = useState<ToastItem | null>(toast);
  const opacity = useRef(new Animated.Value(0)).current;

  const fadeIn = useCallback(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  const fadeOut = useCallback(
    (onDone?: () => void) => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(onDone);
    },
    [opacity],
  );

  useEffect(() => {
    if (toast) {
      setLocalToast(toast);
      fadeIn();
      return;
    }
    fadeOut(() => setLocalToast(null));
  }, [toast, fadeIn, fadeOut]);

  if (!localToast) return null;

  return (
    <Animated.View
      style={{
        opacity,
        position: "absolute",
        bottom: TOAST_BOTTOM_OFFSET,
        alignSelf: "center",
        width: "66%",
        backgroundColor: tokens.color["overlay-dark"],
        borderRadius: tokens.radius["2xl"],
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
      }}
      pointerEvents="none"
    >
      <Text
        style={{
          color: tokens.color.white,
          fontSize: primitiveTypography.sm.size,
          fontWeight: primitiveTypography.sm.weight,
          textAlign: "center",
        }}
      >
        {localToast.message}
      </Text>
    </Animated.View>
  );
}
