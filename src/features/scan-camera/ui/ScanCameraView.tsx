// src/features/scan-camera/ui/ScanCameraView.tsx
// 카메라 뷰 UI 컴포넌트.
// 카메라 권한 상태에 따라 허용 안내 화면 또는 실제 카메라 뷰를 렌더링한다.
// 하단에 [촬영] 버튼과 [갤러리] 버튼을 제공한다.

import { CameraView } from "expo-camera";
import type { RefObject } from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type CameraPermission = { granted: boolean; canAskAgain: boolean } | null;

type Props = {
  cameraRef: RefObject<CameraView | null>;
  permission: CameraPermission;
  onRequestPermission: () => void;
  onCapture: () => void;
  onPickImage: () => void;
};

export function ScanCameraView({
  cameraRef,
  permission,
  onRequestPermission,
  onCapture,
  onPickImage,
}: Props) {
  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <ActivityIndicator size="large" color="#605856" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app px-screen gap-6">
        <Text className="text-content-primary text-xl font-semibold text-center">
          카메라 권한이 필요합니다
        </Text>
        <Text className="text-content-secondary text-sm text-center leading-5">
          냉장고 식재료를 스캔하려면{"\n"}카메라 접근 권한을 허용해 주세요
        </Text>
        <Pressable
          onPress={onRequestPermission}
          className="bg-primary rounded-lg px-8 py-3 active:opacity-70"
          accessibilityRole="button"
          accessibilityLabel="카메라 권한 허용"
        >
          <Text className="text-white font-semibold text-base">권한 허용</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

      {/* 안내 오버레이 */}
      <View className="absolute top-0 left-0 right-0 items-center pt-16 px-screen">
        <Text className="text-white text-sm text-center opacity-80">
          식재료가 잘 보이도록 카메라를 조정해 주세요
        </Text>
      </View>

      {/* 하단 버튼 영역 */}
      <View className="absolute bottom-0 left-0 right-0 pb-12 px-screen">
        <View className="flex-row items-center justify-between">
          {/* 갤러리 버튼 */}
          <Pressable
            onPress={onPickImage}
            className="bg-black/50 rounded-xl px-5 py-3 active:opacity-70"
            accessibilityRole="button"
            accessibilityLabel="갤러리에서 사진 선택"
          >
            <Text className="text-white font-medium text-sm">갤러리</Text>
          </Pressable>

          {/* 촬영 버튼 */}
          <Pressable
            onPress={onCapture}
            className="w-18 h-18 rounded-full bg-white items-center justify-center active:opacity-70"
            style={{ width: 72, height: 72 }}
            accessibilityRole="button"
            accessibilityLabel="사진 촬영"
          >
            <View className="w-16 h-16 rounded-full border-2 border-black/10 bg-white" />
          </Pressable>

          {/* 균형을 위한 빈 뷰 */}
          <View style={{ width: 80 }} />
        </View>
      </View>
    </View>
  );
}
