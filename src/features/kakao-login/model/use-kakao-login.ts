// Hook for Kakao login flow with state management

import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback } from "react";
import { kakaoLogin, kakaoLogout } from "../api/kakao-auth";
import { useAuthStore } from "./store";

export function useKakaoLogin() {
  const router = useRouter();
  const { setAuth, clearAuth, setLoading } = useAuthStore();

  const login = useCallback(async () => {
    setLoading(true);
    try {
      const { user, token } = await kakaoLogin();

      // Save token to secure storage
      await SecureStore.setItemAsync("auth_token", token);

      // Update auth store
      setAuth(user, token);

      // Navigate to home
      router.replace("/(protected)/(tabs)/home");
    } catch (error) {
      clearAuth();
      throw error;
    } finally {
      setLoading(false);
    }
  }, [router, setAuth, clearAuth, setLoading]);

  const logout = useCallback(async () => {
    try {
      await kakaoLogout();
      await SecureStore.deleteItemAsync("auth_token");
      clearAuth();
      router.replace("/(auth)/login");
    } catch {
      // Ignore logout errors
    }
  }, [router, clearAuth]);

  return { login, logout };
}
