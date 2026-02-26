import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useBottomSheetStore } from "@/shared/model/bottom-sheet";
import { BottomSheet } from "@/shared/ui/bottom-sheet";

interface BottomSheetProviderProps {
  children: React.ReactNode;
}

/**
 * App 레이어: store와 BottomSheet를 조립합니다.
 * Store를 구독하고, 순수 BottomSheet에 props를 전달합니다.
 */
export function BottomSheetProvider({ children }: BottomSheetProviderProps) {
  const content = useBottomSheetStore((s) => s.content);
  const close = useBottomSheetStore((s) => s.close);
  const isOpen = content !== null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        {children}
        <BottomSheet isOpen={isOpen} onClose={close}>
          {content}
        </BottomSheet>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
