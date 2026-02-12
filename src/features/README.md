# features 레이어 가이드

`features` 레이어는 **사용자 가치 중심의 기능 단위**를 담당합니다.
예를 들면 “냉장고 아이템 추가”, “아이템 삭제”, “유통기한 필터” 같은 것들이 feature입니다.

## 여기에 두는 것

- 기능 단위 UI/상태/이벤트 처리
- `entities`를 사용해 데이터를 읽고/수정하는 로직 (예: usecase, service 호출)
- 화면에서 재사용 가능한 기능 블록

## 예시 구조(권장)

- `src/features/add-item/ui/AddItemButton.tsx`
- `src/features/add-item/model/useAddItem.ts`
- `src/features/add-item/api/addItem.ts` (필요 시)
- `src/features/add-item/index.ts`

## 규칙

- `features`는 보통 1개 엔티티에 한정되지 않을 수 있지만, 도메인 모델 정의는 `entities`로 내립니다.

