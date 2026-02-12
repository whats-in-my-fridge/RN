# whats_in_my_fridge — 프로젝트 스펙 / 기술 스택

팀원 간 “무엇을 쓰는 프로젝트인지” 빠르게 공유하기 위한 문서입니다.

## 런타임 / 개발환경

- **Node.js**: 20+ 권장
- **Package Manager**: npm (`package-lock.json` 사용)

## 앱/프레임워크

- **Expo SDK**: `~54.x`
- **React Native**: `0.81.x`
- **React**: `19.x`
- **라우팅**: **Expo Router**
  - 라우트 폴더: **`src/app/**`**

## 상태관리 / 서버 상태

- **Zustand**: 클라이언트 상태(로컬 UI 상태, 단순 전역 상태)
- **TanStack Query (@tanstack/react-query)**: 서버 상태(데이터 패칭/캐싱/리트라이)

## 스타일링

- **NativeWind**: React Native에서 `className` 기반 Tailwind 유틸 스타일 사용
- **TailwindCSS**: `tailwind.config.js`로 유틸 클래스 정의/스캔 경로 관리

## 품질 도구

- **TypeScript**: 타입 안정성
- **Biome**: 포맷/린트(현재 **`src/`만 검사**)
- **ESLint (Expo)**: Expo 권장 lint

## 아키텍처 / 폴더 구조

- **FSD(Feature-Sliced Design)**
  - 레이어: `src/{app,pages,widgets,features,entities,shared}`
  - 각 레이어 사용 가이드: 각 폴더의 `README.md` 참고

## 경로 별칭(Path alias)

- `@/*` → `src/*`
- `@assets/*` → `src/shared/assets/*`

## 주요 명령어

자세한 사용법은 `COMMANDS.md` 참고.

- 개발 실행: `npm run start`
- 타입체크: `npm run typecheck`
- Biome: `npm run biome-check` / `npm run biome-fix`
- Expo Doctor: `npx expo doctor`
- Export 체크(iOS/Android): `npx expo export --platform ios` / `--platform android`

## CI (GitHub Actions)

- PR/푸시 시 CI에서 아래를 자동 검증:
  - Biome(`src` only)
  - TypeScript typecheck
  - ESLint(Expo)
  - Expo Doctor
  - Expo export (iOS/Android)

