// src/pages/scan/ui/ScanPage.tsx
// 스캔 탭 화면 페이지 컴포넌트.
// useScanCamera 훅으로 카메라 → 미리보기 상태 전환을 관리하며,
// 제출 성공 시 결과 화면으로 이동한다.

import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { ScanCameraView, ScanPreviewView, useScanCamera } from "@/features/scan-camera";

export function ScanPage() {
  const router = useRouter();

  const handleSubmitSuccess = useCallback(
    (ingredients: string[]) => {
      router.push({
        pathname: "/(protected)/scan-result",
        params: { ingredients: JSON.stringify(ingredients) },
      });
    },
    [router],
  );

  const {
    mode,
    capturedUri,
    cameraRef,
    permission,
    requestPermission,
    handleCapture,
    handlePickImage,
    handleReset,
    handleSubmit,
  } = useScanCamera({ onSubmitSuccess: handleSubmitSuccess });

  // 결과 화면에서 복귀 시 카메라 초기 상태로 리셋
  useFocusEffect(
    useCallback(() => {
      handleReset();
    }, [handleReset]),
  );

  if (mode === "camera") {
    return (
      <ScanCameraView
        cameraRef={cameraRef}
        permission={permission}
        onRequestPermission={requestPermission}
        onCapture={handleCapture}
        onPickImage={handlePickImage}
      />
    );
  }

  return (
    <ScanPreviewView
      imageUri={capturedUri!}
      isSubmitting={mode === "submitting"}
      onSubmit={handleSubmit}
      onReset={handleReset}
    />
  );
}
