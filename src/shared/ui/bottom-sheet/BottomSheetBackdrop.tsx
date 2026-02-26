import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

export function BottomSheetBackdropCloseable(props: BottomSheetBackdropProps) {
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
