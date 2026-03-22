// Kakao logo symbol component - official SVG
import Svg, { Path } from "react-native-svg";

/**
 * Kakao official logo symbol - chat bubble
 * Based on Kakao Developers brand guide
 * https://developers.kakao.com/docs/latest/ko/kakaologin/design-guide
 */
export function KakaoSymbol({ size = 20 }: { size?: number }) {
  return (
    <Svg viewBox="0 0 24 24" width={size} height={size}>
      {/* Kakao chat bubble symbol */}
      <Path
        d="M12 2C6.48 2 2 5.58 2 10c0 2.54 1.19 4.85 3.15 6.37C4.88 18.6 2.02 21 2 21s3.72-1.78 5.15-2.66C9.24 19.44 10.56 20 12 20c5.52 0 10-3.58 10-8s-4.48-10-10-10z"
        fill="#000000"
      />
    </Svg>
  );
}
