import { BottomSheetHandle, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { bottomSheetStyles, maxDynamicContentSize } from "./BottomSheet.styles";
import { BottomSheetBackdropCloseable } from "./BottomSheetBackdrop";
import { useBottomSheetModal } from "./useBottomSheetModal";

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const { modalRef, handleDismiss } = useBottomSheetModal(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

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
