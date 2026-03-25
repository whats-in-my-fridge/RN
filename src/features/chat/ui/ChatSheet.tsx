// src/features/chat/ui/ChatSheet.tsx
// 채팅 바텀시트 최상위 조립 컴포넌트.

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { BackHandler, Keyboard, type ScrollView, StyleSheet, View } from "react-native";

import { semanticColors, semanticRadius } from "@/shared/config/tokens";
import { useChatStore } from "../model/store";
import { useChatSend } from "../model/use-chat-send";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";
import { ChatSheetHeader } from "./ChatSheetHeader";

export function ChatSheet() {
  const isOpen = useChatStore((s) => s.isOpen);
  const close = useChatStore((s) => s.close);
  const setPresented = useChatStore((s) => s.setPresented);
  const messages = useChatStore((s) => s.messages);
  const { sendMessage, isPending } = useChatSend();
  const modalRef = useRef<BottomSheetModal>(null);
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (Keyboard.isVisible()) {
        Keyboard.dismiss();
        return true;
      }
      close();
      return true;
    });
    return () => sub.remove();
  }, [isOpen, close]);

  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  const handleAnimate = useCallback(
    (_fromIndex: number, toIndex: number) => {
      if (toIndex >= 0) setPresented(true);
      if (toIndex === -1) setPresented(false);
    },
    [setPresented],
  );

  const handleDismiss = useCallback(() => {
    setPresented(false);
    close();
  }, [setPresented, close]);

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={["75%"]}
      enableDynamicSizing={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="none"
      handleComponent={ChatSheetHeader}
      backgroundStyle={styles.background}
      onAnimate={handleAnimate}
      onDismiss={handleDismiss}
    >
      <View style={styles.content}>
        <View style={styles.messageArea}>
          <ChatMessageList
            messages={messages}
            onChipPress={handleSend}
            isLoading={isPending}
            scrollRef={scrollRef}
          />
        </View>
        <ChatInput
          onSend={handleSend}
          disabled={isPending}
          onFocus={() => {
            const KEYBOARD_SETTLE_DELAY_MS = 150;
            setTimeout(
              () => scrollRef.current?.scrollToEnd?.({ animated: true }),
              KEYBOARD_SETTLE_DELAY_MS,
            );
          }}
        />
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: semanticColors["surface-app"],
    borderTopLeftRadius: semanticRadius["2xl"],
    borderTopRightRadius: semanticRadius["2xl"],
  },
  content: {
    flex: 1,
  },
  messageArea: {
    flex: 1,
  },
});
