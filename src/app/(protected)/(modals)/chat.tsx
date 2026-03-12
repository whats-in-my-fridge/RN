// src/app/(protected)/(modals)/chat.tsx
// 채팅 모달 화면 라우트. chat floating button → present로 진입.

import { Text, View } from "react-native";

export default function ChatModal() {
  return (
    <View className="flex-1 items-center justify-center bg-surface-app">
      <Text className="text-content-primary text-lg">채팅</Text>
    </View>
  );
}
