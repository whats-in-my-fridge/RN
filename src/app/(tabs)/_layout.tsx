import { Colors } from "@/shared/config/theme";
import { useColorScheme } from "@/shared/lib/hooks/use-color-scheme";
import { HapticTab } from "@/shared/ui/haptic-tab";
import { IconSymbol } from "@/shared/ui/icon-symbol";
import { ScanTabButton } from "@/shared/ui/tab-bar";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        headerShown: false,
      }}
    >
      {/* 홈 */}
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
          tabBarButton: HapticTab,
        }}
      />

      {/* 냉장고 */}
      <Tabs.Screen
        name="fridge"
        options={{
          title: "냉장고",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="square.stack.fill" color={color} />
          ),
          tabBarButton: HapticTab,
        }}
      />

      {/* 스캔 - 커스텀 돌출 버튼 */}
      <Tabs.Screen
        name="scan"
        options={{
          title: "스캔",
          tabBarButton: (props) => <ScanTabButton {...props} />,
        }}
      />

      {/* 레시피 */}
      <Tabs.Screen
        name="recipe"
        options={{
          title: "레시피",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="magnifyingglass" color={color} />
          ),
          tabBarButton: HapticTab,
        }}
      />

      {/* 마이페이지 */}
      <Tabs.Screen
        name="mypage"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
          tabBarButton: HapticTab,
        }}
      />
    </Tabs>
  );
}
