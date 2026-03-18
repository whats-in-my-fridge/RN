// 재료 추가 바텀시트 래퍼 — BottomSheet + AddItemForm 조립
// isOpen/onClose로 열고 닫음

import { BottomSheet } from "@/shared/ui/bottom-sheet";
import { AddItemForm } from "./AddItemForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AddItemSheet({ isOpen, onClose }: Props) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <AddItemForm onClose={onClose} />
    </BottomSheet>
  );
}
