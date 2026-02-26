import { BottomSheetHandle, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useWindowDimensions } from "react-native";

import { BOTTOM_SHEET_MAX_HEIGHT_RATIO, bottomSheetStyles } from "./BottomSheet.styles";
import { BottomSheetBackdropCloseable } from "./BottomSheetBackdrop";
import { useBottomSheetModal } from "./useBottomSheetModal";

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const { height } = useWindowDimensions();
  const { modalRef, handleDismiss } = useBottomSheetModal(isOpen, onClose);
  const maxDynamicContentSize = height * BOTTOM_SHEET_MAX_HEIGHT_RATIO;

  return (
    <BottomSheetModal
      ref={modalRef}
      enableDynamicSizing
      enablePanDownToClose
      handleComponent={BottomSheetHandle}
      handleIndicatorStyle={bottomSheetStyles.handleIndicator}
      backdropComponent={BottomSheetBackdropCloseable}
      backgroundStyle={bottomSheetStyles.background}
      maxDynamicContentSize={maxDynamicContentSize}
      onDismiss={handleDismiss}
    >
      <BottomSheetView style={bottomSheetStyles.content}>{children}</BottomSheetView>
    </BottomSheetModal>
  );
}
