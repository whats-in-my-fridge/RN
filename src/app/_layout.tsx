import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Dimensions, StyleSheet, View } from "react-native";

import "../../global.css";

import { BottomSheetProvider } from "@/app/_providers";
import { ChatFloatingButton, ChatSheet, useChatStore } from "@/features/chat";
import { semanticColors } from "@/shared/config/tokens";
import { useColorScheme } from "@/shared/lib/hooks/use-color-scheme";
export const unstable_settings = {
  anchor: "(tabs)",
};

// 시트 snapPoint가 75%이므로 나머지 25% + 여유분을 덮는다
const OVERLAY_HEIGHT = Dimensions.get("window").height * 0.3;

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const openChat = useChatStore((s) => s.open);
  const isChatOpen = useChatStore((s) => s.isOpen);

  return (
    <BottomSheetProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="test-back-button" options={{ headerShown: false }} />
          <Stack.Screen name="recipe/[recipeId]" options={{ headerShown: false }} />
        </Stack>
        {!isChatOpen && <ChatFloatingButton onPress={openChat} />}
        <ChatSheet />
        {/* 채팅창이 열려있을 때 시트 아래 노출 영역을 아이보리로 덮는 오버레이 */}
        {isChatOpen && <View pointerEvents="none" style={styles.chatBgOverlay} />}
        <StatusBar style="auto" />
      </ThemeProvider>
    </BottomSheetProvider>
  );
}

const styles = StyleSheet.create({
  chatBgOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: OVERLAY_HEIGHT,
    backgroundColor: semanticColors["surface-app"],
  },
});
