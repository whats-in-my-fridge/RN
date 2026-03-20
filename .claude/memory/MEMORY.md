# Project Memory — whats_in_my_fridge (RN)

---

### F20260319-1 | error | importance:9 | 2026-03-19
`enableDynamicSizing` + `BottomSheetScrollView`에 `height` 직접 지정 → 재오픈 높이 버그 + 스크롤 튕김. 해결: `snapPoints` + `enableDynamicSizing: false` + ScrollView에 `flex: 1`.
tags: bottom-sheet, enableDynamicSizing, snapPoints, scroll

### F20260319-2 | error | importance:9 | 2026-03-19
gorhom v5에서 `snapPoints` 전달해도 `enableDynamicSizing` 기본값 `true` → 시트 낮게 열림. `snapPoints` 사용 시 `enableDynamicSizing: false` 반드시 명시.
tags: bottom-sheet, snapPoints, enableDynamicSizing

### F20260319-3 | error | importance:8 | 2026-03-19
Android 네비게이션 바와 BottomSheet 겹침. 해결: `bottomInset={useSafeAreaInsets().bottom}` prop 전달.
tags: bottom-sheet, android, bottomInset, navigation-bar

### F20260319-4 | decision | importance:8 | 2026-03-19
칩 overflow 해결: 개수 제한 대신 고정 픽셀 높이. ItemChip 23px, gap 6px, 2줄 = 52px. `overflow: 'hidden'`이 정확히 행 경계에서 클리핑.
tags: fridge-board, chip-overflow, CHIP_HEIGHT
