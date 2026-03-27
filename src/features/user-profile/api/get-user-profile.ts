// 사용자 프로필 조회 API 함수
// GET /users/me — 현재 로그인한 사용자의 프로필 정보를 반환한다.

import type { UserProfile } from "@/entities/user";
import { apiGet } from "@/shared/api";

type UserProfileRes = {
  message: string;
  result: UserProfile;
};

export async function getUserProfile(): Promise<UserProfile> {
  if (__DEV__) console.log("[GET /users/me] request");
  const data = await apiGet<UserProfileRes>("/users/me");
  if (__DEV__) console.log("[GET /users/me] response", JSON.stringify(data, null, 2));
  return data.result;
}
