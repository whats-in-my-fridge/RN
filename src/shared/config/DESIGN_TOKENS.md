# Design Token System

`src/shared/config/` 아래에서 관리되는 3-레이어 디자인 토큰 시스템입니다.

---

## 파일 구조

| 파일 | 역할 |
|------|------|
| `token-primitives.js` | Layer 1 — Figma 원시 값 (색상, 반경, 타이포, 스페이싱) |
| `tokens.ts` | Layer 2/3 — 시맨틱 + 컴포넌트 토큰 |
| `theme.ts` | 하위 호환 shim (`Colors` 객체) |

---

## 3-레이어 구조

```
Layer 1: Primitive   →  raw hex / px 값 (token-primitives.js)
Layer 2: Semantic    →  "무엇에 쓰는 색인가?" 의미 부여 (tokens.ts)
Layer 3: Component   →  컴포넌트 단위 프리셋 묶음 (tokens.ts)
```

> **규칙**: 컴포넌트에서는 Primitive를 직접 참조하지 않습니다.

---

## Tailwind 클래스 사용법 (추천)

Semantic 토큰은 Tailwind 유틸리티 클래스로 바로 사용합니다.

```tsx
// 배경
<View className="bg-surface-app" />
<View className="bg-surface-card" />

// 텍스트 (text-text-* 중복 방지 → content-*)
<Text className="text-content-primary" />
<Text className="text-content-secondary" />

// 보더 (border-border-* 중복 방지 → stroke-*)
<View className="border border-stroke-default" />

// 상태 뱃지
<View className="bg-status-fresh-bg border border-status-fresh-border">
  <Text className="text-status-fresh">신선</Text>
</View>
```

### Tailwind 클래스 목록

| 카테고리 | 클래스 예시 |
|----------|------------|
| 배경 | `bg-surface-app`, `bg-surface-card`, `bg-surface-section` |
| 텍스트 | `text-content-primary`, `text-content-secondary`, `text-content-dark` |
| 보더 | `border-stroke-default`, `border-stroke-light` |
| 상태(fresh) | `bg-status-fresh-bg`, `text-status-fresh`, `border-status-fresh-border` |
| 상태(expiring) | `bg-status-expiring-bg`, `text-status-expiring`, `border-status-expiring-border` |
| 상태(soon) | `bg-status-soon-bg`, `text-status-soon`, `border-status-soon-border` |
| 상태(warn) | `bg-status-warn-bg`, `text-status-warn`, `border-status-warn-border` |
| 태그 | `bg-tag-bg`, `text-tag-text`, `border-tag-border` |

---

## `tokens` 객체 사용법 (style prop)

`className`을 쓸 수 없는 곳(동적 스타일, 서드파티 라이브러리 등)에서 사용합니다.

```tsx
import { tokens, componentTokens } from "@/shared/config/tokens";

// Semantic 색상
<View style={{ backgroundColor: tokens.color["surface-card"] }} />
<Text style={{ color: tokens.color["content-primary"] }} />

// Component 프리셋
<View style={{
  backgroundColor: componentTokens.card.bg,
  borderRadius: componentTokens.card.radius,
  borderColor: componentTokens.card.border,
}} />

// Status badge
const badge = componentTokens.statusBadge.fresh;
<View style={{ backgroundColor: badge.bg, borderColor: badge.border }}>
  <Text style={{ color: badge.text }}>D-3</Text>
</View>
```

---

## 스페이싱 (모바일 여백 토큰)

4px 그리드 기반. Tailwind 기본 숫자 스케일(`m-1`, `p-4` 등)을 유지하면서 의미 단위 이름을 추가합니다.

### Tailwind 클래스 사용법

```tsx
// 화면 레이아웃
<View className="px-screen" />       // 16px — 화면 좌우 가장자리 패딩
<View className="mt-section" />      // 24px — 섹션 간 상하 여백

// 컴포넌트
<View className="p-card" />          // 12px — 카드 내부 패딩
<FlatList className="gap-item" />    // 8px  — 리스트 아이템 간격

// 제네릭 스케일
<View className="p-xs" />            // 4px
<View className="p-sm" />            // 8px
<View className="p-md" />            // 16px
<View className="p-lg" />            // 24px
<View className="p-xl" />            // 32px
```

### 토큰 목록

| 토큰 | 값 | 용도 |
|------|----|------|
| `screen` | 16px | 화면 좌우 가장자리 (`px-screen`, `mx-screen`) |
| `section` | 24px | 섹션 간 상하 여백 (`mt-section`, `gap-section`) |
| `card` | 12px | 카드 내부 패딩 (`p-card`) |
| `item` | 8px | 리스트 아이템 간격 (`gap-item`) |
| `xs` | 4px | 미세 간격 |
| `sm` | 8px | 소형 간격 |
| `md` | 16px | 기본 간격 |
| `lg` | 24px | 대형 간격 |
| `xl` | 32px | 특대 간격 |

### `tokens.spacing` 사용법 (style prop)

```tsx
import { tokens } from "@/shared/config/tokens";

// className을 쓸 수 없는 경우
<View style={{ paddingHorizontal: tokens.spacing.screen }} />
<View style={{ marginTop: tokens.spacing.section }} />
<View style={{ gap: tokens.spacing.item }} />
```

---

## 타이포그래피 (Primitive 참조)

`token-primitives.js`의 `primitiveTypography`는 현재 Tailwind `fontSize` 테마에 등록되어 있습니다.

```tsx
<Text className="text-lg" />   // 15px, weight 600
<Text className="text-xl" />   // 16px, weight 700
<Text className="text-2xl" />  // 18px, weight 700
```

---

## 주의사항

- **Primitive 직접 참조 금지** — 컴포넌트에서 `token-primitives.js` import 하지 마세요.
- **CSS `var()` 사용 불가** — NativeWind 네이티브(iOS/Android)는 CSS 변수를 지원하지 않습니다. `tailwind.config.js`에 hex 값이 직접 등록되어 있습니다.
- `global.css`의 CSS 변수는 **웹 전용** 참조입니다.
