# chat feature

냉장고 재료 기반 AI 요리 도우미 채팅 기능. 앱 어디서나 플로팅 버튼으로 열 수 있는 글로벌 바텀시트 채팅 UI.

---

## 폴더 구조

```
src/features/chat/
├── index.ts                   # 공개 API (barrel export)
├── model/
│   └── store.ts               # Zustand 전역 상태 (열림/닫힘, 메시지)
└── ui/
    ├── ChatSheet.tsx          # 바텀시트 최상위 조립 컴포넌트 ★
    ├── ChatSheetHeader.tsx    # 드래그 핸들 + 제목 + 닫기 버튼
    ├── ChatMessageList.tsx    # 메시지 목록 + 퀵 칩
    ├── ChatInput.tsx          # 텍스트 입력창 + 전송 버튼
    ├── ChatFloatingButton.tsx # 채팅 열기 플로팅 버튼
    └── ChatPanel.tsx          # (미사용) 이전 헤더 조립 방식 잔여물
```

---

## 상태 관리 — `model/store.ts`

`useChatStore` (Zustand)

| 상태/액션 | 타입 | 설명 |
|---|---|---|
| `isOpen` | `boolean` | 채팅 시트 열림 여부 |
| `messages` | `ChatMessage[]` | 전체 메시지 목록 |
| `open()` | `() => void` | 시트 열기 |
| `close()` | `() => void` | 시트 닫기 |
| `addMessage(msg)` | `(ChatMessage) => void` | 메시지 추가 |

```ts
interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  text: string;
}
```

초기 메시지(웰컴 메시지)는 스토어 생성 시 자동 삽입된다.

---

## 컴포넌트 구조

```
_layout.tsx
├── ChatFloatingButton   ← isOpen=false일 때만 렌더
├── ChatSheet            ← 항상 마운트, isOpen으로 present/dismiss 제어
└── <View chatBgOverlay> ← isOpen=true일 때 시트 하단 노출 영역 덮기
```

### ChatSheet

`@gorhom/bottom-sheet`의 `BottomSheetModal`을 사용한다.

**핵심 설정:**
```tsx
<BottomSheetModal
  snapPoints={["75%"]}
  enableDynamicSizing={false}
  keyboardBehavior="interactive"   // 키보드와 함께 시트 전체가 올라감
  keyboardBlurBehavior="restore"   // 키보드 닫히면 원래 위치로
  handleComponent={ChatSheetHeader}
>
  <View style={{ flex: 1 }}>
    <View style={{ flex: 1 }}>
      <ChatMessageList />
    </View>
    <ChatInput />   {/* flex 자식으로 배치 — footerComponent 사용 안 함 */}
  </View>
</BottomSheetModal>
```

`isOpen` 변경 → `useEffect`에서 `modalRef.current?.present()` / `dismiss()` 호출.

### ChatInput

- `BottomSheetTextInput` 사용 (gorhom 전용, 시트 내부 포커스 처리)
- 키보드 상태(`Keyboard.addListener`)에 따라 `paddingBottom` 동적 설정
  - 키보드 열림: `tokens.spacing.sm` (시트가 올라왔으므로 추가 패딩 불필요)
  - 키보드 닫힘: `Math.max(tokens.spacing.sm, insets.bottom)` (Android 네비게이션 바 회피)

### ChatMessageList

- `BottomSheetScrollView` 사용 (gorhom 전용, 시트 내부 제스처 충돌 방지)
- 메시지가 1개(웰컴 메시지)일 때 퀵 칩 4개 표시: 레시피 추천 / 유통기한 확인 / 재료 대체법 / 보관 방법
- `justifyContent: "flex-end"` — 메시지가 적을 때 하단 정렬 (iMessage 패턴)

### ChatSheetHeader

- `BottomSheetHandleProps`를 받는 `handleComponent`로 등록
- 드래그 인디케이터 + 제목/부제 + 닫기 버튼 포함

### ChatFloatingButton

- `position: absolute`, `right: tokens.spacing.screen`, `bottom: insets.bottom + 49(탭바) + 16`
- `isOpen=true` 동안 `_layout.tsx`에서 렌더링 제외 (`{!isChatOpen && <ChatFloatingButton />}`)

---

## 글로벌 등록 방법

`src/app/_layout.tsx`에 한 번만 등록한다.

```tsx
import { ChatFloatingButton, ChatSheet, useChatStore } from "@/features/chat";

export default function RootLayout() {
  const openChat = useChatStore((s) => s.open);
  const isChatOpen = useChatStore((s) => s.isOpen);

  return (
    <BottomSheetProvider>
      {/* ... Stack ... */}
      {!isChatOpen && <ChatFloatingButton onPress={openChat} />}
      <ChatSheet />
      {/* snapPoints 75% 아래 노출 영역(탭바 등)을 아이보리로 덮는 오버레이 */}
      {isChatOpen && <View pointerEvents="none" style={chatBgOverlayStyle} />}
    </BottomSheetProvider>
  );
}
```

> `BottomSheetProvider`(= `BottomSheetModalProvider`)가 반드시 최상위에 있어야 `BottomSheetModal` 포털이 동작한다.

---

## 다른 곳에서 채팅 열기

```ts
import { useChatStore } from "@/features/chat";

const open = useChatStore((s) => s.open);
open(); // 채팅 시트 열림
```

---

## 디자인 토큰

| 역할 | 토큰 |
|---|---|
| 시트/헤더/입력바 배경 | `semanticColors["surface-app"]` (#FDFBF8, 아이보리) |
| 메시지 입력 필드 배경 | `semanticColors["stroke-default"]` |
| 어시스턴트 말풍선 | `semanticColors["surface-section"]` |
| 유저 말풍선 | `semanticColors.primary` |
| 구분선/테두리 | `semanticColors["stroke-default"]` |

---

## 주의사항

- **`footerComponent` 사용 금지**: `BottomSheetFooter.bottomInset`을 동적으로 바꾸면 키보드 애니메이션 중 re-render가 발생해 레이아웃이 깨진다. `ChatInput`은 반드시 일반 flex 자식으로 배치한다.
- **`snapPoints` 변경 시**: `_layout.tsx`의 `OVERLAY_HEIGHT = screenHeight * 0.3` 값도 함께 조정 필요. 오버레이가 시트 하단 노출 영역을 충분히 덮어야 탭바가 비치지 않는다.
- **`BottomSheetScrollView` / `BottomSheetTextInput`**: gorhom 전용 래퍼 컴포넌트. 일반 `ScrollView` / `TextInput`으로 교체하면 시트 내부 제스처·포커스가 깨진다.
