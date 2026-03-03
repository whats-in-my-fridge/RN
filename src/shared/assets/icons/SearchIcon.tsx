/**
 * src/shared/assets/icons/SearchIcon.tsx
 *
 * Search/Magnifying glass icon component
 */

import { Path, Svg } from "react-native-svg";
import { semanticColors } from "@/shared/config/tokens";

interface SearchIconProps {
  size?: number;
  color?: string;
}

export function SearchIcon({ size = 22, color = semanticColors["content-secondary"] }: SearchIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <Path
        d="M10.0833 17.4167C14.1334 17.4167 17.4167 14.1334 17.4167 10.0833C17.4167 6.03325 14.1334 2.75 10.0833 2.75C6.03325 2.75 2.75 6.03325 2.75 10.0833C2.75 14.1334 6.03325 17.4167 10.0833 17.4167Z"
        stroke={color}
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.25 19.25L15.3083 15.3083"
        stroke={color}
        strokeWidth="1.83333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
