// src/features/chat/ui/ChatMessageList.tsx
// 채팅 메시지 목록 및 초기 퀵 칩을 렌더링하는 컴포넌트.
// BottomSheetScrollView 를 사용하여 바텀시트 내부에서 스크롤이 올바르게 동작한다.

import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useRef } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { semanticColors, tokens } from "@/shared/config/tokens";
import type { ChatMessage } from "../model/store";

const QUICK_CHIPS = ["레시피 추천", "유통기한 확인", "재료 대체법", "보관 방법"] as const;

interface ChatMessageListProps {
  messages: ChatMessage[];
  onChipPress: (chip: string) => void;
}

export function ChatMessageList({ messages, onChipPress }: ChatMessageListProps) {
  const scrollRef = useRef<ScrollView>(null);

  return (
    <BottomSheetScrollView
      ref={scrollRef}
      style={styles.list}
      contentContainerStyle={styles.content}
      onContentSizeChange={() => scrollRef.current?.scrollToEnd?.({ animated: true })}
    >
      {messages.map((msg) => (
        <View
          key={msg.id}
          style={[styles.row, msg.role === "user" && styles.rowUser]}
        >
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
    // 메시지를 항상 하단에 고정 (iMessage/WhatsApp 표준 패턴).
    // 메시지가 적어도 하단부터 쌓이므로 상단 공백이 생기지 않는다.
    // 메시지가 영역을 초과하면 flexGrow가 확장을 막고 스크롤이 동작한다.
    justifyContent: "flex-end",
    paddingHorizontal: tokens.spacing.md,
    paddingTop: tokens.spacing.sm,
    // footerComponent(ChatInput)가 절대 위치로 하단을 덮으므로
    // 마지막 메시지가 가리지 않도록 footer 높이(≈72px)만큼 여백 추가
    paddingBottom: 72,
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
    borderRadius: 18,
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
});
