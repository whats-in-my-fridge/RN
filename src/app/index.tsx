// Root entry point: redirects to login or home based on auth state
import { Redirect } from "expo-router";
import { useAuthStore } from "@/features/kakao-login";

export default function RootIndex() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(protected)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}
