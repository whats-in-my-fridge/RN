// src/features/chat/ui/ChatMessageList.tsx
// 채팅 메시지 목록 및 초기 퀵 칩을 렌더링하는 컴포넌트.

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { type RefObject, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Pressable,
  type ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { semanticColors, tokens } from "@/shared/config/tokens";
import type { ChatMessage } from "../model/store";

const QUICK_CHIPS = ["레시피 추천", "유통기한 확인", "재료 대체법", "보관 방법"] as const;

interface ChatMessageListProps {
  messages: ChatMessage[];
  onChipPress: (chip: string) => void;
  isLoading?: boolean;
  scrollRef: RefObject<ScrollView | null>;
}

export function ChatMessageList({
  messages,
  onChipPress,
  isLoading,
  scrollRef,
}: ChatMessageListProps) {
  const prevCountRef = useRef(messages.length);

  useEffect(() => {
    if (messages.length > prevCountRef.current) {
      scrollRef.current?.scrollToEnd?.({ animated: true });
    }
    prevCountRef.current = messages.length;
  }, [messages.length, scrollRef]);

  return (
    <BottomSheetScrollView
      ref={scrollRef}
      style={styles.list}
      contentContainerStyle={styles.content}
    >
      {messages.map((msg) => (
        <View key={msg.id} style={[styles.row, msg.role === "user" && styles.rowUser]}>
          {msg.role === "assistant" && (
            <View style={styles.avatar}>
              <Text style={styles.avatarIcon}>💬</Text>
            </View>
          )}
          <View
            style={[
              styles.bubble,
              msg.role === "user" ? styles.bubbleUser : styles.bubbleAssistant,
            ]}
          >
            <Text
              style={[
                styles.bubbleText,
                msg.role === "user" ? styles.bubbleTextUser : styles.bubbleTextAssistant,
              ]}
            >
              {msg.text}
            </Text>
          </View>
        </View>
      ))}

      {isLoading && (
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Text style={styles.avatarIcon}>💬</Text>
          </View>
          <View style={[styles.bubble, styles.bubbleAssistant, styles.typingBubble]}>
            <ActivityIndicator size="small" color={semanticColors["content-secondary"]} />
          </View>
        </View>
      )}

      {messages.length === 1 && (
        <View style={styles.chips}>
          {QUICK_CHIPS.map((chip) => (
            <Pressable key={chip} style={styles.chip} onPress={() => onChipPress(chip)}>
              <Text style={styles.chipText}>{chip}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.sm,
    paddingBottom: tokens.spacing.sm,
    gap: tokens.spacing.sm,
  },

  // 메시지 행
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: tokens.spacing.sm,
  },
  rowUser: {
    flexDirection: "row-reverse",
  },

  // 아바타
  avatar: {
    width: 36,
    height: 36,
    borderRadius: tokens.radius.full,
    backgroundColor: semanticColors["content-primary"],
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  avatarIcon: {
    fontSize: 16,
  },

  // 말풍선
  bubble: {
    maxWidth: "78%",
    borderRadius: tokens.radius.lg,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  bubbleAssistant: {
    backgroundColor: semanticColors["surface-section"],
  },
  bubbleUser: {
    backgroundColor: semanticColors.primary,
  },
  bubbleText: {
    fontSize: 15,
    lineHeight: 22,
  },
  bubbleTextAssistant: {
    color: semanticColors["content-primary"],
  },
  bubbleTextUser: {
    color: semanticColors.white,
  },

  // 퀵 칩
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: tokens.spacing.xs,
    marginTop: tokens.spacing.xs,
  },
  chip: {
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: 6,
    borderRadius: tokens.radius.full,
    borderWidth: 1,
    borderColor: semanticColors["stroke-default"],
    backgroundColor: semanticColors["surface-card"],
  },
  chipText: {
    fontSize: 13,
    color: semanticColors["content-primary"],
  },
  typingBubble: {
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
});
