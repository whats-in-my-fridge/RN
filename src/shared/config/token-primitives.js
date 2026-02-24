// src/shared/config/token-primitives.js
//
// Layer 1 – Primitive Design Tokens (raw values from Figma)
//
// This file is intentionally plain JavaScript (not TypeScript) so it can be
// required by tailwind.config.js (CommonJS) and imported by tokens.ts (ESM/TS).
// It is the SINGLE SOURCE OF TRUTH for all raw design values.
// Do NOT add semantic meaning or business logic here. Only raw named values.

/** @type {Record<string, string>} */
const primitiveColors = {
  // ── Warm Gray family ──────────────────────────────────────────────────────
  "warm-gray-600": "#605856", // Primary brand color
  "warm-gray-500": "#968D8A", // Secondary / muted
  "warm-gray-300": "#C8C0BC", // Heart inactive
  "warm-gray-250": "#C0B8B5", // Tab inactive
  "warm-gray-100": "#E8E5E3", // Border default
  "warm-gray-50": "#F0EBE9", // Border light

  // ── Neutral surface family ────────────────────────────────────────────────
  "neutral-white": "#FFFFFF",
  "neutral-cream": "#FDFBF8", // App background
  "neutral-50": "#F3F1EF", // Section background

  // ── Ink (text) family ─────────────────────────────────────────────────────
  "ink-900": "#2C2C2C", // Main text
  "ink-700": "#3D3432", // Dark text

  // ── Green family ──────────────────────────────────────────────────────────
  "green-600": "#4A9B6F",
  "green-500": "#3DA05C",
  "green-100": "#EDF7F2",
  "green-200": "#B8DEC8",
  "green-tag-bg": "#EBF0ED",
  "green-tag-text": "#5B7A63",
  "green-tag-border": "#C5D9C8",

  // ── Red family ────────────────────────────────────────────────────────────
  "red-500": "#E05C5C",
  "red-100": "#FDF3F3",
  "red-200": "#EDD0D0",

  // ── Orange family ─────────────────────────────────────────────────────────
  "orange-500": "#E07048",
  "orange-100": "#FEF0EC",
  "orange-200": "#F8D5C8",

  // ── Amber / Warning family ────────────────────────────────────────────────
  "amber-500": "#C68642",
  "amber-100": "#FDF8F0",
  "amber-200": "#EDD9BC",
};

/** @type {Record<string, number>} */
const primitiveRadius = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  "2xl": 20,
  full: 9999,
};

/**
 * @type {Record<string, { size: number; weight: string; lineHeight: number }>}
 * weight: string (React Native requires string fontWeight, e.g. "400" not 400)
 * lineHeight: px (~1.4× size)
 */
const primitiveTypography = {
  "2xs": { size: 10, weight: "400", lineHeight: 14 },
  xs: { size: 11, weight: "500", lineHeight: 16 },
  sm: { size: 12, weight: "400", lineHeight: 17 },
  base: { size: 13, weight: "500", lineHeight: 18 },
  md: { size: 14, weight: "600", lineHeight: 20 },
  lg: { size: 15, weight: "600", lineHeight: 22 },
  xl: { size: 16, weight: "700", lineHeight: 22 },
  "2xl": { size: 18, weight: "700", lineHeight: 24 },
  "3xl": { size: 20, weight: "700", lineHeight: 28 },
  "4xl": { size: 22, weight: "700", lineHeight: 30 },
  "5xl": { size: 26, weight: "800", lineHeight: 34 },
};

/**
 * 4px 그리드 기반 스페이싱 프리미티브 (단위: px)
 * @type {Record<string, number>}
 */
const primitiveSpacing = {
  0: 0,
  1: 4, // 4px
  2: 8, // 8px
  3: 12, // 12px
  4: 16, // 16px — 모바일 기본 여백
  5: 20, // 20px
  6: 24, // 24px
  8: 32, // 32px
  10: 40, // 40px
  12: 48, // 48px — 터치 타겟 최소 크기
};

module.exports = {
  primitiveColors,
  primitiveRadius,
  primitiveTypography,
  primitiveSpacing,
};
