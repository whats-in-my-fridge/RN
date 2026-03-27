import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import "../../global.css";

import { BottomSheetProvider } from "@/app/_providers";
import { ChatFloatingButton, ChatSheet, useChatStore } from "@/features/chat";
import { useRestoreAuthToken } from "@/features/kakao-login";
import { useShelfDetailStore } from "@/features/view-shelf-detail";
import { semanticColors } from "@/shared/config/tokens";
import { useColorScheme } from "@/shared/lib/hooks/use-color-scheme";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <RootLayoutContent />
      </AppProviders>
    </QueryClientProvider>
  );
}

/**
 * Wraps the app with required providers (BottomSheet, Theme).
 * Keeps provider setup isolated from layout logic.
 */
function AppProviders({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <BottomSheetProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {children}
      </ThemeProvider>
    </BottomSheetProvider>
  );
}

/**
 * Root layout content: handles navigation, floating UI, and overlays.
 */
function RootLayoutContent() {
  const { height } = useWindowDimensions();
  const overlayHeight = height * 0.3;

  // Restore auth token on app startup
  useRestoreAuthToken();

  // UI state
  const segments = useSegments();
  const isInAuth = segments[0] === "(auth)";
  const openChat = useChatStore((s) => s.open);
  const isChatOpen = useChatStore((s) => s.isOpen);
  const isChatPresented = useChatStore((s) => s.isPresented);
  const isShelfDetailOpen = useShelfDetailStore((s) => s.selectedType !== null);

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(protected)" />
      </Stack>

      {/* Chat floating button: hidden when chat is open, in auth flow, or shelf detail is open */}
      {!isChatOpen && !isInAuth && !isShelfDetailOpen && <ChatFloatingButton onPress={openChat} />}

      <ChatSheet />

      {/* Overlay to cover content below when chat sheet is open */}
      {isChatOpen && (
        <View pointerEvents="none" style={[styles.chatBgOverlay, { height: overlayHeight }]} />
      )}

      <StatusBar style="auto" />
    </>
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
