// Hook to restore auth token from secure storage on app startup
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { AUTH_TOKEN_KEY } from "@/shared/config/auth-storage";
import { useAuthStore } from "./store";

/**
 * Restores authentication token from SecureStore on app startup.
 * Initializes auth state based on stored token.
 * Manages loading state during token restoration.
 */
export function useRestoreAuthToken() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    const restoreToken = async () => {
      setLoading(true);
      try {
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        if (token) {
          // TODO: Call backend /auth/me to get user info and validate token
          // For now, we'll just set a placeholder user - backend should return actual user data
          setAuth({ id: "", nickname: "", profileImage: "" }, token);
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("[useRestoreAuthToken] Failed to restore token:", error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    restoreToken();
  }, [setAuth, clearAuth, setLoading]);
}
