// src/features/chat/ui/ChatSheet.tsx
// 채팅 바텀시트 최상위 조립 컴포넌트.

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { semanticColors, semanticRadius } from "@/shared/config/tokens";
import { useChatStore } from "../model/store";
import { useChatSend } from "../model/use-chat-send";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";
import { ChatSheetHeader } from "./ChatSheetHeader";

export function ChatSheet() {
  const isOpen = useChatStore((s) => s.isOpen);
  const close = useChatStore((s) => s.close);
  const messages = useChatStore((s) => s.messages);
  const { sendMessage, isPending } = useChatSend();
  const modalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={["75%"]}
      enableDynamicSizing={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="none"
      handleComponent={ChatSheetHeader}
      backgroundStyle={styles.background}
      onDismiss={close}
    >
      <View style={styles.content}>
        <View style={styles.messageArea}>
          <ChatMessageList messages={messages} onChipPress={handleSend} isLoading={isPending} />
        </View>
        <ChatInput onSend={handleSend} disabled={isPending} />
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
