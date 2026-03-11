// src/features/chat/ui/ChatSheet.tsx
// 채팅 바텀시트 최상위 조립 컴포넌트.

import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as Crypto from "expo-crypto";
import { useCallback, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";

import { semanticColors, semanticRadius } from "@/shared/config/tokens";
import { useChatStore } from "../model/store";
import { ChatInput } from "./ChatInput";
import { ChatMessageList } from "./ChatMessageList";
import { ChatSheetHeader } from "./ChatSheetHeader";

export function ChatSheet() {
  const isOpen = useChatStore((s) => s.isOpen);
  const close = useChatStore((s) => s.close);
  const messages = useChatStore((s) => s.messages);
  const addMessage = useChatStore((s) => s.addMessage);
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
      addMessage({ id: Crypto.randomUUID(), role: "user", text });
    },
    [addMessage],
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={["75%"]}
      enableDynamicSizing={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      handleComponent={ChatSheetHeader}
      backgroundStyle={styles.background}
      onDismiss={close}
    >
      <View style={styles.content}>
        <View style={styles.messageArea}>
          <ChatMessageList messages={messages} onChipPress={handleSend} />
        </View>
        <ChatInput onSend={handleSend} />
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
