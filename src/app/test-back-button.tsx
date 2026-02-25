// src/app/test-back-button.tsx
//
// BackButton 컴포넌트 동작 확인용 임시 테스트 페이지.
// 좌상단의 BackButton을 누르면 이전 화면으로 돌아간다.

import { router } from "expo-router";
import { Text, View } from "react-native";

import { BackButton } from "@/shared/ui/back-button";

export default function TestBackButtonScreen() {
  return (
    <View className="flex-1 bg-surface-app px-screen pt-14">
      {/* 헤더 영역 — light / dark 두 버튼을 세로로 배치 */}
      <View className="flex-row items-start gap-sm">
        <View className="gap-item">
          <BackButton onPress={() => router.back()} />
          <BackButton variant="dark" onPress={() => router.back()} />
        </View>
        <View>
          <Text className="text-3xl font-extrabold text-content-primary">좋아요한 레시피</Text>
          <Text className="text-md text-content-secondary">12개의 레시피</Text>
        </View>
      </View>

      {/* 본문 */}
      <View className="mt-section flex-1 items-center justify-center gap-item">
        <Text className="text-xl text-content-secondary">BackButton 테스트 페이지</Text>
        <Text className="text-sm text-content-secondary">
          좌상단 버튼을 누르면 뒤로 돌아갑니다.
        </Text>
      </View>
    </View>
  );
}
