// src/features/scan-camera/api/post-scan-image.ts
// 캡처한 이미지를 서버에 전송하여 식재료를 인식하는 API 함수.
// POST /fridge/ocr-auto-place — multipart/form-data 로 이미지를 전송하고 인식된 재료 목록을 반환한다.

import type { IngredientRes } from "@/entities/fridge";
import { apiRequest } from "@/shared/api";

export type ScanImageResult = {
  saved: IngredientRes[];
};

type OcrRes = {
  saved: IngredientRes[];
};

export async function postScanImage(imageUri: string): Promise<ScanImageResult> {
  if (__DEV__) console.log("[POST /fridge/ocr-auto-place] request", imageUri);

  const formData = new FormData();
  formData.append("image", {
    uri: imageUri,
    name: "scan.jpg",
    type: "image/jpeg",
  } as unknown as Blob);

  const data = await apiRequest<OcrRes>("/fridge/ocr-auto-place", {
    method: "POST",
    body: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (__DEV__) console.log("[POST /fridge/ocr-auto-place] response", JSON.stringify(data, null, 2));

  return { saved: data.saved ?? [] };
}
