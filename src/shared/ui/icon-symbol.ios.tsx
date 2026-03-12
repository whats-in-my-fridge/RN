import { SymbolView, type SymbolWeight } from "expo-symbols";
import type { StyleProp, ViewStyle } from "react-native";

/** IconSymbolName → SF Symbol (iOS). help, settings, logout 등은 SF Symbol 이름이 달라 매핑 필요 */
const ICON_TO_SF_SYMBOL: Record<string, string> = {
  help: "questionmark.circle",
  settings: "gearshape",
  logout: "rectangle.portrait.and.arrow.right",
  shield: "shield",
};

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  name: string;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const sfName = ICON_TO_SF_SYMBOL[name] ?? name;

  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={sfName}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
}
