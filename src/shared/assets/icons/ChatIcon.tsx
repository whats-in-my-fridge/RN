/**
 * src/shared/assets/icons/ChatIcon.tsx
 *
 * Chat/Speech bubble icon component for the global chat entry point.
 */

import { Path, Svg } from "react-native-svg";
import { semanticColors } from "@/shared/config/tokens";

interface ChatIconProps {
  size?: number;
  color?: string;
}

export function ChatIcon({ size = 20, color = semanticColors.white }: ChatIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M6.58335 16.6666C8.17384 17.4825 10.0034 17.7035 11.7424 17.2898C13.4814 16.876 15.0155 15.8548 16.0681 14.4101C17.1208 12.9654 17.6229 11.1922 17.4838 9.41009C17.3448 7.62797 16.5738 5.9541 15.3099 4.69012C14.0459 3.42614 12.372 2.65517 10.5899 2.51614C8.80776 2.37711 7.03458 2.87916 5.58987 3.93183C4.14516 4.9845 3.12393 6.51855 2.71021 8.25755C2.29648 9.99655 2.51747 11.8261 3.33335 13.4166L1.66669 18.3333L6.58335 16.6666Z"
        stroke={color}
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
