import { tokens } from "@/shared/config/tokens";
import { useBottomSheetStore } from "@/shared/model/bottom-sheet";
import { useToastStore } from "@/shared/model/toast";
import { ToastMessage } from "@/shared/ui/toast";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const openBottomSheet = useBottomSheetStore((s) => s.open);
  const showToast = useToastStore((s) => s.show);

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 bg-surface-app"
        contentContainerClassName="items-center px-screen pb-10"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-5 overflow-hidden rounded-3xl bg-zinc-900 px-5 py-6 dark:bg-zinc-900">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-sm font-medium text-zinc-300">
                오늘 뭐 먹지?
              </Text>
              <Text className="mt-1 text-3xl font-extrabold tracking-tight text-white">
                What&apos;s in my fridge
              </Text>
              <Text className="mt-2 text-sm leading-5 text-zinc-300">
                냉장고 속 재료로 만들 수 있는 레시피를 빠르게 찾아보세요.
              </Text>
            </View>

            <Image
              source={require("@assets/images/partial-react-logo.png")}
              className="h-20 w-20 opacity-90"
              resizeMode="contain"
            />
          </View>

          <View className="mt-5 flex-row gap-3">
            <Pressable
              className="flex-1 rounded-2xl bg-white px-4 py-3 active:opacity-90"
              onPress={() => alert("준비중입니다")}
            >
              <Text className="text-center text-sm font-bold text-zinc-900">
                빠른 추가
              </Text>
            </Pressable>

            <Pressable
              className="flex-1 rounded-2xl bg-zinc-800 px-4 py-3 active:opacity-90"
              onPress={() => alert("준비중입니다")}
            >
              <Text className="text-center text-sm font-semibold text-white">
                탐색
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Summary cards */}
        <View className="mb-6 flex-row gap-3">
          <View className="flex-1 rounded-3xl bg-zinc-100 p-4 dark:bg-zinc-900">
            <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              냉장고
            </Text>
            <Text className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-white">
              12
            </Text>
            <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              아이템
            </Text>
          </View>
          <View className="flex-1 rounded-3xl bg-zinc-100 p-4 dark:bg-zinc-900">
            <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              임박
            </Text>
            <Text className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-white">
              3
            </Text>
            <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              유통기한
            </Text>
          </View>
          <View className="flex-1 rounded-3xl bg-zinc-100 p-4 dark:bg-zinc-900">
            <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              추천
            </Text>
            <Text className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-white">
              7
            </Text>
            <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              레시피
            </Text>
          </View>
        </View>

        {/* [테스트] BackButton 컴포넌트 확인 */}
        <Pressable
          className="mb-6 w-full rounded-2xl border border-zinc-200 bg-zinc-100 px-4 py-3 active:opacity-70"
          onPress={() => router.push("/test-back-button" as never)}
        >
          <Text className="text-center text-sm font-bold text-zinc-700">
            🔙 뒤로가기 버튼 테스트
          </Text>
        </Pressable>

        {/* Section: Recent items (placeholder UI) */}
        <View className="w-full mb-3 flex-row items-end justify-between">
          <Text className="text-lg font-extrabold text-zinc-900 dark:text-white">
            최근 추가
          </Text>
          <Text className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
            전체보기
          </Text>
        </View>

        <View className="w-full gap-3 mb-6">
          {[
            { title: "계란", meta: "유통기한 2일 남음" },
            { title: "우유", meta: "유통기한 5일 남음" },
            { title: "양파", meta: "상온 보관" },
          ].map((item) => (
            <View
              key={item.title}
              className="flex-row items-center justify-between rounded-3xl bg-white p-4 shadow-sm ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-800"
            >
              <View className="flex-1 pr-3">
                <Text className="text-base font-bold text-zinc-900 dark:text-white">
                  {item.title}
                </Text>
                <Text className="text-sm text-zinc-500">{item.meta}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 토스트 메시지 테스트 버튼 */}
        <Pressable
          className="w-full rounded-button px-xl py-md active:opacity-90 mb-md"
          style={{ backgroundColor: tokens.color["status-fresh"] }}
          onPress={() => showToast("토스트 메시지 테스트!")}
        >
          <Text className="text-base text-center font-bold text-white">
            토스트 메시지 테스트 버튼
          </Text>
        </Pressable>

        {/* develop 브랜치에서 넘어온 바텀시트 테스트 버튼 */}
        <Pressable
          className="w-full rounded-button bg-primary px-8 py-4 active:opacity-90 mb-10"
          onPress={() =>
            openBottomSheet(
              <BottomSheetView
                style={{ paddingHorizontal: 20, paddingVertical: 24 }}
              >
                <Text className="text-xl font-extrabold text-content-primary">
                  바텀시트
                </Text>
                <Text className="mt-2 text-sm text-content-secondary">
                  바깥 영역 탭 또는 아래로 스와이프하면 닫힙니다
                </Text>
              </BottomSheetView>,
            )
          }
        >
          <Text className="text-base text-center font-bold text-white">
            바텀시트 열기
          </Text>
        </Pressable>
      </ScrollView>

      {/* 토스트 메시지 컴포넌트: absolute로 고정되어 레이아웃에 영향 없음 */}
      <ToastMessage />
    </View>
  );
}
