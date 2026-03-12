/**
 * src/shared/ui/icon-symbol.tsx
 *
 * Icon component that uses custom SVG icons (from src/shared/assets/icons/)
 * for tab bar and other UI elements, with fallback to Material Icons.
 *
 * Custom SVG icons are prioritized over Material Icons for consistent design.
 */

import { CameraIcon, FridgeIcon, HomeIcon, PersonIcon, SearchIcon } from "@/shared/assets/icons";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { ComponentProps } from "react";
import type { OpaqueColorValue, StyleProp, TextStyle } from "react-native";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];
type IoniconsName = ComponentProps<typeof Ionicons>["name"];
export type IconSymbolName =
  | "house.fill"
  | "square.stack.fill"
  | "camera.fill"
  | "magnifyingglass"
  | "person.fill"
  | "paperplane.fill"
  | "chevron.left.forwardslash.chevron.right"
  | "chevron.right"
  | "clock"
  | "person.2"
  | "heart"
  | "heart.fill"
  | "chevron.left"
  | "flame"
  | "bell"
  | "shield"
  | "settings"
  | "help"
  | "logout";

/**
 * Custom SVG icon components for tab bar and design consistency.
 * These take priority over Material Icons.
 */
const SVG_ICONS: Record<
  IconSymbolName,
  React.ComponentType<{ size?: number; color?: string }> | null
> = {
  "house.fill": HomeIcon,
  "square.stack.fill": FridgeIcon,
  "camera.fill": CameraIcon,
  magnifyingglass: SearchIcon,
  "person.fill": PersonIcon,
  // Material Icons fallback
  "paperplane.fill": null,
  "chevron.left.forwardslash.chevron.right": null,
  "chevron.right": null,
  clock: null,
  "person.2": null,
  heart: null,
  "heart.fill": null,
  "chevron.left": null,
  flame: null,
  bell: null,
  shield: null,
  settings: null,
  help: null,
  logout: null,
};

/**
 * Fallback Material Icons mapping for icons without custom SVG.
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MATERIAL_ICONS_MAPPING: Record<IconSymbolName, MaterialIconName> = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  clock: "schedule",
  "person.2": "groups",
  heart: "favorite-border",
  "heart.fill": "favorite",
  "chevron.left": "chevron-left",
  "square.stack.fill": "storage",
  "camera.fill": "photo-camera",
  magnifyingglass: "search",
  "person.fill": "account-circle",
  flame: "whatshot",
  bell: "notifications",
  shield: "shield",
  settings: "settings",
  help: "help-outline",
  logout: "logout",
};

/** 설정용 아이콘 - Ionicons 사용 (ChatSheetHeader에서 검증됨) */
const IONICONS_MAPPING: Partial<Record<IconSymbolName, IoniconsName>> = {
  shield: "shield-outline",
  settings: "settings-outline",
  help: "help-circle-outline",
  logout: "log-out-outline",
};

/**
 * An icon component that prioritizes custom SVG icons from src/shared/assets/icons/
 * and falls back to Material Icons for others.
 *
 * This ensures consistent design for critical tab bar icons while maintaining
 * flexibility for other UI icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  _weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  _weight?: string;
}) {
  // Try custom SVG icon first
  const SvgIcon = SVG_ICONS[name];
  if (SvgIcon) {
    return <SvgIcon size={size} color={typeof color === "string" ? color : color.toString()} />;
  }

  // Fallback: Ionicons (설정용 - shield, settings, help, logout)
  const ioniconsName = IONICONS_MAPPING[name];
  if (ioniconsName) {
    return <Ionicons color={color} size={size} name={ioniconsName} style={style} />;
  }

  // Fallback: Material Icons
  const materialIconName = MATERIAL_ICONS_MAPPING[name];
  if (materialIconName) {
    return <MaterialIcons color={color} size={size} name={materialIconName} style={style} />;
  }

  // Icon not found
  return null;
}
