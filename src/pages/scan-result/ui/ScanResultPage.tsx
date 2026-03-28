// src/pages/scan-result/ui/ScanResultPage.tsx
// 스캔 결과 화면 페이지 컴포넌트.
// 서버에서 인식된 식재료 목록을 표시하며, [냉장고에 추가] 버튼으로 일괄 추가하거나 [다시 스캔] 버튼으로 돌아갈 수 있다.

import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useAddFridgeItem } from "@/features/add-fridge-item";
import { PageLayout } from "@/shared/ui/page-layout";

const DEFAULT_QUANTITY = "1개";

export function ScanResultPage() {
  const router = useRouter();
  const { ingredients: rawIngredients } = useLocalSearchParams<{ ingredients: string }>();

  const ingredients: string[] = rawIngredients ? JSON.parse(rawIngredients) : [];

  const { mutateAsync: addFridgeItem, isPending } = useAddFridgeItem();

  const handleAddAll = async () => {
    if (ingredients.length === 0) return;

    try {
      await Promise.all(
        ingredients.map((name) => addFridgeItem({ name, quantity: DEFAULT_QUANTITY })),
      );
      Alert.alert("추가 완료", "식재료가 냉장고에 추가되었습니다.", [
        {
          text: "확인",
          onPress: () => router.replace("/(protected)/(tabs)/inventory"),
        },
      ]);
    } catch {
      Alert.alert("추가 실패", "일부 식재료를 추가하지 못했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <PageLayout>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="px-screen pt-12 pb-8">
          {/* 헤더 */}
          <Text className="text-content-primary text-2xl font-bold mb-2">스캔 완료!</Text>
          <Text className="text-content-secondary text-sm mb-8">인식된 식재료를 확인해 주세요</Text>

          {/* 식재료 목록 */}
          {ingredients.length > 0 ? (
            <View className="gap-3">
              {ingredients.map((item, index) => (
                <View
                  key={item}
                  className="bg-surface-card rounded-xl px-4 py-4 flex-row items-center border border-stroke-default"
                >
                  <View className="w-8 h-8 rounded-full bg-status-fresh-bg items-center justify-center mr-3">
                    <Text className="text-status-fresh text-sm font-semibold">{index + 1}</Text>
                  </View>
                  <Text className="text-content-primary text-base font-medium">{item}</Text>
                </View>
              ))}
            </View>
          ) : (
            <View className="items-center py-12">
              <Text className="text-content-secondary text-base">인식된 식재료가 없습니다</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* 하단 버튼 */}
      <View className="px-screen pb-8 pt-4 gap-3">
        <Pressable
          onPress={handleAddAll}
          disabled={isPending || ingredients.length === 0}
          className="bg-primary rounded-xl py-4 items-center justify-center active:opacity-70 disabled:opacity-50"
          accessibilityRole="button"
          accessibilityLabel="냉장고에 추가"
        >
          {isPending ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text className="text-white font-semibold text-base">냉장고에 추가</Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => router.back()}
          disabled={isPending}
          className="bg-surface-card rounded-xl py-4 items-center justify-center active:opacity-70 disabled:opacity-50 border border-stroke-default"
          accessibilityRole="button"
          accessibilityLabel="다시 스캔하기"
        >
          <Text className="text-content-primary font-semibold text-base">다시 스캔하기</Text>
        </Pressable>
      </View>
    </PageLayout>
  );
}
