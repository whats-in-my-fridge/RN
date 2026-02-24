// src/shared/config/tokens.ts
//
// Design Token System – 3-Layer Architecture
//
// Layer 1 (Primitive): Raw named values from Figma. No semantic meaning.
//   Source: token-primitives.js (shared with tailwind.config.js)
//   Rule:   Never reference directly in components.
//
// Layer 2 (Semantic): Meaningful aliases mapped to primitives.
//   Rule:   Use in component styles. Answers "what is this for?"
//
// Layer 3 (Component): Composition tokens bundling semantic values.
//   Rule:   Use as style presets in shared/ui components.
//
// Naming convention (avoids double utility prefix in Tailwind):
//   surface-*  →  bg-surface-card       (backgrounds)
//   content-*  →  text-content-primary  (text, avoids text-text-*)
//   stroke-*   →  border-stroke-default (borders, avoids border-border-*)
//   status-*   →  bg-status-fresh       (state colors)

// token-primitives.js 으로부터 색상, 반경, 스페이싱 토큰을 가져옵니다.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { primitiveColors, primitiveRadius, primitiveSpacing } = require("./token-primitives.js") as {
  primitiveColors: Record<string, string>;
  primitiveRadius: Record<string, number>;
  primitiveSpacing: Record<string, number>;
};

// ─────────────────────────────────────────────────────────────────────────────
// Layer 2: Semantic Colors
// ─────────────────────────────────────────────────────────────────────────────

export const semanticColors = {
  // ── Brand ────────────────────────────────────────────────────────────────
  primary: primitiveColors["warm-gray-600"], //#605856!
  secondary: primitiveColors["warm-gray-500"],

  // ── Surfaces ─────────────────────────────────────────────────────────────
  "surface-app": primitiveColors["neutral-cream"],
  "surface-card": primitiveColors["neutral-white"],
  "surface-section": primitiveColors["neutral-50"],

  // ── Text (content-* prefix avoids text-text-* double prefix) ─────────────
  "content-primary": primitiveColors["ink-900"],
  "content-secondary": primitiveColors["warm-gray-500"],
  "content-dark": primitiveColors["ink-700"],

  // ── Borders (stroke-* prefix avoids border-border-* double prefix) ────────
  "stroke-default": primitiveColors["warm-gray-100"],
  "stroke-light": primitiveColors["warm-gray-50"],

  // ── Status: Fresh / Green ─────────────────────────────────────────────────
  "status-fresh": primitiveColors["green-600"],
  "status-fresh-light": primitiveColors["green-500"],
  "status-fresh-bg": primitiveColors["green-100"],
  "status-fresh-border": primitiveColors["green-200"],

  // ── Status: Expiring / Red ────────────────────────────────────────────────
  "status-expiring": primitiveColors["red-500"],
  "status-expiring-bg": primitiveColors["red-100"],
  "status-expiring-border": primitiveColors["red-200"],

  // ── Status: Soon / Orange ─────────────────────────────────────────────────
  "status-soon": primitiveColors["orange-500"],
  "status-soon-bg": primitiveColors["orange-100"],
  "status-soon-border": primitiveColors["orange-200"],

  // ── Status: Warn / Amber ──────────────────────────────────────────────────
  "status-warn": primitiveColors["amber-500"],
  "status-warn-bg": primitiveColors["amber-100"],
  "status-warn-border": primitiveColors["amber-200"],

  // ── Tag ───────────────────────────────────────────────────────────────────
  "tag-bg": primitiveColors["green-tag-bg"],
  "tag-text": primitiveColors["green-tag-text"],
  "tag-border": primitiveColors["green-tag-border"],

  // ── UI Affordances ────────────────────────────────────────────────────────
  "heart-active": primitiveColors["red-500"],
  "heart-inactive": primitiveColors["warm-gray-300"],
  "tab-inactive": primitiveColors["warm-gray-250"],

  // ── Essentials ────────────────────────────────────────────────────────────
  white: primitiveColors["neutral-white"],
  black: "#000000",
  transparent: "transparent",
} as const;

export type SemanticColorKey = keyof typeof semanticColors;

// ─────────────────────────────────────────────────────────────────────────────
// Layer 2: Semantic Radius
// ─────────────────────────────────────────────────────────────────────────────

export const semanticRadius = {
  sm: primitiveRadius["sm"],
  md: primitiveRadius["md"],
  lg: primitiveRadius["lg"],
  xl: primitiveRadius["xl"],
  "2xl": primitiveRadius["2xl"],
  full: primitiveRadius["full"],
} as const;

export type SemanticRadiusKey = keyof typeof semanticRadius;

// ─────────────────────────────────────────────────────────────────────────────
// Layer 2: Semantic Spacing
// 4px 그리드 기반. 모바일 레이아웃의 여백을 의미 단위로 명명합니다.
// ─────────────────────────────────────────────────────────────────────────────

export const semanticSpacing = {
  // ── 화면 레이아웃 ─────────────────────────────────────────────────────────
  screen: primitiveSpacing["4"],   // 16px — 화면 좌우 가장자리 여백 (px-screen)
  section: primitiveSpacing["6"],  // 24px — 섹션 간 상하 여백 (mt-section)

  // ── 컴포넌트 ──────────────────────────────────────────────────────────────
  card: primitiveSpacing["3"],     // 12px — 카드 내부 패딩 (p-card)
  item: primitiveSpacing["2"],     // 8px  — 리스트 아이템 간 간격 (gap-item)

  // ── 제네릭 스케일 ─────────────────────────────────────────────────────────
  xs: primitiveSpacing["1"],       // 4px
  sm: primitiveSpacing["2"],       // 8px
  md: primitiveSpacing["4"],       // 16px
  lg: primitiveSpacing["6"],       // 24px
  xl: primitiveSpacing["8"],       // 32px
} as const;

export type SemanticSpacingKey = keyof typeof semanticSpacing;

// ─────────────────────────────────────────────────────────────────────────────
// Layer 3: Component Tokens
// Compose semantic tokens into named component presets.
// Use these in shared/ui components for style object props (not className).
// ─────────────────────────────────────────────────────────────────────────────

// layer2의 시맨틱 토큰을 조합하여 만들어진 컴포넌트 토큰입니다.
export const componentTokens = {
  card: {
    bg: semanticColors["surface-card"],
    bgSection: semanticColors["surface-section"],
    radius: semanticRadius.lg, // 16px
    border: semanticColors["stroke-default"],
    borderLight: semanticColors["stroke-light"],
  },
  tag: {
    bg: semanticColors["tag-bg"],
    text: semanticColors["tag-text"],
    border: semanticColors["tag-border"],
    radius: semanticRadius.full,
  },
  input: {
    bg: semanticColors["surface-card"],
    border: semanticColors["stroke-default"],
    radius: semanticRadius.md, // 14px
    text: semanticColors["content-primary"],
  },
  button: {
    primary: {
      bg: semanticColors.primary,
      text: semanticColors.white,
      radius: semanticRadius.lg,
    },
    secondary: {
      bg: semanticColors["surface-section"],
      text: semanticColors["content-primary"],
      radius: semanticRadius.lg,
    },
  },
  statusBadge: {
    fresh: {
      bg: semanticColors["status-fresh-bg"],
      border: semanticColors["status-fresh-border"],
      text: semanticColors["status-fresh"],
    },
    expiring: {
      bg: semanticColors["status-expiring-bg"],
      border: semanticColors["status-expiring-border"],
      text: semanticColors["status-expiring"],
    },
    soon: {
      bg: semanticColors["status-soon-bg"],
      border: semanticColors["status-soon-border"],
      text: semanticColors["status-soon"],
    },
    warn: {
      bg: semanticColors["status-warn-bg"],
      border: semanticColors["status-warn-border"],
      text: semanticColors["status-warn"],
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Convenience export
// Use `tokens.color["surface-card"]` for style prop values in components
// that cannot use className (e.g. dynamic styles, third-party libraries).
// ─────────────────────────────────────────────────────────────────────────────

export const tokens = {
  color: semanticColors,
  radius: semanticRadius,
  spacing: semanticSpacing,
  component: componentTokens,
} as const;

export type Tokens = typeof tokens;
