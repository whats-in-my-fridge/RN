// 냉장고 선반 상세 바텀시트 — ShelfDetailHeader, ShelfInfoBanner, FridgeItemRow 조립

import { FridgeItemRow, ShelfDetailHeader, ShelfInfoBanner } from "@/entities/fridge";
import { tokens } from "@/shared/config/tokens";
import { BottomSheet, BottomSheetScrollView } from "@/shared/ui/bottom-sheet";

import { useShelfDetailStore } from "../model/useShelfDetail";

// 헤더 + 배너 + 아이템 5개 분량이 자연스럽게 들어오는 스냅포인트
const SHELF_DETAIL_SNAP_POINTS = ["60%"];

const SCROLL_MARGIN_TOP = tokens.spacing.card; // 12px — 배너와 목록 사이 여백
const SCROLL_PADDING_HORIZONTAL = 20; // px — 좌우 여백 (디자인 지정값)
const SCROLL_PADDING_BOTTOM = tokens.spacing.sm; // 8px — 목록 하단 여백
const SCROLL_ITEM_GAP = tokens.spacing.sm; // 8px — 아이템 행 간격

export function ShelfDetailSheet() {
  const selectedSection = useShelfDetailStore((s) => s.selectedSection);
  const close = useShelfDetailStore((s) => s.close);
  const deleteItem = useShelfDetailStore((s) => s.deleteItem);

  return (
    <BottomSheet
      isOpen={selectedSection !== null}
      onClose={close}
      snapPoints={SHELF_DETAIL_SNAP_POINTS}
    >
      {selectedSection && (
        <>
          <ShelfDetailHeader section={selectedSection} onClose={close} />
          <ShelfInfoBanner shelfType={selectedSection.type} />
          <BottomSheetScrollView
            style={{ flex: 1, marginTop: SCROLL_MARGIN_TOP }}
            contentContainerStyle={{
              paddingHorizontal: SCROLL_PADDING_HORIZONTAL,
              paddingBottom: SCROLL_PADDING_BOTTOM,
              gap: SCROLL_ITEM_GAP,
            }}
          >
            {selectedSection.items.map((item) => (
              <FridgeItemRow key={item.id} item={item} onDelete={() => deleteItem(item.id)} />
            ))}
          </BottomSheetScrollView>
        </>
      )}
    </BottomSheet>
  );
}
