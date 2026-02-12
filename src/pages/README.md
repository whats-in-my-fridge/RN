# pages 레이어 가이드

`pages` 레이어는 **라우트 단위 화면(페이지)** 를 담당합니다.
보통 “한 화면에서 필요한 위젯/기능들을 조립”하는 역할만 하고, 세부 구현은 아래 레이어로 내려갑니다.

## 여기에 두는 것

- 라우트(스크린) 단위 컴포넌트 (예: `pages/home`, `pages/item-detail`)
- 화면 단위 레이아웃/컴포지션
- 화면 전용 wiring (여러 위젯/feature 조합)

## 두지 않는 것

- 라우트 파일 자체(→ `src/app`)
- 범용 UI(→ `shared/ui`)
- 도메인 모델(→ `entities`)

## 예시 구조

- `src/pages/home/ui/HomePage.tsx`
- `src/pages/home/index.ts`

