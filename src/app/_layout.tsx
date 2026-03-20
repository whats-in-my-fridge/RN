import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import "../../global.css";

import { BottomSheetProvider } from "@/app/_providers";
import { ChatFloatingButton, ChatSheet, useChatStore } from "@/features/chat";
import { useShelfDetailStore } from "@/features/view-shelf-detail";
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
  const isOnScan = (segments as string[]).includes("scan");

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
