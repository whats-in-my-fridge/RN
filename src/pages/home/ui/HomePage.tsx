// Home page screen: assembles header, status bar, best-match banner, and recipe grid.

import { router } from "expo-router";
import { Suspense } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  BestMatchingSection,
  BestRecipeSkeleton,
  RecipeListSkeleton,
  RecommendedSection,
} from "@/features/home-feed/ui";
import { tokens } from "@/shared/config/tokens";
import { ErrorBoundary } from "@/shared/ui/error-boundary";
import { ErrorView } from "@/shared/ui/error-view";
import { SectionHeader } from "@/shared/ui/section-header";
import { FridgeStatusBar } from "@/widgets/fridge-status-bar";
import { HomeHeader } from "./parts/HomeHeader";

const ALERT_STUB = () => alert("준비중입니다");

export function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-surface-app">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 */}
        <HomeHeader />

        {/* 냉장고 현황 */}
        <FridgeStatusBar />

        {/* 오늘의 베스트 매칭 */}
        <SectionHeader title="오늘의 베스트 매칭" onMore={ALERT_STUB} />
        <View className="mb-6 px-screen">
          <ErrorBoundary fallback={<ErrorView message="베스트 매칭을 불러올 수 없습니다" />}>
            <Suspense fallback={<BestRecipeSkeleton />}>
              <BestMatchingSection />
            </Suspense>
          </ErrorBoundary>
        </View>

        {/* 지금 바로 만들 수 있어요 */}
        <SectionHeader title="지금 바로 만들 수 있어요" onMore={ALERT_STUB} />
        <View className="mb-6 px-screen">
          <ErrorBoundary fallback={<ErrorView message="레시피 목록을 불러올 수 없습니다" />}>
            <Suspense fallback={<RecipeListSkeleton />}>
              <RecommendedSection />
            </Suspense>
          </ErrorBoundary>
        </View>

        {/* 레시피 더보기 */}
        <View className="px-screen">
          <Pressable
            className="w-full items-center rounded-2xl border py-3 active:opacity-70"
            style={{
              borderColor: tokens.color["stroke-default"],
              backgroundColor: tokens.color["surface-card"],
            }}
            onPress={() => router.push("/(protected)/(tabs)/search")}
          >
            <Text className="text-sm font-semibold text-content-secondary">레시피 더보기 &gt;</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
