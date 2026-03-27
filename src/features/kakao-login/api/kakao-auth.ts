// Kakao OAuth flow - handles login via Kakao native SDK
import { login, logout } from "@react-native-seoul/kakao-login";
import type { User } from "@/entities/user";
import { ApiError, apiPost } from "@/shared/api";

export interface KakaoLoginResponse {
  user: User;
  token: string;
}

/** 카카오 SDK 또는 백엔드 교환 실패 시 사용자에게 표시할 메시지를 결정한다. */
function resolveLoginErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401) return "카카오 인증에 실패했습니다. 다시 시도해 주세요.";
    if (error.status >= 500) return "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
    return error.message;
  }
  if (error instanceof Error) return error.message;
  return "로그인 중 알 수 없는 오류가 발생했습니다.";
}

/**
 * Initiates Kakao login flow and exchanges token with backend for JWT
 * 1. Calls native Kakao SDK login
 * 2. Sends accessToken to backend for JWT exchange
 * @returns User data and JWT token
 * @throws Error with user-facing message
 */
export async function kakaoLogin(): Promise<KakaoLoginResponse> {
  try {
    // 1. Native Kakao login
    const result = await login();

    if (!result.accessToken) {
      throw new Error("Failed to get Kakao access token");
    }

    // 2. Exchange with backend
    const data = await apiPost<KakaoLoginResponse>(
      "/auth/login/kakao",
      {
        accessToken: result.accessToken,
      },
    );

    return data;
  } catch (error) {
    // 카카오 세션 정리 후 사용자 친화적인 에러로 재throw
    await logout().catch(() => {});
    throw new Error(resolveLoginErrorMessage(error));
  }
}

/**
 * Logout - clears local token and Kakao session
 */
export async function kakaoLogout(): Promise<void> {
  try {
    await logout();
  } catch {
    // Ignore logout errors — local state is cleared regardless
  }
}
