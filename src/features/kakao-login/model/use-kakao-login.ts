// Hook for Kakao login flow with state management

import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback } from "react";
import { AUTH_TOKEN_KEY } from "@/shared/config/auth-storage";
import { kakaoLogin, kakaoLogout } from "../api/kakao-auth";
import { useAuthStore } from "./store";

export function useKakaoLogin() {
  const router = useRouter();
  // 개별 액션을 구독해 불필요한 리렌더를 줄인다
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setLoading = useAuthStore((s) => s.setLoading);

  const login = useCallback(async () => {
    setLoading(true);
    try {
      const { user, token } = await kakaoLogin();

      // 토큰을 SecureStore에 저장 — API 인터셉터가 다음 요청부터 자동 첨부한다
      await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);

      // 인증 상태 갱신 (내부적으로 isLoading = false 처리)
      setAuth(user, token);

      // 홈으로 이동
      router.replace("/(protected)/(tabs)/home");
    } catch (error) {
      // 인증 상태 초기화 (내부적으로 isLoading = false 처리)
      clearAuth();
      throw error;
    }
    // NOTE: setAuth / clearAuth 가 모두 isLoading = false 를 처리하므로
    //       finally 블록에서 중복 호출하지 않는다.
  }, [router, setAuth, clearAuth, setLoading]);

  const logout = useCallback(async () => {
    try {
      await kakaoLogout();
      await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
      clearAuth();
      router.replace("/(auth)/login");
    } catch {
      // 로그아웃 실패는 무시 — 로컬 상태는 이미 정리된다
    }
  }, [router, clearAuth]);

  return { login, logout };
}
