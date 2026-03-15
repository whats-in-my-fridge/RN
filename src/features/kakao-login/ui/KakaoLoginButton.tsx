// KakaoLoginButton: 카카오 공식 로그인 버튼
// 카카오 공식 디자인 가이드라인 준수
// https://developers.kakao.com/docs/latest/ko/kakaologin/design-guide
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useAuthStore } from "../model/store";
import { useKakaoLogin } from "../model/use-kakao-login";

interface KakaoLoginButtonProps {
  onError?: (error: Error) => void;
}

/**
 * 카카오 공식 심볼 - 채팅 버블
 */
function KakaoSymbol() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M12 2C6.48 2 2 5.58 2 10c0 2.54 1.19 4.85 3.15 6.37C4.88 18.6 2.02 21 2 21s3.72-1.78 5.15-2.66C9.24 19.44 10.56 20 12 20c5.52 0 10-3.58 10-8s-4.48-10-10-10z"
        fill="#000000"
      />
    </Svg>
  );
}

export function KakaoLoginButton({ onError }: KakaoLoginButtonProps) {
  const { login } = useKakaoLogin();
  const isLoading = useAuthStore((state) => state.isLoading);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = async () => {
    try {
      await login();
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      disabled={isLoading}
    >
      <View
        style={{
          borderRadius: 10,
          backgroundColor: "#FEE500",
          paddingVertical: 16,
          paddingHorizontal: 24,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          opacity: isPressed && !isLoading ? 0.85 : 1,
        }}
      >
        {!isLoading && <KakaoSymbol />}
        {isLoading ? (
          <ActivityIndicator color="#000000" size="small" />
        ) : (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "800",
              color: "#000000",
              letterSpacing: -0.5,
            }}
          >
            카카오 로그인
          </Text>
        )}
      </View>
    </Pressable>
  );
}
