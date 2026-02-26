# BottomSheet

바텀시트 UI 컴포넌트. Store를 알지 못하며, `isOpen` / `onClose` / `children`만 받아 그립니다.

## 아키텍처

```
shared/ui/bottom-sheet     → 순수 UI (BottomSheet 컴포넌트)
shared/model/bottom-sheet  → 상태 관리 (useBottomSheetStore)
app/providers             → store + BottomSheet 조립 (BottomSheetProvider)
```

- **BottomSheet**: props만 받아 렌더링하는 순수 컴포넌트
- **useBottomSheetStore**: `open()`, `close()`, `content` 상태
- **BottomSheetProvider**: 앱 루트 `_layout.tsx`에서 store와 BottomSheet를 연결

## 사용법

### 1. 바텀시트 열기

`useBottomSheetStore`의 `open()`에 **ReactNode**를 넘깁니다.

```tsx
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { useBottomSheetStore } from "@/shared/model/bottom-sheet";

function MyScreen() {
  const openBottomSheet = useBottomSheetStore((s) => s.open);

  return (
    <Pressable
      onPress={() =>
        openBottomSheet(
          <BottomSheetScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 24,
              paddingBottom: 40,
            }}
          >
            <Text>바텀시트 내용</Text>
          </BottomSheetScrollView>,
        )
      }
    >
      <Text>바텀시트 열기</Text>
    </Pressable>
  );
}
```

### 2. 스크롤 가능한 내용

스크롤이 필요하면 `BottomSheetScrollView`를 사용합니다.

```tsx
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";

openBottomSheet(
  <BottomSheetScrollView
    contentContainerStyle={{
      paddingHorizontal: 20,
      paddingTop: 24,
      paddingBottom: 40,
    }}
  >
    {/* 긴 내용 */}
  </BottomSheetScrollView>,
);
```

### 3. 스크롤 없는 정적 내용

`BottomSheetView` 또는 일반 `View`를 사용할 수 있습니다.

```tsx
import { BottomSheetView } from "@gorhom/bottom-sheet";

openBottomSheet(
  <BottomSheetView style={{ padding: 20 }}>
    <Text>짧은 내용</Text>
  </BottomSheetView>,
);
```

## 닫기

- **백드롭 탭**: 바깥 어두운 영역 탭 시 닫힘
- **아래로 스와이프**: 시트를 아래로 당기면 닫힘
- **프로그래밍 방식**: `useBottomSheetStore`의 `close()` 호출

```tsx
const close = useBottomSheetStore((s) => s.close);
close(); // 바텀시트 닫기
```

## 전제 조건

- 앱 루트 `_layout.tsx`에서 `BottomSheetProvider`로 감싸져 있어야 합니다.
- `BottomSheetProvider`는 `GestureHandlerRootView`와 `BottomSheetModalProvider`를 포함합니다.
