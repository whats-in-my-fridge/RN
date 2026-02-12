import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white dark:bg-zinc-950"
      contentContainerClassName="px-5 pt-6 pb-10"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-5 overflow-hidden rounded-3xl bg-zinc-900 px-5 py-6 dark:bg-zinc-900">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-sm font-medium text-zinc-300">오늘 뭐 먹지?</Text>
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
            <Text className="text-center text-sm font-bold text-zinc-900">빠른 추가</Text>
          </Pressable>

          <Pressable
            className="flex-1 rounded-2xl bg-zinc-800 px-4 py-3 active:opacity-90"
            onPress={() => alert("준비중입니다")}
          >
            <Text className="text-center text-sm font-semibold text-white">탐색</Text>
          </Pressable>
        </View>
      </View>

      {/* Summary cards */}
      <View className="mb-6 flex-row gap-3">
        <View className="flex-1 rounded-3xl bg-zinc-100 p-4 dark:bg-zinc-900">
          <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">냉장고</Text>
          <Text className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-white">12</Text>
          <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">아이템</Text>
        </View>
        <View className="flex-1 rounded-3xl bg-zinc-100 p-4 dark:bg-zinc-900">
          <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">임박</Text>
          <Text className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-white">3</Text>
          <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">유통기한</Text>
        </View>
        <View className="flex-1 rounded-3xl bg-zinc-100 p-4 dark:bg-zinc-900">
          <Text className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">추천</Text>
          <Text className="mt-1 text-2xl font-extrabold text-zinc-900 dark:text-white">7</Text>
          <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">레시피</Text>
        </View>
      </View>

      {/* Section: Recent items (placeholder UI) */}
      <View className="mb-3 flex-row items-end justify-between">
        <Text className="text-lg font-extrabold text-zinc-900 dark:text-white">최근 추가</Text>
        <Text className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">전체보기</Text>
      </View>

      <View className="gap-3">
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
              <Text className="text-base font-bold text-zinc-900 dark:text-white">{item.title}</Text>
              <Text className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{item.meta}</Text>
            </View>
            <View className="h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800">
              <Text className="text-base font-black text-zinc-700 dark:text-zinc-200">+</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
