// src/app/(protected)/_layout.tsx
// 로그인 이후 접근 가능한 보호 라우트 그룹 레이아웃.
// (tabs) — 하단 탭 네비게이터
// scan   — OCR 촬영 (stack push)
// recipe/[recipeId] — 레시피 상세 (stack push)
// liked-recipes — 좋아요한 레시피 목록 (stack push)
// (modals) — 모달 화면 그룹

import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="scan" />
      <Stack.Screen name="recipe/[recipeId]" />
      <Stack.Screen name="liked-recipes" />
      <Stack.Screen name="(modals)" options={{ presentation: "modal" }} />
      <Stack.Screen name="onboarding" />
    </Stack>
  );
}
