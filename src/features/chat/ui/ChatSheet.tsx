// src/features/chat/ui/ChatSheet.tsx
// 채팅 바텀시트 최상위 조립 컴포넌트.
//
// 구조:
//   handleComponent → ChatSheetHeader (드래그 핸들 + 고정 헤더)
//   직접 자식       → View(flex:1) > View(flex:1, messageArea) + ChatInput
//
// footerComponent 를 사용하지 않는 이유:
//   BottomSheetFooter의 bottomInset 을 키보드 상태에 따라 동적으로 바꾸면
//   키보드 애니메이션 도중 footer가 re-render 되어 레이아웃이 깨진다.
//   keyboardBehavior="interactive" 가 sheet 전체를 키보드와 함께 올려주므로
//   ChatInput 을 일반 flex 자식으로 두면 자연스럽게 키보드 위에 위치한다.

import { BottomSheetModal } from "@gorhom/bottom-sheet";
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
      addMessage({ id: Date.now().toString(), role: "user", text });
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
