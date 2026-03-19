import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import {
  BottomSheetBackdrop,
  BottomSheetHandle,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { useWindowDimensions } from "react-native";

import { BOTTOM_SHEET_MAX_HEIGHT_RATIO, bottomSheetStyles } from "./BottomSheet.styles";

function BottomSheetBackdropCloseable(props: BottomSheetBackdropProps) {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
      opacity={0.5}
    />
  );
}

export interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const { height } = useWindowDimensions();
  const modalRef = useRef<BottomSheetModal>(null);
  const maxDynamicContentSize = height * BOTTOM_SHEET_MAX_HEIGHT_RATIO;

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleDismiss = useCallback(() => onClose(), [onClose]);

  return (
    <BottomSheetModal
      ref={modalRef}
      enableDynamicSizing
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
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
