// 사용자 프로필 조회를 위한 React Query 훅

import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../api/get-user-profile";

export const USER_PROFILE_QUERY_KEY = ["user", "profile"] as const;

/** 현재 로그인한 사용자의 프로필 정보를 조회한다. */
export function useUserProfile() {
  return useQuery({
    queryKey: USER_PROFILE_QUERY_KEY,
    queryFn: getUserProfile,
  });
}
