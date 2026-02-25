# BackButton

레시피 세부 화면 등 스택 네비게이션 화면에서 이전 화면으로 돌아갈 때 사용하는 공용 버튼 컴포넌트.

## 위치

```
src/shared/ui/back-button/
├── back-button.tsx   — 컴포넌트 본체
├── back-button.md    — 이 문서
└── index.ts          — 배럴 내보내기
```

## 디자인 스펙

| 속성        | 값                                    | 토큰                                           |
| ----------- | ------------------------------------- | ---------------------------------------------- |
| 크기        | 48 × 48 px                            | `primitiveSpacing["12"]` — 터치 타겟 최소 크기 |
| 모서리 반경 | 12 px                                 | `rounded-sm` (`primitiveRadius.sm`)            |
| 아이콘      | `<` 꺽새 (SF Symbols: `chevron.left`) | 크기 20 px                                     |

### 색상 변형

| variant        | 배경                       | 꺽새                  | 테두리                       |
| -------------- | -------------------------- | --------------------- | ---------------------------- |
| `light` (기본) | `#FFFFFF` (`surface-card`) | `#605856` (`primary`) | `#E8E5E3` (`stroke-default`) |
| `dark`         | `#605856` (`primary`)      | `#FFFFFF` (`white`)   | 없음                         |

## 사용법

```tsx
import { BackButton } from "@/shared/ui/back-button";

// 밝은 버튼
<BackButton onPress={() => router.back()} />

// 어두운 버튼튼
<BackButton variant="dark" onPress={() => router.back()} />
```

## Props

| Prop      | 타입                | 기본값    | 설명           |
| --------- | ------------------- | --------- | -------------- |
| `variant` | `"light" \| "dark"` | `"light"` | 버튼 색상 변형 |
| `onPress` | `() => void`        | —         | 버튼 탭 핸들러 |

## 플랫폼 동작

- **iOS**: `expo-symbols`의 SF Symbols (`chevron.left`) 를 사용해 네이티브 아이콘 렌더링
- **Android / Web**: `@expo/vector-icons`의 Material Icons (`chevron-left`) 로 폴백

아이콘 매핑은 [icon-symbol.tsx](../icon-symbol.tsx) 의 `MAPPING` 상수에서 관리.

## FSD 레이어

`shared/ui` — 어떤 레이어에서든 import 가능. 도메인 로직 없음.
