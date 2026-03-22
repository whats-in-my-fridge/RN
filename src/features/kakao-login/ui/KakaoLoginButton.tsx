// KakaoLoginButton: 카카오 공식 로그인 버튼
// 카카오 공식 디자인 가이드라인 준수
// https://developers.kakao.com/docs/latest/ko/kakaologin/design-guide
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useAuthStore } from "../model/store";
import { useKakaoLogin } from "../model/use-kakao-login";
import { KakaoSymbol } from "./KakaoSymbol";

// ── 디자인 상수 (카카오 공식 가이드라인) ─────────────────────────────────────
const BUTTON_BORDER_RADIUS = 10;
const BUTTON_PADDING_VERTICAL = 16;
const BUTTON_PADDING_HORIZONTAL = 24;
const BUTTON_GAP = 10;
const BUTTON_PRESSED_OPACITY = 0.85;
const KAKAO_YELLOW = "#FEE500";
const KAKAO_BLACK = "#000000";
const BUTTON_FONT_SIZE = 16;
const BUTTON_LETTER_SPACING = -0.5;

export interface KakaoLoginButtonProps {
  onError?: (error: Error) => void;
}

export function KakaoLoginButton({ onError }: KakaoLoginButtonProps) {
  const { login } = useKakaoLogin();
  const isLoading = useAuthStore((state) => state.isLoading);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = useCallback(async () => {
    try {
      await login();
    } catch (error) {
      onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }, [login, onError]);

  const handlePressIn = useCallback(() => setIsPressed(true), []);
  const handlePressOut = useCallback(() => setIsPressed(false), []);

  const buttonOpacity = isPressed && !isLoading ? BUTTON_PRESSED_OPACITY : 1;

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isLoading}
    >
      <View
        style={{
          borderRadius: BUTTON_BORDER_RADIUS,
          backgroundColor: KAKAO_YELLOW,
          paddingVertical: BUTTON_PADDING_VERTICAL,
          paddingHorizontal: BUTTON_PADDING_HORIZONTAL,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: BUTTON_GAP,
          opacity: buttonOpacity,
        }}
      >
        {!isLoading && <KakaoSymbol />}
        {isLoading ? (
          <ActivityIndicator color={KAKAO_BLACK} size="small" />
        ) : (
          <Text
            style={{
              fontSize: BUTTON_FONT_SIZE,
              fontWeight: "800",
              color: KAKAO_BLACK,
              letterSpacing: BUTTON_LETTER_SPACING,
            }}
          >
            카카오 로그인
          </Text>
        )}
      </View>
    </Pressable>
  );
}
