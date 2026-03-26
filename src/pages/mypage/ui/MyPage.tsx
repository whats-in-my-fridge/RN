// 마이페이지 화면 컴포넌트 — 사용자 프로필 및 설정 메뉴를 표시한다.

import { router } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useKakaoLogin } from "@/features/kakao-login";
import { useScraps } from "@/features/liked-recipes";
import { useUserProfile } from "@/features/user-profile";
import { SectionHeader } from "@/shared/ui/section-header";
import { ProfileCard } from "@/widgets/profile-card";
import { SettingsListGroup, SettingsListRow } from "@/widgets/settings-list-row";

const ALERT_STUB = () => alert("준비중입니다");

export function MyPage() {
  const { logout } = useKakaoLogin();
  const { data: userProfile, isLoading, isError } = useUserProfile();
  const { data: scraps = [] } = useScraps();

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-surface-app">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* 헤더 */}
        <View className="px-screen pt-4 pb-6">
          <Text className="text-xl font-extrabold text-content-primary">마이페이지</Text>
        </View>

        {/* 프로필 카드 */}
        <View className="px-screen mb-section">
          {isLoading ? (
            <View className="flex-row items-center justify-center rounded-list border border-stroke-default bg-surface-card p-card">
              <ActivityIndicator />
            </View>
          ) : isError ? (
            <View className="rounded-list border border-stroke-default bg-surface-card p-card">
              <Text className="text-sm text-content-secondary">프로필을 불러오지 못했어요.</Text>
            </View>
          ) : (
            <ProfileCard
              nickname={userProfile?.nickname}
              email={userProfile?.email}
              profileImageUrl={userProfile?.profileImageUrl}
              onEdit={ALERT_STUB}
            />
          )}
        </View>

        {/* 활동 내역 */}
        <SectionHeader title="활동 내역" />
        <View className="px-screen mb-section">
          <SettingsListGroup>
            <SettingsListRow
              icon="heart"
              title="좋아요한 레시피"
              badge={scraps.length}
              onPress={() => router.push("/(protected)/liked-recipes")}
            />
            <SettingsListRow icon="clock" title="최근 본 레시피" onPress={ALERT_STUB} />
          </SettingsListGroup>
        </View>

        {/* AI 추천 설정 */}
        <SectionHeader title="AI 추천 설정" />
        <View className="mt-3 px-screen mb-section">
          <SettingsListRow
            icon="shield"
            title="알레르기 설정"
            subtitle="설정된 알레르기가 없어요"
            onPress={ALERT_STUB}
          />
        </View>

        {/* 설정 */}
        <SectionHeader title="설정" />
        <View className="gap-item px-screen">
          <SettingsListGroup>
            <SettingsListRow icon="settings" title="앱 설정" onPress={ALERT_STUB} />
            <SettingsListRow icon="help" title="문의 및 도움말" onPress={ALERT_STUB} />
            <SettingsListRow icon="logout" title="로그아웃" danger onPress={logout} />
          </SettingsListGroup>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
