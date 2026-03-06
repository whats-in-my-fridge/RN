// src/features/chat/ui/ChatInput.tsx
// 채팅 텍스트 입력창과 전송 버튼 컴포넌트.
// BottomSheetModal 내부에서 키보드 처리가 올바르게 동작하도록
// @gorhom/bottom-sheet 의 BottomSheetTextInput 을 사용한다.

import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { semanticColors, tokens } from "@/shared/config/tokens";

interface ChatInputProps {
  onSend: (text: string) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hide = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  // 키보드 닫힘: insets.bottom으로 nav bar 위에 위치
  // 키보드 열림: sheet 전체가 키보드와 함께 올라오므로 추가 패딩 불필요
  const paddingBottom = keyboardVisible
    ? tokens.spacing.sm
    : Math.max(tokens.spacing.sm, insets.bottom);

  return (
    <View style={[styles.row, { paddingBottom }]}>
      <BottomSheetTextInput
        style={styles.input}
        placeholder="메시지를 입력하세요..."
        placeholderTextColor={semanticColors["content-secondary"]}
        value={value}
        onChangeText={setValue}
        onSubmitEditing={handleSend}
        returnKeyType="send"
        multiline={false}
      />
      <Pressable
        style={[styles.sendButton, !value.trim() && styles.disabled]}
        onPress={handleSend}
        accessibilityLabel="전송"
      >
        <Text style={styles.sendIcon}>➤</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: semanticColors["stroke-default"],
    // BottomSheetFooter 위에 절대 위치로 올라오므로
    // 배경을 명시해 메시지가 비쳐 보이지 않도록 함
    backgroundColor: semanticColors["surface-app"],
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: tokens.radius.full,
    paddingHorizontal: tokens.spacing.md,
    backgroundColor: semanticColors["surface-section"],
    color: semanticColors["content-primary"],
    fontSize: 15,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: tokens.radius.full,
    backgroundColor: semanticColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    opacity: 0.4,
  },
  sendIcon: {
    color: semanticColors.white,
    fontSize: 18,
  },
});
