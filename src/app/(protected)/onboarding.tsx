// src/app/(protected)/onboarding.tsx
// 온보딩 화면 라우트. 최초 로그인 이후 진입.

import { Text, View } from "react-native";

export default function OnboardingScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-surface-app">
      <Text className="text-content-primary text-lg">온보딩</Text>
    </View>
  );
}
