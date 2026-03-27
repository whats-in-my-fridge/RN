import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import {
  BottomSheetBackdrop,
  BottomSheetHandle,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";
import { useWindowDimensions, View } from "react-native";

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
  /** 고정 스냅포인트. 지정하면 enableDynamicSizing 대신 사용. 스크롤 콘텐츠가 있는 시트에 필요. */
  snapPoints?: (string | number)[];
}

export function BottomSheet({ isOpen, onClose, children, snapPoints }: BottomSheetProps) {
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

  const sizeProps = snapPoints
    ? { snapPoints, index: 0, enableDynamicSizing: false }
    : { enableDynamicSizing: true, maxDynamicContentSize };

  return (
    <BottomSheetModal
      ref={modalRef}
      {...sizeProps}
      enablePanDownToClose
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      handleComponent={BottomSheetHandle}
      handleIndicatorStyle={bottomSheetStyles.handleIndicator}
      backdropComponent={BottomSheetBackdropCloseable}
      backgroundStyle={bottomSheetStyles.background}
      onDismiss={handleDismiss}
    >
      {snapPoints ? (
        <View style={bottomSheetStyles.content}>{children}</View>
      ) : (
        <BottomSheetView style={bottomSheetStyles.content}>{children}</BottomSheetView>
      )}
    </BottomSheetModal>
  );
}
