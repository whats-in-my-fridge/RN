import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import "../../global.css";

import { BottomSheetProvider } from "@/app/_providers";
import { ChatFloatingButton, ChatSheet, useChatStore } from "@/features/chat";
import { useAuthStore } from "@/features/kakao-login";
import { useShelfDetailStore } from "@/features/view-shelf-detail";
import { AUTH_TOKEN_KEY } from "@/shared/config/auth-storage";
import { semanticColors } from "@/shared/config/tokens";
import { useColorScheme } from "@/shared/lib/hooks/use-color-scheme";

const queryClient = new QueryClient();

export const unstable_settings = {
  anchor: "(protected)",
};

export default function RootLayout() {
  const { height } = useWindowDimensions();
  // 시트 snapPoint가 75%이므로 나머지 25% + 여유분을 덮는다
  const overlayHeight = height * 0.3;
  const colorScheme = useColorScheme();
  const openChat = useChatStore((s) => s.open);
  const isChatOpen = useChatStore((s) => s.isOpen);
  const isShelfDetailOpen = useShelfDetailStore((s) => s.selectedSection !== null);
  const segments = useSegments();
  const isInAuth = segments[0] === "(auth)";

  const setAuth = useAuthStore((s) => s.setAuth);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  // Restore token on app startup
  useEffect(() => {
    const restoreToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        if (token) {
          // TODO: Call backend /auth/me to get user info and validate token
          // For now, we'll just set a placeholder user - backend should return actual user data
          setAuth({ id: "", nickname: "", profileImage: "" }, token);
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("Failed to restore token:", error);
        clearAuth();
      }
    };

    restoreToken();
  }, [setAuth, clearAuth]);

  const _isOnScan = (segments as string[]).includes("scan");

  return (
    <QueryClientProvider client={queryClient}>
      <BottomSheetProvider>
        <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(protected)" />
          </Stack>

          {!isChatOpen && !isInAuth && !isShelfDetailOpen && (
            <ChatFloatingButton onPress={openChat} />
          )}

          <ChatSheet />
          {/* 채팅창이 열려있을 때 시트 아래 노출 영역을 아이보리로 덮는 오버레이 */}
          {isChatOpen && (
            <View pointerEvents="none" style={[styles.chatBgOverlay, { height: overlayHeight }]} />
          )}
          <StatusBar style="auto" />
        </ThemeProvider>
      </BottomSheetProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  chatBgOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: semanticColors["surface-app"],
  },
});
