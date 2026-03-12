// src/features/scan-camera/model/useScanCamera.ts
// 스캔 카메라 기능의 상태 머신 훅.
// 카메라 모드 ('camera' | 'preview' | 'submitting') 전환, 촬영, 갤러리 선택, 서버 제출을 담당한다.

import { useMutation } from "@tanstack/react-query";
import { useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useRef, useState } from "react";
import { postScanImage } from "../api/post-scan-image";
import type { CameraView } from "expo-camera";

export type ScanMode = "camera" | "preview" | "submitting";

type UseScanCameraOptions = {
  onSubmitSuccess: (ingredients: string[]) => void;
};

export function useScanCamera({ onSubmitSuccess }: UseScanCameraOptions) {
  const [mode, setMode] = useState<ScanMode>("camera");
  const [capturedUri, setCapturedUri] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const { mutate: submitImage, isPending } = useMutation({
    mutationFn: (uri: string) => postScanImage(uri),
    onSuccess: (data) => {
      onSubmitSuccess(data.ingredients);
    },
    onError: () => {
      setMode("preview");
    },
  });

  const handleCapture = useCallback(async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      if (photo?.uri) {
        setCapturedUri(photo.uri);
        setMode("preview");
      }
    } catch {
      // 촬영 실패 시 camera 모드 유지
    }
  }, []);

  const handlePickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]?.uri) {
      setCapturedUri(result.assets[0].uri);
      setMode("preview");
    }
  }, []);

  const handleReset = useCallback(() => {
    setCapturedUri(null);
    setMode("camera");
  }, []);

  const handleSubmit = useCallback(() => {
    if (!capturedUri) return;
    setMode("submitting");
    submitImage(capturedUri);
  }, [capturedUri, submitImage]);

  return {
    mode,
    capturedUri,
    cameraRef,
    permission,
    requestPermission,
    isPending,
    handleCapture,
    handlePickImage,
    handleReset,
    handleSubmit,
  };
}
