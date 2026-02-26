# app 레이어 가이드

`app` 레이어는 **애플리케이션 초기화/전역 설정/라우팅**을 담당합니다.
이 프로젝트에서는 **Expo Router 라우트가 `src/app` 아래에만** 존재합니다.

## 여기에 두는 것

- **Expo Router 라우트 파일**: `src/app/**` (예: `_layout.tsx`, `(tabs)/index.tsx`)
- **전역 Provider / Theme 연결**: Navigation ThemeProvider, 상태관리 Provider 등
- **앱 전역 설정**: 에러 바운더리, 폰트 로딩, 스플래시 제어(필요 시)

## 권장 규칙

- 라우트 파일에서는 최대한 **컴포지션(조립)** 만 하고, 로직은 `pages/widgets/features/entities`로 위임합니다.
- 경로 import는 `@/...`를 사용합니다. (`@`는 `src`를 가리킵니다)

