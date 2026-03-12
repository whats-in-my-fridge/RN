// src/app/(auth)/_layout.tsx
// 비로그인 공개 라우트 그룹 레이아웃. (login 등)

import { Stack } from "expo-router";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
