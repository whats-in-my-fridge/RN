import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useEffect, useRef } from "react";

export function useBottomSheetModal(isOpen: boolean, onClose: () => void) {
  const modalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.present();
    } else {
      modalRef.current?.dismiss();
    }
  }, [isOpen]);

  const handleDismiss = useCallback(() => {
    onClose();
  }, [onClose]);

  return { modalRef, handleDismiss };
}
