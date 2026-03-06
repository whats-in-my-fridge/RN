import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import "../../global.css";

import { BottomSheetProvider } from "@/app/_providers";
import { ChatFloatingButton, ChatSheet, useChatStore } from "@/features/chat";
import { useColorScheme } from "@/shared/lib/hooks/use-color-scheme";
export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const openChat = useChatStore((s) => s.open);

  return (
    <BottomSheetProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="test-back-button" options={{ headerShown: false }} />
          <Stack.Screen name="recipe/[recipeId]" options={{ headerShown: false }} />
        </Stack>
        <ChatFloatingButton onPress={openChat} />
        <ChatSheet />
        <StatusBar style="auto" />
      </ThemeProvider>
    </BottomSheetProvider>
  );
}
