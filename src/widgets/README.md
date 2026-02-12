# widgets 레이어 가이드

`widgets` 레이어는 페이지를 구성하는 **큰 UI 블록(섹션/패널/리스트 + 헤더 등)** 을 담당합니다.

## 여기에 두는 것

- 여러 `features`/`entities`/`shared/ui`를 조합한 화면 단위 블록
- 예: 냉장고 아이템 리스트 섹션, 필터+리스트 복합 영역, 요약 카드 영역

## 두지 않는 것

- 단일 기능(→ `features`)
- 범용 컴포넌트(→ `shared/ui`)

## 예시 구조

- `src/widgets/fridge-items-list/ui/FridgeItemsList.tsx`
- `src/widgets/fridge-items-list/model/...` (필요 시)

