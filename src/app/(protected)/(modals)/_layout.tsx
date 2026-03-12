// src/app/(protected)/(modals)/_layout.tsx
// 모달 화면 그룹 레이아웃. presentation: modal로 표시.

import { Stack } from "expo-router";

export default function ModalsLayout() {
  return <Stack screenOptions={{ headerShown: false, presentation: "modal" }} />;
}
