// src/features/chat/ui/ChatPanel.tsx
// 채팅 바텀시트 내부 조립 컴포넌트.
// 헤더(제목 + 닫기) + ChatMessageList + ChatInput 을 수직으로 배치한다.

import { Pressable, StyleSheet, Text, View } from "react-native";

import { semanticColors, tokens } from "@/shared/config/tokens";
import { useChatStore } from "../model/store";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";

export function ChatPanel() {
  const { messages, close, addMessage } = useChatStore();

  function handleSend(text: string) {
    addMessage({ id: Date.now().toString(), role: "user", text });
  }

  function handleChipPress(chip: string) {
    addMessage({ id: Date.now().toString(), role: "user", text: chip });
  }

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>요리 도우미</Text>
          <Text style={styles.subtitle}>냉장고 재료 기반 AI 어시스턴트</Text>
        </View>
        <Pressable onPress={close} style={styles.closeButton} accessibilityLabel="채팅 닫기">
          <Text style={styles.closeIcon}>⌄</Text>
        </Pressable>
      </View>

      {/* 메시지 목록 — flex: 1 View로 감싸서 스크롤 영역이 입력창을 밀지 않도록 제약 */}
      <View style={styles.messageArea}>
        <ChatMessageList messages={messages} onChipPress={handleChipPress} />
      </View>

      {/* 입력창 — 항상 sheet 하단에 고정 */}
      <ChatInput onSend={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageArea: {
    flex: 1,
    // 이 View가 명시적 flex 경계를 만들어,
    // BottomSheetScrollView 가 메시지 증가에 따라 영역 밖으로 팽창하지 않도록 막는다.
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
    borderRadius: 18,
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
