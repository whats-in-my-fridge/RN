<div align="center">

<img src="src/shared/assets/icons/AppIcon.svg" width="120" alt="App Icon" />

# 🧊 What's in My Fridge?

**냉장고 속 재료를 스캔하고, 오늘 뭐 먹을지 고민 끝.**

[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactnative.dev)
[![Expo](https://img.shields.io/badge/Expo-SDK_54-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![NativeWind](https://img.shields.io/badge/NativeWind-TailwindCSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev)
[![CI](https://img.shields.io/github/actions/workflow/status/whats-in-my-fridge/RN/ci.yml?branch=main&style=flat-square&label=CI)](https://github.com/whats-in-my-fridge/RN/actions)

</div>

---

## 📖 소개

> *"냉장고 문을 열고 막막했던 경험, 다들 있죠?"*

**What's in My Fridge**는 냉장고 속 식재료를 스캔 한 번으로 등록하고,
보유 재료 기반으로 **오늘 만들 수 있는 레시피**를 추천해주는 크로스플랫폼 앱입니다.

- 📱 **iOS · Android · Web** 모두 지원
- 📸 카메라로 식재료를 스캔해 냉장고에 자동 등록
- 🍳 보유 재료 기반 레시피 추천
- 🗓️ 유통기한 관리로 음식물 낭비 방지

---

## ✨ 주요 기능

| 기능 | 설명 |
|------|------|
| 🔍 **재료 검색** | 직접 검색으로 냉장고에 재료 추가 |
| 📷 **카메라 스캔** | 카메라로 식재료를 인식해 빠르게 등록 |
| 🧊 **냉장고 관리** | 보유 재료 목록 확인 및 유통기한 추적 |
| 🍽️ **레시피 추천** | 보유 재료로 만들 수 있는 레시피 탐색 |
| ❤️ **레시피 즐겨찾기** | 마음에 드는 레시피 저장 |

---

## 🛠️ 기술 스택

### Core
- **[Expo SDK 54](https://expo.dev)** + **[Expo Router](https://expo.github.io/router)** — 파일 기반 라우팅
- **[React Native 0.81](https://reactnative.dev)** / **[React 19](https://react.dev)**
- **[TypeScript 5.9](https://www.typescriptlang.org)** (strict mode)

### 상태 관리
- **[Zustand](https://zustand-demo.pmnd.rs)** — 로컬 UI 상태
- **[TanStack Query](https://tanstack.com/query)** — 서버 데이터 패칭 · 캐싱

### 스타일링
- **[NativeWind](https://www.nativewind.dev)** — React Native에서 Tailwind CSS

### 코드 품질
- **[Biome](https://biomejs.dev)** — 포맷 · 린트 (`src/` 전용)
- **[ESLint](https://eslint.org)** (Expo config)
- **GitHub Actions** — CI 자동화

---

## 🏗️ 아키텍처

[Feature-Sliced Design (FSD)](https://feature-sliced.design) 아키텍처를 채택해
레이어 간 단방향 의존성을 엄격히 유지합니다.

```
src/
├── app/          # 라우팅, 전역 프로바이더 (Expo Router)
├── pages/        # 화면 단위 컴포넌트
├── widgets/      # 여러 feature를 조합한 대형 UI 블록
├── features/     # 사용자 액션 중심 기능 단위
├── entities/     # 도메인 모델 (Item, Recipe, ...)
└── shared/       # 공용 컴포넌트, 훅, 설정, 에셋
```

> **의존성 방향**: `app → pages → widgets → features → entities → shared`  
> 하위 레이어는 절대 상위 레이어를 import하지 않습니다.

---

## 🚀 시작하기

### 사전 요구사항
- Node.js 20+
- npm
- Expo Go 앱 (iOS / Android) 또는 시뮬레이터

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/whats-in-my-fridge/RN.git
cd RN

# 2. 의존성 설치
npm install

# 3. 개발 서버 시작
npm start          # QR 코드 → Expo Go로 실행
npm run ios        # iOS 시뮬레이터
npm run android    # Android 에뮬레이터
npm run web        # 웹 브라우저
```

### 코드 품질 검사

```bash
npm run typecheck     # TypeScript 타입 체크
npm run biome-check   # 포맷 · 린트 확인
npm run biome-fix     # 자동 수정
```

---

## ⚙️ CI/CD
