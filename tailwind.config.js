// tailwind.config.js
//
// Tailwind CSS v3 configuration for NativeWind v4.
//
// Design tokens are sourced from src/shared/config/token-primitives.js.
// The token-primitives.js file is CommonJS (.js) so it can be required here
// and also imported by TypeScript (tokens.ts) without duplication.
//
// KEY ARCHITECTURAL DECISIONS:
//   theme.colors      → full replace (removes Tailwind defaults; semantic names only)
//   theme.borderRadius → full replace (removes Tailwind defaults; Figma scale + component aliases)
//   theme.fontSize    → full replace (removes Tailwind defaults; Figma typography scale)
//
// NOTE: Tailwind v4's @theme inline is NOT used here because the project
//   uses Tailwind v3. CSS variables are defined in global.css (:root) for
//   web-only usage. Native (iOS/Android) relies on static hex values here.

const {
  primitiveColors,
  primitiveRadius,
  primitiveTypography,
  primitiveSpacing,
} = require("./src/shared/config/token-primitives.js");

const c = primitiveColors;
const r = primitiveRadius;
const p = primitiveTypography;
const m = primitiveSpacing;

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    // ── Font Family ──────────────────────────────────────────────────────────
    fontFamily: {
      sans: ["Pretendard", "system-ui", "sans-serif"],
    },

    // ── Colors (full replace) ───────────────────────────────────────────────
    // Naming follows the pattern: {namespace}-{variant}
    //   surface-*  →  bg-surface-card, bg-surface-section
    //   content-*  →  text-content-primary   (avoids text-text-* double prefix)
    //   stroke-*   →  border-stroke-default  (avoids border-border-* double prefix)
    //   status-*   →  bg-status-fresh, text-status-expiring
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: c["neutral-white"],
      black: "#000000",

      // Brand
      primary: c["warm-gray-600"],
      secondary: c["warm-gray-500"],

      // Surfaces (backgrounds)
      surface: {
        app: c["neutral-cream"],
        card: c["neutral-white"],
        section: c["neutral-50"],
      },

      // Content (text colors)
      content: {
        primary: c["ink-900"],
        secondary: c["warm-gray-500"],
        dark: c["ink-700"],
      },

      // Stroke (border colors)
      stroke: {
        default: c["warm-gray-100"],
        light: c["warm-gray-50"],
      },

      // Status colors
      status: {
        fresh: c["green-600"],
        "fresh-light": c["green-500"],
        "fresh-bg": c["green-100"],
        "fresh-border": c["green-200"],

        expiring: c["red-500"],
        "expiring-bg": c["red-100"],
        "expiring-border": c["red-200"],

        soon: c["orange-500"],
        "soon-bg": c["orange-100"],
        "soon-border": c["orange-200"],

        warn: c["amber-500"],
        "warn-bg": c["amber-100"],
        "warn-border": c["amber-200"],
      },

      // Tag
      tag: {
        bg: c["green-tag-bg"],
        text: c["green-tag-text"],
        border: c["green-tag-border"],
      },

      // UI affordances
      heart: {
        active: c["red-500"],
        inactive: c["warm-gray-300"],
      },
      tab: {
        inactive: c["warm-gray-250"],
      },
    },

    // ── Border Radius (full replace) ─────────────────────────────────────────
    // Primitive scale: rounded-sm (12px) ~ rounded-full (9999px)
    // Component aliases: rounded-card, rounded-tag, rounded-badge, etc.
    // Both sets are available; component aliases are self-documenting.
    borderRadius: {
      none: "0px",
      // Primitive scale
      sm: `${r.sm}px`,
      md: `${r.md}px`,
      lg: `${r.lg}px`,
      xl: `${r.xl}px`,
      "2xl": `${r["2xl"]}px`,
      full: `${r.full}px`,
      // Layer 3: Component semantic aliases
      badge: `${r.sm}px`, // 12px – icon badges, list icons
      input: `${r.md}px`, // 14px – inputs, small buttons
      card: `${r.lg}px`, // 16px – cards, buttons
      button: `${r.lg}px`, // 16px – general buttons
      list: `${r.xl}px`, // 18px – list groups (mypage)
      hero: `${r["2xl"]}px`, // 20px – hero cards, profile cards
      tag: `${r.full}px`, // 9999px – tags, pill buttons
    },

    // ── Font Size (full replace) ──────────────────────────────────────────────
    // Format: [fontSize, { lineHeight, fontWeight }]
    // fontWeight MUST be a string for React Native (NativeWind requirement).
    // lineHeight is ~1.4× fontSize for comfortable reading.
    fontSize: {
      "2xs": [
        `${p["2xs"].size}px`,
        { lineHeight: `${p["2xs"].lineHeight}px`, fontWeight: p["2xs"].weight },
      ],
      xs: [
        `${p.xs.size}px`,
        { lineHeight: `${p.xs.lineHeight}px`, fontWeight: p.xs.weight },
      ],
      sm: [
        `${p.sm.size}px`,
        { lineHeight: `${p.sm.lineHeight}px`, fontWeight: p.sm.weight },
      ],
      base: [
        `${p.base.size}px`,
        { lineHeight: `${p.base.lineHeight}px`, fontWeight: p.base.weight },
      ],
      md: [
        `${p.md.size}px`,
        { lineHeight: `${p.md.lineHeight}px`, fontWeight: p.md.weight },
      ],
      lg: [
        `${p.lg.size}px`,
        { lineHeight: `${p.lg.lineHeight}px`, fontWeight: p.lg.weight },
      ],
      xl: [
        `${p.xl.size}px`,
        { lineHeight: `${p.xl.lineHeight}px`, fontWeight: p.xl.weight },
      ],
      "2xl": [
        `${p["2xl"].size}px`,
        { lineHeight: `${p["2xl"].lineHeight}px`, fontWeight: p["2xl"].weight },
      ],
      "3xl": [
        `${p["3xl"].size}px`,
        { lineHeight: `${p["3xl"].lineHeight}px`, fontWeight: p["3xl"].weight },
      ],
      "4xl": [
        `${p["4xl"].size}px`,
        { lineHeight: `${p["4xl"].lineHeight}px`, fontWeight: p["4xl"].weight },
      ],
      "5xl": [
        `${p["5xl"].size}px`,
        { lineHeight: `${p["5xl"].lineHeight}px`, fontWeight: p["5xl"].weight },
      ],
    },

    extend: {
      // ── Semantic Spacing (모바일 여백 토큰) ──────────────────────────────
      // 사용 예: px-screen, mt-section, p-card, gap-item
      spacing: {
        // 화면 레이아웃
        screen: `${m["4"]}px`, // 16px — 화면 좌우 가장자리 (px-screen)
        section: `${m["6"]}px`, // 24px — 섹션 간 상하 여백 (mt-section)
        // 컴포넌트
        card: `${m["3"]}px`, // 12px — 카드 내부 패딩 (p-card)
        item: `${m["2"]}px`, // 8px  — 리스트 아이템 간격 (gap-item)
        // 제네릭 스케일
        xs: `${m["1"]}px`, // 4px
        sm: `${m["2"]}px`, // 8px
        md: `${m["4"]}px`, // 16px
        lg: `${m["6"]}px`, // 24px
        xl: `${m["8"]}px`, // 32px
      },
    },
  },

  plugins: [],
};
