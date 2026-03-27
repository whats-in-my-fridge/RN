<<<<<<< HEAD
// 앱 진입점 — 인증 상태 확인 후 적절한 화면으로 라우팅한다.

import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "@/features/kakao-login";
import { semanticColors } from "@/shared/config/tokens";

/**
 * Root entry point of the app.
 * - Checks authentication state during token restoration
 * - Routes to (protected) or (auth) accordingly
 * - Shows loading screen while restoring auth token
 */
export default function RootPage() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);

  // Show loading screen while checking auth state
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: semanticColors["surface-app"],
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Authenticated → Home tab
  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  // Not authenticated → Login
  return <Redirect href="/(auth)/login" />;
=======
// 앱 루트 경로(/) 진입점
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(protected)/(tabs)/home" />;
>>>>>>> 30a56a40736e078b71fbd580251b501c0d0ef7d2
}
