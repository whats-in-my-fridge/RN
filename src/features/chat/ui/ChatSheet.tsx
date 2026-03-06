// src/features/chat/ui/ChatSheet.tsx
// 채팅 바텀시트 최상위 조립 컴포넌트.
//
// 구조:
//   handleComponent  → ChatSheetHeader (드래그 핸들 + 고정 헤더, 항상 상단에 표시)
//   직접 자식        → ChatMessageList / BottomSheetScrollView (메시지 스크롤 영역)
//   footerComponent  → BottomSheetFooter + ChatInput (항상 sheet 하단 고정, 키보드와 함께 이동)
//
// 이 구조가 @gorhom/bottom-sheet 에서 chat UI에 권장되는 유일하게 안정적인 패턴이다.
// BottomSheetView 를 사용하면 콘텐츠 높이 측정 로직이 flex 제약을 깨므로 사용하지 않는다.

import { BottomSheetFooter, BottomSheetModal } from "@gorhom/bottom-sheet";
import type { BottomSheetFooterProps } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

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

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={0}>
        <ChatInput onSend={handleSend} />
      </BottomSheetFooter>
    ),
    [handleSend],
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={["75%"]}
      enableDynamicSizing={false}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      handleComponent={ChatSheetHeader}
      footerComponent={renderFooter}
      backgroundStyle={styles.background}
      onDismiss={close}
    >
      <ChatMessageList messages={messages} onChipPress={handleSend} />
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: semanticColors["surface-card"],
    borderTopLeftRadius: semanticRadius["2xl"],
    borderTopRightRadius: semanticRadius["2xl"],
  },
});
