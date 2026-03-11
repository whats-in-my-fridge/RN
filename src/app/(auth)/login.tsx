// src/app/(auth)/login.tsx
// 로그인 화면 라우트.

// TODO: 개발 완료 후 아래 Redirect 제거
import { Redirect } from "expo-router";
export default function LoginScreen() {
  return <Redirect href="/(protected)/(tabs)/home" />;
}

// import { Text, View } from "react-native";
// export default function LoginScreen() {
//   return (
//     <View className="flex-1 items-center justify-center bg-surface-app">
//       <Text className="text-content-primary text-lg">로그인</Text>
//     </View>
//   );
// }
