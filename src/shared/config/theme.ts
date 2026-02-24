// src/shared/config/theme.ts
//
// Theme configuration bridging the new design token system with existing
// React Navigation / Expo hooks (useThemeColor, useColorScheme).
//
// The Colors export is a backward-compatibility shim that maps the old
// boilerplate keys (text, background, tint, icon, tabIconDefault, tabIconSelected)
// to values from semanticColors in tokens.ts.
//
// New code should import semanticColors or tokens directly:
//   import { semanticColors } from '@/shared/config/tokens';
//   import { tokens } from '@/shared/config/tokens';
//
// TODO: Dark mode semantic tokens will be added in a future sprint.
//   For now, the dark object keeps the Expo boilerplate values.

import { Platform } from "react-native";
import { semanticColors } from "./tokens";

// Backward-compatible Colors map. Keys match what useThemeColor expects.
export const Colors = {
  light: {
    text: semanticColors["content-primary"],
    background: semanticColors["surface-app"],
    tint: semanticColors.primary,
    icon: semanticColors["content-secondary"],
    tabIconDefault: semanticColors["tab-inactive"],
    tabIconSelected: semanticColors.primary,
  },
  // Dark mode: placeholder values until dark semantic tokens are designed.
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#fff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fff",
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
