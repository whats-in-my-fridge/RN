// src/features/chat-widget/ui/ChatFloatingButton.tsx

import type { GestureResponderEvent } from "react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ChatIcon } from "@/shared/assets/icons";
import { semanticColors, tokens } from "@/shared/config/tokens";

interface ChatFloatingButtonProps {
  onPress?: (e: GestureResponderEvent) => void;
}

export function ChatFloatingButton({ onPress }: ChatFloatingButtonProps) {
  const insets = useSafeAreaInsets();
  // 하단 안전 영역(insets.bottom) + RN default 탭바 높이(49) +15
  const bottomOffset = insets.bottom + 49 + 15;

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { bottom: bottomOffset }]}
      accessibilityRole="button"
      accessibilityLabel="채팅 열기"
    >
      <View style={styles.circle}>
        <ChatIcon />
      </View>
    </Pressable>
  );
}

const BUTTON_SIZE = 48;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: tokens.spacing.screen, // ≒ 16px
    zIndex: 50,
  },
  circle: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: tokens.radius.full,
    backgroundColor: semanticColors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: semanticColors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 8,
  },
});
