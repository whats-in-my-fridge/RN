// src/shared/ui/page-layout/PageLayout.tsx
// 공통 페이지 레이아웃 래퍼.
// SafeAreaView와 배경색을 통일하며, scrollable prop으로 ScrollView 자동 래핑을 지원한다.

import type { ReactNode } from "react";
import { ScrollView } from "react-native";
import { type Edge, SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: ReactNode;
  edges?: Edge[]; // 기본값: ["top", "bottom"] — 필요한 방향만 지정 가능
  scrollable?: boolean; // true면 children을 ScrollView로 감쌈
};

export function PageLayout({ children, edges = ["top", "bottom"], scrollable = false }: Props) {
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-surface-app">
      {scrollable ? (
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      ) : (
        children
      )}
    </SafeAreaView>
  );
}
