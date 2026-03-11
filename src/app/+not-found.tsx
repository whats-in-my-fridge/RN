// src/app/+not-found.tsx
// 존재하지 않는 라우트 접근 시 표시되는 화면.

import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not Found" }} />
      <View className="flex-1 items-center justify-center bg-surface-app">
        <Text className="text-content-primary text-lg">페이지를 찾을 수 없습니다.</Text>
        <Link href="/" className="mt-4 text-content-secondary">
          홈으로 돌아가기
        </Link>
      </View>
    </>
  );
}
