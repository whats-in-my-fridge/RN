// src/app/(protected)/(tabs)/_layout.tsx
// 하단 탭 네비게이터 레이아웃.

import { Tabs } from "expo-router";

import { semanticColors } from "@/shared/config/tokens";
import { HapticTab } from "@/shared/ui/haptic-tab";
import { IconSymbol } from "@/shared/ui/icon-symbol";
import { ScanTabButton } from "@/shared/ui/tab-bar";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: semanticColors.primary,
        tabBarInactiveTintColor: semanticColors["tab-inactive"],
        headerShown: false,
        tabBarItemStyle: {
          flex: 1,
          flexBasis: 0,
        },
      }}
    >
      {/* 홈 */}
      <Tabs.Screen
        name="home"
        options={{
          title: "홈",
          tabBarIcon: ({ color }) => <IconSymbol size={22} name="house.fill" color={color} />,
          tabBarButton: HapticTab,
        }}
      />

      {/* 냉장고 */}
      <Tabs.Screen
        name="inventory"
        options={{
          title: "냉장고",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={22} name="square.stack.fill" color={color} />
          ),
          tabBarButton: HapticTab,
        }}
      />

      {/* 스캔 - 커스텀 돌출 버튼 */}
      <Tabs.Screen
        name="scan"
        options={{
          tabBarButton: (props) => <ScanTabButton {...props} />,
        }}
      />

      {/* 레시피 검색 */}
      <Tabs.Screen
        name="search"
        options={{
          title: "레시피",
          tabBarIcon: ({ color }) => <IconSymbol size={22} name="magnifyingglass" color={color} />,
          tabBarButton: HapticTab,
        }}
      />

      {/* 마이페이지 */}
      <Tabs.Screen
        name="mypage"
        options={{
          title: "마이페이지",
          tabBarIcon: ({ color }) => <IconSymbol size={22} name="person.fill" color={color} />,
          tabBarButton: HapticTab,
        }}
      />
    </Tabs>
  );
}
