// Expo public env에서 API 베이스 URL을 읽는다. EXPO_PUBLIC_*는 빌드 시 번들에 주입된다.
// 프로덕션 URL은 레포에 하드코딩하지 않는다 — `.env` 또는 EAS Secrets의 EXPO_PUBLIC_API_URL만 사용한다.

/**
 * 백엔드 API 루트 URL (끝 슬래시 없음).
 * `EXPO_PUBLIC_API_URL` 미설정 시 에러 — 로컬은 `.env`, 배포는 EAS 환경 변수로 설정한다.
 */
export function getApiBaseUrl(): string {
  const raw = process.env.EXPO_PUBLIC_API_URL;
  if (raw?.trim()) {
    return raw.trim().replace(/\/$/, "");
  }
  throw new Error(
    "EXPO_PUBLIC_API_URL is not set. Copy .env.example to .env and set the API URL, or configure EAS env for release builds.",
  );
}
