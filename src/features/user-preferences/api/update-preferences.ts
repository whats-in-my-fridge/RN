// 사용자 선호도(알레르기, 기피 재료) 업데이트 API 함수
// PATCH /users/me/preferences — 현재 로그인한 사용자의 알레르기 및 기피 재료 목록을 수정한다.

import { apiRequest } from "@/shared/api";

export type UserPreferencesDTO = {
  allergies: string[];
  dislikedIngredients: string[];
};

type UpdateUserPreferencesRes = {
  message: string;
  result: UserPreferencesDTO;
};

export async function updateUserPreferences(body: UserPreferencesDTO): Promise<UserPreferencesDTO> {
  if (__DEV__) console.log("[PATCH /users/me/preferences] request", JSON.stringify(body, null, 2));
  const data = await apiRequest<UpdateUserPreferencesRes>("/users/me/preferences", {
    method: "PATCH",
    body,
  });
  if (__DEV__) console.log("[PATCH /users/me/preferences] response", JSON.stringify(data, null, 2));
  return data.result;
}
