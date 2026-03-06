// src/features/chat/ui/ChatSheetHeader.tsx
// BottomSheetModal의 handleComponent로 사용되는 고정 헤더.
// 드래그 인디케이터 + 채팅 타이틀 + 닫기 버튼을 포함한다.

import type { BottomSheetHandleProps } from "@gorhom/bottom-sheet";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { semanticColors, tokens } from "@/shared/config/tokens";
import { useChatStore } from "../model/store";

export function ChatSheetHeader(_: BottomSheetHandleProps) {
  const close = useChatStore((s) => s.close);

  return (
    <View style={styles.container}>
      <View style={styles.indicator} />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>요리 도우미</Text>
          <Text style={styles.subtitle}>냉장고 재료 기반 AI 어시스턴트</Text>
        </View>
        <Pressable onPress={close} style={styles.closeButton} accessibilityLabel="채팅 닫기">
          <Text style={styles.closeIcon}>⌄</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: tokens.spacing.sm,
    backgroundColor: semanticColors["surface-app"],
    borderTopLeftRadius: tokens.radius["2xl"],
    borderTopRightRadius: tokens.radius["2xl"],
  },
  indicator: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: tokens.radius.full,
    backgroundColor: semanticColors["stroke-default"],
    marginBottom: tokens.spacing.sm,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: semanticColors["stroke-default"],
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: semanticColors["content-primary"],
  },
  subtitle: {
    fontSize: 13,
    color: semanticColors["content-secondary"],
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: tokens.radius.full,
    backgroundColor: semanticColors["surface-section"],
    alignItems: "center",
    justifyContent: "center",
  },
  closeIcon: {
    fontSize: 20,
    color: semanticColors["content-secondary"],
    lineHeight: 22,
  },
});
