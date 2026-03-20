// src/features/scan-camera/api/post-scan-image.ts
// 캡처한 이미지를 서버에 전송하여 식재료를 인식하는 API 함수.
// 현재는 mock 응답을 반환하며, 실제 엔드포인트 연결 시 FormData 전송으로 교체한다.

export type ScanImageResult = {
  ingredients: string[];
};

export async function postScanImage(_imageUri: string): Promise<ScanImageResult> {
  // TODO: 실제 API 연결 시 아래 코드로 교체
  // const formData = new FormData();
  // formData.append("image", { uri: imageUri, name: "scan.jpg", type: "image/jpeg" } as unknown as Blob);
  // const response = await fetch("https://api.example.com/scan", { method: "POST", body: formData });
  // return response.json();

  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    ingredients: ["당근", "양파", "달걀", "두부", "시금치"],
  };
}
