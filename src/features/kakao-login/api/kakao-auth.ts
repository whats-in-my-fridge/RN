// Kakao OAuth flow - handles login via Kakao native SDK
import { login, logout } from "@react-native-seoul/kakao-login";
import type { User } from "@/entities/user";

const API_BASE = process.env.EXPO_PUBLIC_API_URL || "http://13.209.189.41:8080";

export interface KakaoLoginResponse {
  user: User;
  token: string;
}

/**
 * Initiates Kakao login flow and exchanges token with backend for JWT
 * 1. Calls native Kakao SDK login
 * 2. Gets user profile from Kakao
 * 3. Sends accessToken to backend for JWT exchange
 * @returns User data and JWT token
 */
export async function kakaoLogin(): Promise<KakaoLoginResponse> {
  try {
    // 1. Native Kakao login
    const result = await login();

    if (!result.accessToken) {
      throw new Error("Failed to get Kakao access token");
    }

    // 2. Exchange with backend
    const endpoint = `${API_BASE}/auth/login/kakao`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessToken: result.accessToken }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unable to parse error body");
      throw new Error(`Backend auth failed: ${response.statusText} - ${errorText}`);
    }

    const data: KakaoLoginResponse = await response.json();
    return data;
  } catch (error) {
    await logout().catch(() => {});
    throw error;
  }
}

/**
 * Logout - clears local token and Kakao session
 */
export async function kakaoLogout(): Promise<void> {
  try {
    await logout();
  } catch {
    // Ignore logout errors
  }
}
