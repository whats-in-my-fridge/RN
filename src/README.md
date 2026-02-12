# src 폴더 구조 (FSD)

이 프로젝트는 **FSD(Feature-Sliced Design)** 기반으로 `src/` 하위에 앱 코드를 배치합니다.

## 레이어

- `src/app`: 앱 부트스트랩/라우팅/전역 프로바이더(Expo Router 포함)
- `src/pages`: 라우트 단위 페이지(스크린) 컴포지션
- `src/widgets`: 페이지를 구성하는 큰 UI 블록
- `src/features`: 사용자 가치 중심 기능(예: 냉장고 아이템 추가/검색)
- `src/entities`: 도메인 엔티티(예: Item, Fridge)와 관련 로직/모델
- `src/shared`: 공용 UI/유틸/설정/에셋

각 레이어의 상세 규칙은 해당 레이어의 `README.md`를 참고하세요.

