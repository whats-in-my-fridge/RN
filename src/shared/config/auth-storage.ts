// SecureStore 키 상수 — API 요청 인터셉터와 로그인 플로우가 동일한 키를 쓴다.

/** 로그인 후 저장되는 JWT (Bearer) — `expo-secure-store` 키 */
export const AUTH_TOKEN_KEY = "auth_token" as const;
