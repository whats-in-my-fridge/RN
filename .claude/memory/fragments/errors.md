### F20260319-1 | error | importance:9 | 2026-03-19
`@gorhom/bottom-sheet` v5에서 `enableDynamicSizing` + `BottomSheetScrollView`에 `height` style을 직접 지정하면, 시트를 닫고 재오픈 시 높이가 매우 좁아지는 버그와 스크롤이 튕기는 버그가 동시에 발생. 해결: `snapPoints`를 사용하고 `enableDynamicSizing: false`를 명시적으로 설정, `BottomSheetScrollView`에는 `flex: 1`만 지정.
tags: bottom-sheet, enableDynamicSizing, BottomSheetScrollView, snapPoints, height, scroll

### F20260319-2 | error | importance:9 | 2026-03-19
gorhom bottom-sheet v5에서 `snapPoints`를 전달해도 `enableDynamicSizing`의 기본값이 `true`이므로 명시적으로 `enableDynamicSizing: false`를 설정하지 않으면 시트가 처음에 매우 낮은 높이로 열렸다가 사용자가 직접 올려야 하는 버그 발생. `snapPoints` 사용 시 반드시 `enableDynamicSizing: false` 병행.
tags: bottom-sheet, snapPoints, enableDynamicSizing, initial-height, gorhom

### F20260319-3 | error | importance:8 | 2026-03-19
Android에서 `BottomSheetModal` 콘텐츠가 시스템 네비게이션 바(하단 버튼/제스처 바)와 겹치는 문제. 해결: `useSafeAreaInsets().bottom`을 `bottomInset` prop으로 전달하면 시트 포지션 자체가 올라가고 snap point 계산도 정확해짐. SafeAreaView로 내부를 감싸는 방식보다 정확.
tags: bottom-sheet, android, bottomInset, SafeAreaInsets, navigation-bar, overlap
