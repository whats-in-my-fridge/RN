# entities 레이어 가이드

`entities` 레이어는 **도메인 엔티티**(비즈니스 개념)와 그에 대한 모델/규칙을 담습니다.
예: `Item`, `Fridge`, `Category` 등.

## 여기에 두는 것

- 엔티티 타입/모델(예: `Item`, `FridgeItem`)
- 엔티티 관련 UI(예: `ItemCard`처럼 “엔티티 표현”에 가까운 컴포넌트)
- 엔티티 단위 상태/셀렉터/검증 로직

## 예시 구조(권장)

- `src/entities/item/model/types.ts`
- `src/entities/item/model/validators.ts`
- `src/entities/item/ui/ItemCard.tsx`
- `src/entities/item/index.ts`

## 규칙

- “특정 사용자 액션”에 종속되는 로직은 `features`로 올립니다.
- 범용 유틸/디자인 시스템은 `shared`로 내립니다.

