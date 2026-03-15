// src/app/(protected)/_layout.tsx
// 로그인 이후 접근 가능한 보호 라우트 그룹 레이아웃.
// (tabs) — 하단 탭 네비게이터
// scan   — OCR 촬영 (stack push)
// recipe/[recipeId] — 레시피 상세 (stack push)
// (modals) — 모달 화면 그룹

import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/features/kakao-login";

export default function ProtectedLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="recipe/[recipeId]" />
      <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
