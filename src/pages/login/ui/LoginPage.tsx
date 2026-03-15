// LoginPage: 로그인 화면
// 앱 브랜딩 + 소셜 로그인 선택 구조 (카카오 우선, 추후 확장 대비 구분선 포함)

import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KakaoLoginButton } from "@/features/kakao-login";

// ── 구분선 컴포넌트 ──────────────────────────────────────────────────────────
// 나중에 다른 소셜 로그인 추가 시 버튼들 사이에 재사용
function OrDivider() {
  return (
    <View className="flex-row items-center gap-md my-lg">
      <View className="flex-1 h-px bg-stroke-default" />
      <Text className="text-sm text-content-secondary px-md">또는</Text>
      <View className="flex-1 h-px bg-stroke-default" />
    </View>
  );
}

// ── 앱 브랜딩 헤더 ───────────────────────────────────────────────────────────
function AppBranding() {
  return (
    <View className="items-center mb-xl">
      {/* 앱 아이콘 영역 — 냉장고 이모지를 큰 일러스트로 활용 */}
      <View className="items-center justify-center mb-lg w-24 h-24 rounded-lg bg-neutral-50 border border-stroke-default">
        <Text className="text-5xl">🧊</Text>
      </View>

      {/* 앱 이름 */}
      <Text className="text-2xl font-black text-center text-content-primary mb-md">
        냉장고엔 뭐가 있니?
      </Text>

      {/* 서브타이틀 */}
      <Text className="text-sm font-normal text-center text-content-secondary">
        냉장고 속 재료로{"\n"}쉽고 맛있게 요리하세요
      </Text>
    </View>
  );
}

// ── 메인 페이지 ──────────────────────────────────────────────────────────────
export function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: Error) => {
    setError(err.message || "로그인에 실패했습니다");
    setTimeout(() => setError(null), 5000);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-app">
      {/* 상단 여백 — 브랜딩이 화면 중앙보다 살짝 위에 오도록 */}
      <View className="flex-1 justify-center px-screen pb-xl">
        {/* 브랜딩 섹션 */}
        <AppBranding />

        {/* 로그인 버튼 그룹 */}
        <View>
          {/* 에러 메시지 */}
          {error && (
            <View className="rounded-card p-card mb-md border border-status-expiring-border bg-status-expiring-bg">
              <Text className="text-sm text-status-expiring">{error}</Text>
            </View>
          )}

          {/* 카카오 로그인 */}
          <KakaoLoginButton onError={handleError} />

          {/* 구분선 — 다른 소셜 로그인 추가 시 이 아래에 버튼 삽입 */}
          <OrDivider />

          {/* 안내 문구 */}
          <Text className="text-2xs text-center text-content-secondary">
            로그인하면 <Text className="underline">이용약관</Text> 및{" "}
            <Text className="underline">개인정보처리방침</Text>에 동의하는 것으로 간주됩니다.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
