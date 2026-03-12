// src/features/scan-camera/ui/ScanPreviewView.tsx
// 촬영/선택된 사진을 미리보기로 표시하는 컴포넌트.
// [제출] 버튼으로 서버 전송, [다시 찍기] 버튼으로 카메라 모드로 복귀한다.

import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";

type Props = {
  imageUri: string;
  isSubmitting: boolean;
  onSubmit: () => void;
  onReset: () => void;
};

export function ScanPreviewView({ imageUri, isSubmitting, onSubmit, onReset }: Props) {
  return (
    <View className="flex-1 bg-black">
      {/* 미리보기 이미지 */}
      <Image
        source={{ uri: imageUri }}
        style={{ flex: 1 }}
        resizeMode="contain"
        accessibilityLabel="촬영된 사진 미리보기"
      />

      {/* 하단 버튼 영역 */}
      <View className="absolute bottom-0 left-0 right-0 pb-12 px-screen gap-3">
        {/* 제출 버튼 */}
        <Pressable
          onPress={onSubmit}
          disabled={isSubmitting}
          className="bg-primary rounded-xl py-4 items-center justify-center active:opacity-70 disabled:opacity-50"
          accessibilityRole="button"
          accessibilityLabel="식재료 분석 제출"
          accessibilityState={{ disabled: isSubmitting }}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text className="text-white font-semibold text-base">식재료 분석하기</Text>
          )}
        </Pressable>

        {/* 다시 찍기 버튼 */}
        <Pressable
          onPress={onReset}
          disabled={isSubmitting}
          className="bg-black/50 rounded-xl py-4 items-center justify-center active:opacity-70 disabled:opacity-40"
          accessibilityRole="button"
          accessibilityLabel="다시 찍기"
        >
          <Text className="text-white font-medium text-base">다시 찍기</Text>
        </Pressable>
      </View>
    </View>
  );
}
