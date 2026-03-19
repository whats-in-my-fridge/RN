### F20260319-4 | decision | importance:8 | 2026-03-19
냉장고 보드 칩 overflow 해결 방식: MAX_VISIBLE_CHIPS 개수 제한 대신 칩 컨테이너에 고정 픽셀 높이를 지정. `ItemChip` 높이 = `py-[3px]`(6px) + `leading-[17px]`(17px) = 23px, 행 간 gap = 6px, 2줄 기준 height = 52px. `overflow: 'hidden'`이 정확히 행 경계에서 잘라 부분 노출이 구조적으로 불가. ShelfRow/DualShelfSection 모두 동일하게 적용.
tags: fridge-board, chip-overflow, CHIP_HEIGHT, overflow-hidden, ShelfRow, DualShelfSection

### F20260319-5 | decision | importance:7 | 2026-03-19
냉장고 보드 섹션 전체를 Pressable로 감싸고 ItemChip에서 onPress 제거. 이전에는 개별 칩만 Pressable이었으나, 빈 영역 탭 시 아무 반응 없는 버그 존재. Pressable 중첩 시 내부가 터치를 가로채는 RN 특성 때문에 ItemChip을 View로 교체 필수.
tags: fridge-board, Pressable, ItemChip, onPress, touch-area
